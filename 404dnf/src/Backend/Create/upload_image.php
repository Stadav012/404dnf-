<?php
header('Access-Control-Allow-Origin: https://404dnf.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$response = [
    "success" => false,
    "message" => "File upload failed."
];

// Check if a file was uploaded
if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    // Extract the file extension
    $pathInfo = pathinfo($_FILES['file']['name']);
    $fileExtension = $pathInfo['extension'];

    $action = $_GET['action'];
    echo $action . " is the action";
    if ($_GET['action'] == 'report') {
        $uploadDir = "../../uploads/reports/"; // Directory to store uploaded files
        $fileName = 'report_' . time();
        $targetFile = $fileName . '.' . $fileExtension; // Use original extension
    } else if($_GET['action'] == 'submit') {
        $uploadDir = "../../uploads/submit/"; // Directory to store uploaded files
        $fileName = 'submit_' . time();
        $targetFile = $fileName . '.' . $fileExtension; // Use original extension
    }

    // Create upload directory if it doesn't exist
    if (!is_dir($uploadDir)) {
        echo 'making directory';
        mkdir($uploadDir, 0777, true);
    }

    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $response["success"] = true;
        $response["message"] = "File uploaded successfully.";
        $response["file_url"] = $targetFile; // Provide the correct file path
    } else {
        $response["message"] = "Failed to move the uploaded file.";
    }
} else {
    $response["message"] = "No file uploaded or upload error: " . $_FILES['file']['error'];
}

// Return the response as JSON
echo json_encode($response);
?>
