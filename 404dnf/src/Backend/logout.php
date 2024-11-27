<?php
header('Access-Control-Allow-Origin: https://404dnf.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

session_start();  // Start the session
// Check if the session is already started
if (isset($_SESSION)) {

    // Destroy session variables and the session
    session_unset();
    session_destroy();

    // Clear session cookie if needed
    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

// Redirect to login page
// header("Location: /auth");
 // Return a success message to the client
    echo json_encode(["status" => "success", "message" => "Logged out successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "No session found"]);
}
exit();


?>