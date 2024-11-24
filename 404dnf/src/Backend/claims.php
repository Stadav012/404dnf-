<?php
// Include the database connection
include('db/config.php'); 

// Set headers for JSON response
header('Content-Type: application/json');

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Switch to handle different HTTP methods
switch ($method) {
    // Retrieve all claims or a specific claim by ID
    case 'GET':
        if (isset($data['claim_id'])) {
            // Retrieve a specific claim by ID
            $stmt = $conn->prepare("SELECT * FROM claims WHERE claim_id = ?");
            $stmt->bind_param('i', $data['claim_id']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $claim = $result->fetch_assoc();
                echo json_encode($claim);
            } else {
                echo json_encode(['message' => 'Claim not found']);
            }
        } else {
            // Retrieve all claims
            $stmt = $conn->prepare("SELECT * FROM claims");
            $stmt->execute();
            $result = $stmt->get_result();

            $claims = [];
            while ($row = $result->fetch_assoc()) {
                $claims[] = $row;
            }

            echo json_encode($claims);
        }
        break;

    // Create a new claim
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['user_id']) || !isset($data['submission_id']) || !isset($data['report_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        // Insert the new claim into the database
        $stmt = $conn->prepare("INSERT INTO claims (user_id, submission_id, report_id, status) VALUES (?, ?, ?, 'pending')");
        $stmt->bind_param('iii', $data['user_id'], $data['submission_id'], $data['report_id']);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Claim created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create claim']);
        }
        break;

    // Update an existing claim
    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['claim_id']) || !isset($data['status'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }
        //check if the status input is in the array

        $claims_statuses=['pending', 'approved', 'rejected'];  
        if (!in_array($data['status'], $claims_statuses)) {
            http_response_code(400);
            echo json_encode(['error'=> 'This status does not exist!!!!!!!!']);
            exit;
        }

        // Update the claim status
        $stmt = $conn->prepare("UPDATE claims SET status = ? WHERE claim_id = ?");
        $stmt->bind_param('si', $data['status'], $data['claim_id']);



        if ($stmt->execute()) {
            echo json_encode(['message' => 'Claim updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update claim']);
        }
        break;

    // Delete a claim
    case 'DELETE':
        if (!isset($_GET['claim_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing claim_id']);
            exit;
        }

        // Delete the claim
        $stmt = $conn->prepare("DELETE FROM claims WHERE claim_id = ?");
        $stmt->bind_param('i', $_GET['claim_id']);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Claim deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete claim']);
        }
        break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>

