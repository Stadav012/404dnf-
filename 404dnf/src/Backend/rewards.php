<?php
include 'db/config.php';


// Handle the request
header("Content-Type: application/json");

// Check the request method
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET': // Retrieve rewards
        if (isset($data['reward_id'])) {
            // Retrieve a specific reward
            $stmt = $conn->prepare("SELECT * FROM rewards WHERE reward_id = ?");
            $stmt->bind_param('i', $data['reward_id']);
        } else {
            // Retrieve all rewards
            $stmt = $conn->prepare("SELECT * FROM rewards");
        }
        $stmt->execute();
        $result = $stmt->get_result();
        echo json_encode($result);

        $rewards = [];
        while ($row = $result->fetch_assoc()) {
            $rewards[] = $row;
        }
        break;

    case 'POST': // Create a new reward
        $data = json_decode(file_get_contents('php://input'), true);
        if (!isset($data['user_id']) || !isset($data['user_found_items'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        $stmt = $conn->prepare("INSERT INTO rewards (user_id, user_found_items) VALUES (?,?)");
        $stmt->bind_param('ii', $data['user_id'],  $data['user_found_items']);
        if ($stmt->execute()) {
            echo json_encode(['message' => 'Reward created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create reward']);
        }
        break;
        case 'PUT': // Update an existing reward
            $data = json_decode(file_get_contents('php://input'), true);
            if (!isset($data['reward_id']) || !isset($data['user_found_items'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing required fields']);
                exit;
            }
            $stmt = $conn->prepare("UPDATE rewards SET user_found_items = ? WHERE reward_id = ?");
            $stmt->bind_param('ii',$data['reward_id'], $data['user_found_items']);
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Reward updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update reward']);
            }
            break;

        case 'DELETE': // Delete a reward
            // Get the data from the request body (assuming it's a JSON payload)
            $data = json_decode(file_get_contents('php://input'), true);
        
            // Check if the reward_id is set in the data
            if (!isset($data['reward_id'])) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing reward_id']);
                exit;
            }
        
            // Prepare the DELETE query
            $stmt = $conn->prepare("DELETE FROM rewards WHERE reward_id = ?");
            
            // Bind the reward_id parameter (assuming it's an integer)
            $stmt->bind_param('i', $data['reward_id']);  
            
            // Execute the query and check for success
            if ($stmt->execute()) {
                echo json_encode(['message' => 'Reward deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete reward']);
            }
            break;
        

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
