<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: https://404dnf.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

include("../db/config.php");

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];

// Handle the claims update and message sending
switch ($method) {
    case 'POST': // Create a new message
        $data = json_decode(file_get_contents("php://input"), true);
        $userId = $data['user_id'];
        $title = $data['title'];
        $body = $data['message'];

        $sql = "INSERT INTO messages (user_id, title, message) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iss", $userId, $title, $body);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Message created successfully."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to create message."]);
        }
        $stmt->close();
        break;

    case 'GET': // Fetch messages

        $userId = $_GET['user_id'];
        // echo $userId;
        
        // Fetch and render messages dynamically
        $sql = "SELECT 
        m.id,
        m.status,
        m.title as category, 
        m.created_at as time,
        m.message
        FROM messages m
        WHERE m.user_id = ?
        ORDER BY m.created_at DESC;";


        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $userId);
        $stmt->execute();
        $result = $stmt->get_result();
        $messages = $result->fetch_all(MYSQLI_ASSOC);

        if ($messages) {
            // Return JSON or HTML as required
            header('Content-Type: application/json');
            echo json_encode($messages);
        } else {
            http_response_code(202);
            echo json_encode(["message" => "No messages found."]);
        }
        $stmt->close();
        break;

    case 'PUT': // Update claim status and send message
        // Assume data contains claim_id and the new status (Approved/Denied)
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Fetch the user's details (username) and the item related to the claim
        $sql = "SELECT u.username, r.item_description, r.category, c.status
                FROM claims c 
                INNER JOIN users u ON c.user_id = u.user_id
                INNER JOIN reports r ON c.report_id = r.report_id";
        
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $claim_id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            
            // Insert the message into the messages table
            $messageTitle = "Claim Status Update";
            $sqlInsertMessage = "INSERT INTO messages (user_id, title, message) VALUES (?, ?, ?)";
            $stmtInsertMessage = $conn->prepare($sqlInsertMessage);
            $stmtInsertMessage->bind_param("iss", $userId, $messageTitle, $messageBody);
            
            if ($stmtInsertMessage->execute()) {
                echo json_encode(["message" => "Message sent successfully to user."]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to send message."]);
            }
            $stmtInsertMessage->close();
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Claim not found."]);
        }
        $stmt->close();
        break;

    case 'DELETE': // Delete a message
        if (isset($_GET['id'])) {
            $messageId = $_GET['id'];

            $sql = "DELETE FROM messages WHERE id = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $messageId);

            if ($stmt->execute()) {
                echo json_encode(["message" => "Message deleted successfully."]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to delete message."]);
            }
            $stmt->close();
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Message ID is required."]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed."]);
        break;
}

$conn->close();
?>
