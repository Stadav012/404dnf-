<?php
// allow cross-origin requests for all routes
// header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: https://404dnf.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    exit(0);
}
// Display errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

$response = [
    'success' => false,
    'message' => 'Something went wrong.'
];

// Include config.php
include('../db/config.php');

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the post data
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract variables
    $lname = $data['lastname'];
    $fname = $data['firstname'];
    $email = $data['email'];
    $password = $data['password'];
    $username = $data['username'];

    // Ensure no fields are empty
    if (empty($fname) || empty($lname) || empty($email) || empty($password) || empty($username)) {
        http_response_code(400); // Bad Request
        echo json_encode(array('message' => 'Empty field detected! Complete Signup Form.'));
        exit();
    }

    // Check if email already exists
    $query = 'SELECT user_id FROM users WHERE email=?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result1 = $stmt->get_result();

    if ($result1->num_rows > 0) {
        http_response_code(409); // Conflict
        echo json_encode(array('message' => 'Email already in use!'));
        exit();
    }

    // Check if username already exists
    $query = 'SELECT user_id FROM users WHERE username=?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $username);
    $stmt->execute();
    $result2 = $stmt->get_result();

    if ($result2->num_rows > 0) {
        http_response_code(409); // Conflict
        echo json_encode(array('message' => 'Username already in use!'));
        exit();
    }

    // Hash password before saving
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Set the default role to user (2- regular user)
    $role = '2';

    // Insert data into the database
    $qr = 'INSERT INTO users(username, fname, lname, email, password, role) VALUES (?,?,?,?,?,?)';
    $stmt = $conn->prepare($qr);
    $stmt->bind_param('ssssss', $username, $fname, $lname, $email, $hashed_password, $role);

    // Execute the query and check for success
    if ($stmt->execute()) {
        http_response_code(200); // Success
        $response['success'] = true;
        $response['message'] = 'Registration successful.';
        echo json_encode(array('message' => 'Registration successful!', 'success' => true));
    } else {
        http_response_code(500); // Internal Server Error
        $response['message'] = 'Error registering user.';
        echo json_encode(array('message' => 'Could not register!', 'redirect' => 'signup.php'));
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('message' => 'Method not allowed.'));
}

// {
//     "username": "dkt",
//     "fname": "Daisy",
//     "lname": "Tsenesa",
//     "email": "daisy.tsenesa@gmail.com",
//     "password": "Daisy333#"
// }

?>