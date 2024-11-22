<?php

/* STEPS:
 * including the database connection
 * checking request type, should be POST
 * taking username and password, confirming their availability in the database
 * redirect the user to the appropriate page if details are validated
 * alerting the user to sign-up if their details are not validated
 */

include 'db/config.php';

if($_SERVER["REQUEST METHOD"] == "POST"){
    $username = trim($_POST['username']);
    $pass = trim($_POST['password']);

    // making sure the fields are not empty
    if (empty($username) || empty($password)){
        die('Empty fields detected. Password and username required');
    }

    // to check if user exists in the database
    $query = 'SELECT * FROM 404dnf WHERE username=?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();

    // examining the result
    $result = $stmt->get_result();
    if ($result->num_rows < 1){
        echo '<script> alert("User not recognized in database. Try signing up!"); </script>';
        header("Location: Create/signup.php");
    }
}
?>