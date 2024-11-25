<?php
// Include the config file
include('../db/config.php');

// start session
session_start();

// show errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);


// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    // Set the response code to 401 (Unauthorized)
    http_response_code(401);
    // Set the response message
    echo json_encode(array('message' => 'User is not logged in!', 'redirect' => 'login.php'));
    // Exit the script
    exit();
}

// Retrieve the role from the session
$role = $_SESSION['role'];
// $role = 1; // default for testing purposes

// Check if user is an admin
if ($role != "admin") {
    // Set the response code to 403 (Forbidden)
    http_response_code(403);
    // Set the response message
    echo json_encode(array('message' => 'Only admins allowed!', 'redirect' => 'index.php'));
    // Exit the script
    exit();
}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $user_id = $data['user_id'];

    $stmt = $conn->prepare('DELETE FROM users WHERE user_id = ?');
    $stmt->bind_param('i', $user_id);
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'User deleted successfully']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to delete user']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}

// Close the connection
$conn->close();
?>
