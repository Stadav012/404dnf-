<?php
// Include config.php
include('../db/config.php');

// Start session
session_start();

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(array('message' => 'User is not logged in!', 'redirect' => 'login.php'));
    exit();
}

// Retrieve the role from the session
$role = $_SESSION['role'];
// $role = 1; // default for testing purposes

// Check if user is an admin
// if ($role != 1) {
//     http_response_code(403); // Forbidden
//     echo json_encode(array('message' => 'Only admins allowed!', 'redirect' => 'index.php'));
//     exit();
// }

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_GET['user_id'];
    // Get one user with given user_id
    $query = 'SELECT user_id, username, fname, lname, email, created_at, last_login, profile_pic, role FROM users WHERE user_id = ?';

    $stmt = $conn->prepare($query);
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        http_response_code(200); // OK
        echo json_encode($row);
    } 
    else {
        http_response_code(404); // Not Found
        echo json_encode(array('message' => 'User not found!'));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('message' => 'Method not allowed.'));
}

?>
