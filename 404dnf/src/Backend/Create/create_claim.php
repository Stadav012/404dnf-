<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Database connection
include 'db/config.php';
// header("Content-Type: application/json");

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $userId = $data['user_id'] ?? null;
    $submissionId = $data['submission_id'] ?? null;
    $reportId = $data['report_id'] ?? null;

    if (!$userId || !$submissionId || !$reportId) {
        echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
        exit;
    }

    // Insert into claims table
    $stmt = $conn->prepare("INSERT INTO claims (user_id, submission_id, report_id, status, created_at, updated_at) VALUES (?, ?, ?, 'pending', NOW(), NOW())");
    $stmt->bind_param("iii", $userId, $submissionId, $reportId);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Claim created successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to create claim.']);
    }

    $stmt->close();
    $conn->close();
}
?>
