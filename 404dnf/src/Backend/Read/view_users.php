<?php
// Include config.php
include('config.php');

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
$role = 1; // default for testing purposes

// Check if user is an admin
if ($role != 1) {
    http_response_code(403); // Forbidden
    echo json_encode(array('message' => 'Only admins allowed!', 'redirect' => 'index.php'));
    exit();
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get all users
    $query = 'SELECT user_id, username, fname, lname, email, created_at, last_login, profile_pic, role FROM users';
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $users = array();
        while ($row = $result->fetch_assoc()) {
            $users[] = $row;
        }

        http_response_code(200); // OK
        echo json_encode($users);
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array('message' => 'No users found!'));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('message' => 'Method not allowed.'));
}

?>
