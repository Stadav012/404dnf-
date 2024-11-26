<?php
 include("db/config.php");
// Get the payload
    $data = json_decode(file_get_contents("php://input"), true);

    $claimId = $data['claim_id'];
    $userId = $data['user_id'];
    $status = $data['status'];
    $Username = $data['username'];

    // The message
    $message = "Hi $Username, your claim (ID: $claimId) has been $status.";

    // Insert notification into a table (e.g., notifications table)
    $sql = "INSERT INTO notifications (user_id, message, created_at) VALUES (?, ?, NOW())";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $userId, $message);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Notification sent successfully."]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to send notification."]);
    }

    $stmt->close();
    $conn->close();

?>