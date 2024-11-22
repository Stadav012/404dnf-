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
    $query = 'SELECT * FROM users WHERE username=?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();

    // examining the result
    $result = $stmt->get_result();
    if ($result->num_rows < 1){
        echo '<script> alert("User not recognized in database. Try signing up!"); </script>';
        header("Location: Create/signup.php");
    } else {
        // user exists, to verify passwords match and redirect them to appropriate page
        $rows = $result->fetch_assoc();

        // extracting values from the database, I am assuming only the two (password and username)
        // since database is 404 rn
        $user = $row['username'];
        $user_pass = $row['password'];

        // verifying password with hashed stored password
        if(password_verify($pass, $user_pass)){
            // redirecting based on role (as roles are implemented)
            header("Location: Read/dashboard.php");
        }
    }
    $stmt->close();
}
$conn->close();
?>
