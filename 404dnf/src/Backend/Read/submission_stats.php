<?php
// get the user's submission stats

// include the config file
include('config.php');

// start a session
session_start();

// check if user is logged in
if (!isset($_SESSION['user_id'])) {
    // send the url to the login page
    http_response_code(401);
    echo json_encode(['message' => 'user not logged in', 'redirect' => 'login.html']);
    exit();
}


// check the request method
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // get the user id from the session
    $user_id = $_SESSION['user_id'];
    // $user_id = 4; // default for testing purposes

    // get the user's found items
    $sql = "SELECT contribution_id, reports_count, submissions_count
            FROM contribution_counts 
            WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();


    // check if there are any found items
    if ($result->num_rows > 0) {
        // if there are, fetch the results
        $row = $result->fetch_assoc();

        http_response_code(200);
        // return the found items as JSON
        echo json_encode(['submission_stats' => $row]);

    } else {
        // if there are no found items, return an empty array
        http_response_code(404);
        echo json_encode(['message' => 'No submission stats found']);
    }
} else {
    // if the request method is not GET, return an error
    http_response_code(405);
    echo json_encode(['error' => 'Invalid request method']);
}

?>