<?php
header("Access-Control-Allow-Origin: http://127.0.0.1:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$db = "404dnf";

$conn = mysqli_connect($servername, $username, $password, $db);

if ($conn){
    echo '404dnf Connected Successfully';
} else {
    die('Failed to connect: ' . mysqli_connect_error());
}

?>