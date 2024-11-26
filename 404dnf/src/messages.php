<?php
include("db/config.php");

// Handle different HTTP methods
$method = $_SERVER['REQUEST_METHOD'];

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

    case 'GET': // Read messages for a user
        if (isset($_GET['user_id'])) {
            $userId = $_GET['user_id'];
            $sql = "SELECT * FROM messages WHERE user_id = ? ORDER BY created_at DESC";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $userId);
            $stmt->execute();
            $result = $stmt->get_result();
            $messages = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($messages);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "User ID is required."]);
        }
        break;

    case 'PUT': // Mark a message as read
        $data = json_decode(file_get_contents("php://input"), true);
        $messageId = $data['id'];

        $sql = "UPDATE messages SET status = 'read' WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $messageId);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Message marked as read."]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to mark message as read."]);
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
