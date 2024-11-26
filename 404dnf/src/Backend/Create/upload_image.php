<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');

$response = [
    "success" => false,
    "message" => "File upload failed."
];

// Check if a file was uploaded
if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    $uploadDir = "uploads/"; // Directory to store uploaded files
    $fileName = basename($_FILES['file']['name']);
    $targetFile = $uploadDir . $fileName;
    echo 'target file: ' . $targetFile;

    // Create upload directory if it doesn't exist
    if (!is_dir($uploadDir)) {
        echo 'making directory';
        mkdir($uploadDir, 0777, true);
    }

    // Move the uploaded file to the target directory
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $response["success"] = true;
        $response["message"] = "File uploaded successfully.";
        $response["file_url"] = $targetFile; // Provide the file path for further use
    } else {
        $response["message"] = "Failed to move the uploaded file.";
    }
} else {
    $response["message"] = "No file uploaded or upload error.";
}

// Return the response as JSON
echo json_encode($response);
?>
