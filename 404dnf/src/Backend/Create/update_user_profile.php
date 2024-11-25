<?php
// display the errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");


// Include the config file to connect to the database
include('../db/config.php');

// start session
session_start();

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if the request method is PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // get the user id
        // Retrieve user ID from query parameters
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid or missing user ID in query parameters.']);
            exit;
        }


    // Get the raw data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

    $profile_pic = null;
    // Handle the profile picture update
    // if the user is updating the profile picture, get file name
    if (isset($_FILES['profilePicture'])) {
        $profile_pic = handleProfilePictureUpload($_FILES['profile_pic'], $user_id);

        if ($profile_pic === null) {
            // Handle error, e.g., invalid file type or failed upload
            echo json_encode(['message' => 'Failed to upload profile picture']);
            exit();
        }
    }


    // the variables can be extracted from the data array or can set to empty string
    $username = isset($data['username']) ? trim($data['username'] ): '';
    $theme = isset($data['theme']) ? trim($data['theme']) : '';
    $new_password = isset($data['new_password']) ? trim($data['new_password']) : '';
    $old_password = isset($data['old_password']) ? trim($data['old_password']) : '';

    // Make the updates to the user profile
    updateUserProfile($conn, $user_id, $username, $profile_pic, $theme, $new_password, $old_password);


} 
else {
    echo json_encode(array('message' => 'Invalid request method. Use PUT.'));
}

// Close the connection
$conn->close();


function updateUserProfile($conn, $user_id, $username, $profile_pic, $theme, $new_password, $old_password) {
    // Check if the username is being updated
    if (!empty($username)) {
        updateUsername($conn, $user_id, $username);
    }

    // Check if the profile picture is being updated
    if (!empty($profile_pic)) {
        updateProfilePic($conn, $user_id, $profile_pic);
    }

    // Check if the theme is being updated
    if (!empty($theme)) {
        updateTheme($conn, $user_id, $theme);
    }

    // Check if the password is being updated
    if (!empty($new_password) && !empty($old_password)) {
        updatePassword($conn, $user_id, $old_password, $new_password);
    }


}



// Function to update the password
function updatePassword($conn, $user_id, $old_password, $new_password) {
    // Step 1: Retrieve the hashed password from the database
    $check_password_sql = "SELECT password FROM users WHERE user_id = ?";

    if ($stmt = $conn->prepare($check_password_sql)) {
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        

        if ($result->num_rows > 0) {
            // User exists
            $row = $result->fetch_assoc();
            $hashed_password = $row['password'];

            // Step 2: Compare the old password with the hashed password
            if (password_verify($old_password, $hashed_password)) {
                // Step 3: Hash the new password
                $new_hashed_password = password_hash($new_password, PASSWORD_DEFAULT);

                // Step 4: Update the password in the database
                $update_sql = "UPDATE users SET password = ? WHERE user_id = ?";
                if ($update_stmt = $conn->prepare($update_sql)) {
                    $update_stmt->bind_param("si", $new_hashed_password, $user_id);

                    if ($update_stmt->execute()) {
                        if ($update_stmt->affected_rows > 0) {
                            // Password updated successfully
                            http_response_code(200);
                            echo json_encode(array('message' => 'Password updated successfully.'));
                        } else {
                            // No rows affected
                            http_response_code(400);
                            echo json_encode(array('message' => 'No changes made.'));
                        }
                    } else {
                        // Update query failed
                        http_response_code(500);
                        echo json_encode(array('message' => 'Error updating password: ' . $update_stmt->error));
                    }

                    $update_stmt->close();
                } else {
                    // Error preparing update statement
                    http_response_code(500);
                    echo json_encode(array('message' => 'Error preparing update query: ' . $conn->error));
                }
            } else {
                // Incorrect old password
                http_response_code(400);
                echo json_encode(array('message' => 'Incorrect old password.'));
            }
        } else {
            // User not found
            http_response_code(404);
            echo json_encode(array('message' => 'User not found.'));
        }

        $stmt->close();
    } else {
        // Error preparing password check statement
        http_response_code(500);
        echo json_encode(array('message' => 'Error preparing password check query: ' . $conn->error));
    }
}

// Function to update the username
function updateUsername($conn, $user_id, $new_username) {

    // check if there is a user with the same username
    $check_sql = "SELECT user_id FROM users WHERE username = ?";
    if ($check_stmt = $conn->prepare($check_sql)) {
        $check_stmt->bind_param("s", $new_username);
        $check_stmt->execute();
        $check_stmt->store_result();

        // If a row exists, the username is already taken
        if ($check_stmt->num_rows > 0) {
            http_response_code(400);
            echo json_encode(array('message' => 'Username already taken.'));
            $check_stmt->close();
            return;
        }
        $check_stmt->close();
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Error checking username availability: ' . $conn->error));
        return;
    }
    

    // Prepare the UPDATE query
    $update_sql = "UPDATE users SET username = ? WHERE user_id = ?";

    // Initialize a prepared statement
    if ($stmt = $conn->prepare($update_sql)) {
        // Bind the parameters to the query
        $stmt->bind_param("si", $new_username, $user_id);

        // Execute the query
        if ($stmt->execute()) {
            // Check if any rows were updated
            if ($stmt->affected_rows > 0) {
                // update the session username
                $_SESSION['username'] = $new_username;
                http_response_code(200);
                echo json_encode(array('message' => 'Username updated successfully.'));
            } else {
                http_response_code(400);
                echo json_encode(array('message' => 'No changes made.'));
            }
        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Error updating username: ' . $stmt->error));
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(array('message' => 'Error preparing update query: ' . $conn->error));
    }
}

// function to update the theme
function updateTheme($conn, $user_id, $new_theme) {
    // Prepare the UPDATE query
    $update_sql = "UPDATE users SET theme = ? WHERE user_id = ?";

    // Initialize a prepared statement
    if ($stmt = $conn->prepare($update_sql)) {
        // Bind the parameters to the query
        $stmt->bind_param("si", $new_theme, $user_id);

        // Execute the query
        if ($stmt->execute()) {
            // Check if any rows were updated
            if ($stmt->affected_rows > 0) {
                // update the session theme
                $_SESSION['theme'] = $new_theme;
                http_response_code(200);
                echo json_encode(array('message' => 'Theme updated successfully.'));
            } else {
                http_response_code(400);
                echo json_encode(array('message' => 'No changes made.'));
            }
        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Error updating theme: ' . $stmt->error));
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(array('message' => 'Error preparing update query: ' . $conn->error));
    }
}

// Function to update profile pic
function updateProfilePic($conn, $user_id, $new_profile_pic){
    // Prepare the UPDATE query
    $update_sql = "UPDATE users SET profile_pic = ? WHERE user_id = ?";

    // Initialize a prepared statement
    if ($stmt = $conn->prepare($update_sql)) {
        // Bind the parameters to the query
        $stmt->bind_param("si", $new_profile_pic, $user_id);

        // Execute the query
        if ($stmt->execute()) {
            // Check if any rows were updated
            if ($stmt->affected_rows > 0) {
                // update the session profile pic
                $_SESSION['profile_pic'] = $new_profile_pic;
                http_response_code(200);
                echo json_encode(array('message' => 'Profile picture updated successfully.'));
            } else {
                http_response_code(400);
                echo json_encode(array('message' => 'No changes made.'));
            }
        } else {
            http_response_code(500);
            echo json_encode(array('message' => 'Error updating profile picture: ' . $stmt->error));
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(array('message' => 'Error preparing update query: ' . $conn->error));
    }
}


/**
 * Handles the profile picture upload and returns the path to the saved image.
 * Creates a unique directory for each user based on their user ID.
 * If the file already exists, it removes the old file before saving the new one.
 * 
 * @param array $file The file array from the uploaded file (usually $_FILES['profilePicture']).
 * @param int $userId The user ID to create a user-specific directory.
 * @param string $baseDir The base directory where user-specific directories will be created.
 * @return string|null The relative file path to the image, or null if the upload failed.
 */
function handleProfilePictureUpload($file, $userId, $baseDir = 'images/profiles/')
{
    // Check if file is uploaded without errors
    if ($file['error'] === UPLOAD_ERR_OK) {
        // Create the user-specific directory if it doesn't exist
        $userDir = $baseDir . $userId . '/';
        if (!file_exists($userDir)) {
            mkdir($userDir, 0777, true); // Create directory with appropriate permissions
        }

        // Set the target file path
        $targetFile = $userDir . basename($file['name']);
        $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        
        // Validate the file type (optional, you can allow more types)
        $allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
        if (!in_array($fileType, $allowedTypes)) {
            return null; // Invalid file type
        }
        
        // Check file size (optional, here limiting to 5MB max)
        if ($file['size'] > 5 * 1024 * 1024) {
            return null; // File too large
        }
        
        // Check if the file already exists
        if (file_exists($targetFile)) {
            // Delete the old file
            unlink($targetFile); // Removes the old file
        }
        
        // Move the uploaded file to the user-specific directory
        if (move_uploaded_file($file['tmp_name'], $targetFile)) {
            // Return the relative file path to the uploaded image
            return '/images/profiles/' . $userId . '/' . basename($file['name']);
        } else {
            return null; // Failed to move file
        }
    } else {
        return null; // Error during upload
    }
}



?>



