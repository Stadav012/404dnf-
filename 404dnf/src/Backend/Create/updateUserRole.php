<?php
include('../db/config.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = $data['user_id'];
    $role = $data['role'];

    $stmt = $conn->prepare('UPDATE users SET role = ? WHERE user_id = ?');
    $stmt->bind_param('si', $role, $user_id);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Role updated successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to update role']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
?>
