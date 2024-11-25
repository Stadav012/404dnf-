<?php
// Include config.php
include('../db/config.php');

// Start session
session_start();

// Check if user is logged in
if (!isset($GET['id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(array('message' => 'User is not logged in!', 'redirect' => 'login.php'));
    exit();
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get all locations
    $query = 'SELECT location_id, location_name FROM locations';
    $stmt = $conn->prepare($query);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $locations = array();  // Change variable name to reflect the data we're fetching
        while ($row = $result->fetch_assoc()) {
            $locations[] = $row;
        }

        http_response_code(200); // OK
        echo json_encode($locations);  // Return locations
    } else {
        http_response_code(404); // Not Found
        echo json_encode(array('message' => 'No locations found!'));
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array('message' => 'Method not allowed.'));
}

?>
