<?php
header('Access-Control-Allow-Origin: https://404dnf.vercel.app');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$response = [
    "success" => false,
    "message" => "File upload failed."
];

if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
    // Extract file extension
    $pathInfo = pathinfo($_FILES['file']['name']);
    $fileExtension = $pathInfo['extension'];

    // Determine upload directory and file naming convention
    $action = $_GET['action'] ?? '';
    $uploadDir = $action === 'report' ? "../../uploads/reports/" : "../../uploads/submit/";
    $fileName = ($action === 'report' ? 'report_' : 'submit_') . time();
    $targetFile = $uploadDir . $fileName . '.' . $fileExtension;

    // Ensure the upload directory exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Move the uploaded file
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetFile)) {
        $response["success"] = true;
        $response["message"] = "File uploaded successfully.";
        $response["file_url"] = str_replace("../../", "/", $targetFile); // Ensure correct URL format
    } else {
        $response["message"] = "Failed to move the uploaded file.";
    }
} else {
    $response["message"] = "No file uploaded or upload error: " . ($_FILES['file']['error'] ?? 'Unknown error');
}

header('Content-Type: application/json');
echo json_encode($response);
?>
