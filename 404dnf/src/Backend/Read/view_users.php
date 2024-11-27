<?php
// Include config.php
include('../db/config.php');

// Start session
session_start();

// Check if user is logged in
if (!isset($_GET['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(array('message' => 'User is not logged in!', 'redirect' => 'login.php'));
    exit();
}

// Retrieve the role from the session
$role = $_GET['role'];

// Check if user is an admin
if ($role != "admin") {
    http_response_code(403); // Forbidden
    echo json_encode(array('message' => 'Only admins allowed!', 'redirect' => 'index.php'));
    exit();
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Main query to fetch user details
    $query = '
        SELECT 
            u.user_id, 
            u.username, 
            u.fname, 
            u.lname, 
            u.email, 
            u.created_at, 
            u.last_login, 
            u.profile_pic, 
            u.role,
            COUNT(DISTINCT ur.user_report_id) AS reports,
            COUNT(DISTINCT us.user_submission_id) AS submittedLostItems,
            COUNT(DISTINCT c.claim_id) AS claims
        FROM users u
        LEFT JOIN users_reports ur ON u.user_id = ur.user_id
        LEFT JOIN users_submissions us ON u.user_id = us.user_id
        LEFT JOIN claims c ON u.user_id = c.user_id
        GROUP BY u.user_id
    ';

    $stmt = $conn->prepare($query);

    if ($stmt) {
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
        http_response_code(500); // Internal Server Error
        echo json_encode(array('message' => 'Failed to prepare query.'));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('message' => 'Method not allowed.'));
}

?>
