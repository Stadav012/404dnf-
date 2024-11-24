<?php
// Include the config file to connect to the database
include('config.php');

// Check if the request method is PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // Get the raw POST data (since it's PUT, data is usually sent in the body)
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if necessary parameters are available
    if (isset($data['user_id'], $data['fname'], $data['lname'], $data['theme'], $data['profile_pic'])) {

        // Get the parameters
        $user_id = $data['user_id'];
        $fname = $data['fname'];
        $lname = $data['lname'];
        $theme = $data['theme'];
        $profile_pic = $data['profile_pic'];  // Profile picture URL

        // Check if the user exists
        $check_user_sql = "SELECT * FROM users WHERE user_id = ?";
        
        if ($stmt = $conn->prepare($check_user_sql)) {
            // Bind the user_id to the statement
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $stmt->store_result();
            
            if ($stmt->num_rows > 0) {
                // User exists, proceed with update
                $stmt->close();

                // Prepare the UPDATE query
                $update_sql = "UPDATE users SET fname = ?, lname = ?, theme = ?, profile_pic = ? WHERE user_id = ?";

                // Initialize a prepared statement
                if ($stmt = $conn->prepare($update_sql)) {
                    // Bind the parameters to the query
                    $stmt->bind_param("ssssi", $fname, $lname, $theme, $profile_pic, $user_id);

                    // Execute the query
                    if ($stmt->execute()) {
                        // Check if any rows were updated
                        if ($stmt->affected_rows > 0) {
                            echo json_encode(array('message' => 'User details updated successfully.'));
                        } else {
                            echo json_encode(array('message' => 'No changes made or user not found.'));
                        }
                    } else {
                        echo json_encode(array('message' => 'Error updating user: ' . $stmt->error));
                    }

                    // Close the statement
                    $stmt->close();
                } else {
                    echo json_encode(array('message' => 'Error preparing update query: ' . $conn->error));
                }
            } else {
                // User does not exist
                echo json_encode(array('message' => 'User not found.'));
            }
        } else {
            echo json_encode(array('message' => 'Error preparing user check query: ' . $conn->error));
        }

    } else {
        echo json_encode(array('message' => 'Error: Missing required parameters.'));
    }

} else {
    echo json_encode(array('message' => 'Invalid request method. Use PUT.'));
}

// Close the connection
$conn->close();
?>
