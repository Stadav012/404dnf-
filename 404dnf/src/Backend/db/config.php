<?php

// Allow cross-origin requests
// header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');


// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$db = "404dnf";

$conn = mysqli_connect($servername, $username, $password, $db);

if (!$conn) {
    die('Failed to connect: ' . mysqli_connect_error());
}

// For debugging only 
// echo '404dnf Connected Successfully';

?>
