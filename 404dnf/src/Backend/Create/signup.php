<?php

/**
 * STEPS:
 * checking request type to make sure its a POST
 * submitting form to server
 * checking if there is data in the form and collect it
 * checking if registering details already in the db, to avoid duplicating accounts
 * hashing password
 * posting user data to the database
 */

include '../db/config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST"){
    $fname = trim($_POST['fname']);
    $lname = trim($_POST['lname']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);
    $confirmPass = trim($_POST['confirmPass']);
    $role = 'regular';
    // $dashboard_feel = trim($_POST['feel_choice']);          // for customized dashboard experience. might be a radio button where user chooses from the available choices

    // ensuring no form fields are empty
    if (empty($fname) || empty($lname) || empty($email) || empty($password) || empty($confirmPass) || empty($dashboard_feel)){
        die('Empty field detected! Complete Signup Form.');
    }

    // ensuring password and confirmation password match
    if($password != $confirmPass){
        die('Passwords do not match!');
    }

    // checking if user already exists in the database
    $query = 'SELECT email FROM users WHERE email=?';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('s', $email);
    $stmt->execute();

    // checking the results
    $result = $stmt->get_result();
    if ($result->num_rows < 1){
        // securing user password and posting data to the database
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        // inserting data to the database, query to be adjusted to fit final database design
        $qr = 'INSERT INTO users(fname, lname, email, password, role) VALUES (?,?,?,?,?)';
        $stmt->$conn->prepare($qr);
        $stmt->bind_param('sssss', $fname, $lname, $email, $hashed_password, $role);

        // redirecting user to login if signing up has been completed, and back to signup otherwise
        if($stmt->execute()){
            header("Location: ../login.php");
        } else{
            header("Location: signup.php");
        }
        

    } else {
        echo '<script> alert("User already exists! Try Logging in."); </script>';
        header("Location: ../login.php");
    }
    $stmt->close();

}
$conn->close();
?>