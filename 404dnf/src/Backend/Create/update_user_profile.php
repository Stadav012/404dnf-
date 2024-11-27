<?php
header('Access-Control-Allow-Origin: https://404dnf.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// display the errors
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

// Include the config file to connect to the database
include('../db/config.php');

// start session
session_start();
header('Content-Type: application/json');


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Handle preflight request
    http_response_code(200);
    exit(0);
}

// Check if the request method is PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    // get the user id
        // Retrieve user ID from query parameters
        if (isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            // $user_id = 12; // set a default id
        } else {
            http_response_code(400);
            echo json_encode(['message' => 'Invalid or missing user ID in query parameters.']);
            exit;
        }


    // Get the raw data from the request body
    $data = json_decode(file_get_contents("php://input"), true);

  

    // the variables can be extracted from the data array or can set to empty string
    $username = isset($data['username']) ? trim($data['username'] ): '';
    $theme = isset($data['theme']) ? trim($data['theme']) : '';
    $new_password = isset($data['new_password']) ? trim($data['new_password']) : '';
    $old_password = isset($data['old_password']) ? trim($data['old_password']) : '';
    $profile_pic = isset($data['profile_pic']) ? handleBase64ProfilePicture(trim($data['profile_pic']), $user_id) : '';
    

    // Make the updates to the user profile
    updateUserProfile($conn, $user_id, $username, $profile_pic, $theme, $new_password, $old_password);


} 
else {
    echo json_encode(array('message' => 'Invalid request method. Use PUT.'));
}

// Close the connection
$conn->close();


function updateUserProfile($conn, $user_id, $username, $profile_pic, $theme, $new_password, $old_password) {


    // store the updated changes here
    $response = ['theme_update' => null, 'username_update' => null, 'profile_pic_update' => null, 'password_update' => null];
    // Check if the username is being updated
    if (!empty($username)) {
        // then add the username to the response
        $response['username_update' ] = updateUsername($conn, $user_id, $username);
        // updateUsername($conn, $user_id, $username);
    }


        // Check if the profile picture is being updated
    if (!empty($profile_pic)) {
        // if the profile pic is updated, add it to the response
        $response['profile_pic_update'] = updateProfilePic($conn, $user_id, $profile_pic);
    }

    // Check if the theme is being updated
    if (!empty($theme)) {
        // if the theme is updated, add it to the response
        $response['theme_update'] = updateTheme($conn, $user_id, $theme);
        // $response[] = ['theme_update' => updateTheme($conn, $user_id, $theme)];
        // updateTheme($conn, $user_id, $theme);
    }

    // Check if the password is being updated
    if (!empty($new_password) && !empty($old_password)) {
        $response['password_update'] = updatePassword($conn, $user_id, $old_password, $new_password);
        // echo "updating password";
        // updatePassword($conn, $user_id, $old_password, $new_password);
    }

    http_response_code(200);
    echo json_encode(['updates' => $response]);


}


// Function to update the password
function updatePassword($conn, $user_id, $old_password, $new_password) {
    // echo "starting to change password";
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
                            return ['success' => true, 'message' => 'Password updated successfully.'];
                        }
                    }
                }
            }
    } 
    }
    return ['success' => false, 'message' => 'Password not updated.'];
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
            // http_response_code(210);
            // echo json_encode(array('message' => 'Username already taken.'));
            // $check_stmt->close();
            return ['success' => false, 'message' => 'Username already taken.', 'username' => null];
        }
        $check_stmt->close();
    } else {
        // http_response_code(500);
        // echo json_encode(array('message' => 'Error checking username availability: ' . $conn->error));
        return ['success' => false, 'message' => 'Error checking username availability', 'username' => null];
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
                return ['success' => true, 'message' => 'Username updated successfully.', 'username' => $new_username];
            }
        }
    }
    return ['success' => false, 'message' => 'Username not updated.', 'username' => null];
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
                // http_response_code(200);
                // echo json_encode(array(
                //     'message' => 'Theme updated successfully.',
                //     'theme' => $new_theme
                // ));
                return ['success' => true, 'message' => 'Theme updated successfully.', 'theme' => $new_theme];
            } 
        }
    }
    return ['success' => false, 'message' => 'Theme not updated.', 'theme' => null];
}




/**
 * Handles the profile picture upload from a Base64 string and saves it to a user-specific directory.
 * 
 * @param string $base64Image The Base64-encoded string of the image.
 * @param int $userId The user ID to create a user-specific directory.
 * @param string $baseDir The base directory where user-specific directories will be created.
 * @return string|null The relative file path to the image, or null if the decoding or saving failed.
 */
function handleBase64ProfilePicture($base64Image, $userId, $baseDir = '../../uploads/profiles/')
{
    // $baseDir = $_SERVER['DOCUMENT_ROOT'] . '/Backend/Create/uploads/profiles/';
    $baseDir =  '../../uploads/profiles/';


    // /Applications/XAMPP/xamppfiles/htdocs/Backend/Create/uploads
    // /Applications/XAMPP/xamppfiles/htdocs/Backend/Create/uploads/profiles
    // Decode the Base64 string
    $imageData = explode(',', $base64Image); // Separate metadata from actual image data
    $imageDecoded = base64_decode(end($imageData));
    if ($imageDecoded === false) {
        return null; // Decoding failed
    }

    // Create the user-specific directory if it doesn't exist
    $userDir = $baseDir . $userId . '/';
    if (!file_exists($userDir)) {
        mkdir($userDir, 0777, true); // Create directory with appropriate permissions
    }

    // Determine the file type (assuming the input includes a MIME type)
    $fileType = null;
    if (strpos($imageData[0], 'image/jpeg') !== false) {
        $fileType = 'jpg';
    } elseif (strpos($imageData[0], 'image/png') !== false) {
        $fileType = 'png';
    } elseif (strpos($imageData[0], 'image/gif') !== false) {
        $fileType = 'gif';
    }

    if (!$fileType) {
        return null; // Unsupported file type
    }

    // Set the target file path
    $targetFile = $userDir . uniqid('profile_', true) . '.' . $fileType;

    // Save the decoded image data to the file
    if (file_put_contents($targetFile, $imageDecoded) !== false) {
        return '/' . $targetFile; // Return the relative path
    } else {
        return null; // Failed to save the image
    }
}

// Function to update profile pic
function updateProfilePic($conn, $user_id, $new_profile_pic)
{
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
                // Update the session profile pic
                return ['success' => true, 'message' => 'Profile picture updated successfully.', 'profile_pic' => $new_profile_pic];
            }
        }
    }
    return ['success' => false, 'message' => 'Profile picture not updated.', 'profile_pic' => null];
}



?>



