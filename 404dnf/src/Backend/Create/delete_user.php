<?php
// Include the config file
include('config.php');

// start session
session_start();

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
if ($role != 1) {
    // Set the response code to 403 (Forbidden)
    http_response_code(403);
    // Set the response message
    echo json_encode(array('message' => 'Only admins allowed!', 'redirect' => 'index.php'));
    // Exit the script
    exit();
}



// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    // Set the response code to 405 (Method Not Allowed)
    http_response_code(405);
    // Set the response message
    echo json_encode(array('message' => 'Method not allowed.'));
    // Exit the script
    exit();
}

// Check if the 'user_id' is passed as a GET or POST parameter
if (isset($_GET['user_id']) || isset($_POST['user_id'])) {
    // Get the user_id from the request
    $user_id = isset($_GET['user_id']) ? $_GET['user_id'] : $_POST['user_id'];
    

    // Prepare the DELETE query
    $sql = "DELETE FROM users WHERE user_id = ?";

    // Initialize a prepared statement
    if ($stmt = $conn->prepare($sql)) {
        // Bind the user_id to the statement
        $stmt->bind_param("i", $user_id);

        // Execute the query
        if ($stmt->execute()) {
            // Check if any row was deleted
            if ($stmt->affected_rows > 0) {
                echo "User with ID $user_id has been deleted successfully.";
            } else {
                echo "No user found with ID $user_id.";
            }
        } else {
            echo "Error deleting user: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Error preparing query: " . $conn->error;
    }
} else {
    echo "Error: User ID is required.";
}

// Close the connection
$conn->close();
?>
