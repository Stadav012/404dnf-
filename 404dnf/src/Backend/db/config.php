<?php

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