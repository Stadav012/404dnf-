<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Include config.php
include('db/config.php');

// Start session
session_start();

// // Check if user is already logged in
// if (isset($_SESSION['user_id'])) {
//     http_response_code(200); // OK
//     // Set session variables with all user details
//         $_SESSION['user_id'] = $user['user_id'];
//         $_SESSION['username'] = $user['username'];
//         $_SESSION['email'] = $user['email'];
//         $_SESSION['fname'] = $user['fname'];
//         $_SESSION['lname'] = $user['lname'];
//         $_SESSION['profile_pic'] = $user['profile_pic'];
//         $_SESSION['theme'] = $user['theme'];
//         $_SESSION['role'] = $user['role'];

//         // Redirect URL after login
//         http_response_code(200); // OK
//         echo json_encode(array(
//             'message' => 'User already logged in!',
//             'redirect_url' => 'http://localhost:3000',  // Add the URL for the homepage
//             'user_id' => $_SESSION['user_id'],
//             'username' => $_SESSION['username'],
//             'email' => $_SESSION['email'],
//             'fname' => $_SESSION['fname'],
//             'lname' => $_SESSION['lname'],
//             'profile_pic' => $_SESSION['profile_pic'],
//             'theme' => $_SESSION['theme'],
//             'role' => $_SESSION['role'],
//         ));
//     exit();
// }

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the post data
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract variables
    $email = $data['email'];
    $password = $data['password'];

    // Ensure no fields are empty
    if (empty($email) || empty($password)) {
        http_response_code(400); // Bad Request
        echo json_encode(array('message' => 'Empty field detected! Complete Login Form.'));
        exit();
    }

    // Check if email exists and retrieve all necessary user details
    $query = 'SELECT user_id, username, email, password, fname, lname, profile_pic, theme, role FROM users WHERE email=?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 0) {
        http_response_code(404); // Not Found
        echo json_encode(array('message' => 'Email not found!'));
        exit();
    }

    // Check if password is correct
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Password is correct
        // Set session variables with all user details
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['fname'] = $user['fname'];
        $_SESSION['lname'] = $user['lname'];
        $_SESSION['profile_pic'] = $user['profile_pic'];
        $_SESSION['theme'] = $user['theme'];
        $_SESSION['role'] = $user['role'];

        // Redirect URL after login
        http_response_code(200); // OK
        echo json_encode(array(
            'message' => 'Login successful!',
            'redirect_url' => 'http://localhost:3000',  // Add the URL for the homepage
            'user_id' => $_SESSION['user_id'],
            'username' => $_SESSION['username'],
            'email' => $_SESSION['email'],
            'fname' => $_SESSION['fname'],
            'lname' => $_SESSION['lname'],
            'profile_pic' => $_SESSION['profile_pic'],
            'theme' => $_SESSION['theme'],
            'role' => $_SESSION['role'],
        ));
    } else {
        // Password is incorrect
        http_response_code(401); // Unauthorized
        echo json_encode(array('message' => 'Incorrect password!'));
    }
}

// {
//     "email": "daisy.tsenesa@gmail.com",
//     "password": "Daisy333#"
// }


?>
