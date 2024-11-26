<?php

    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Include the database connection
include('db/config.php');

// Set headers for JSON response
header('Content-Type: application/json');
if($_SERVER['REQUEST_METHOD']=='OPTIONS'){
http_response_code(200);
exit();
}
// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Switch to handle different HTTP methods
switch ($method) {
    case 'GET':
        // Decode input data (optional for GET, but ensures consistency)
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['claim_id'])) {
            // Retrieve a specific claim by ID
            $stmt = $conn->prepare("
                SELECT 
    c.claim_id, 
    u.username, 
    r.item_description, 
    s.description AS submission_description, 
    r.photo_url AS report_photo_url, 
    s.photo_url AS submission_photo_url
FROM 
    claims AS c
INNER JOIN 
    users AS u ON c.user_id = u.user_id
INNER JOIN 
    reports AS r ON c.report_id = r.report_id
INNER JOIN 
    submissions AS s ON c.submission_id = s.submission_id

                WHERE c.claim_id = ?
            ");
            $stmt->bind_param('i', $data['claim_id']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $claim = $result->fetch_assoc();
                echo json_encode($claim);
            } else {
                echo json_encode(['message' => 'Claim not found']);
            }
        } else {
            // Retrieve all claims
            $stmt = $conn->prepare("
                SELECT 
                c.status,
    c.claim_id, 
    u.username, 
    r.item_description, 
    s.description AS submission_description, 
    r.photo_url AS report_photo_url, 
    s.photo_url AS submission_photo_url
FROM 
    claims AS c
INNER JOIN 
    users AS u ON c.user_id = u.user_id
INNER JOIN 
    reports AS r ON c.report_id = r.report_id
INNER JOIN 
    submissions AS s ON c.submission_id = s.submission_id


            ");
            $stmt->execute();
            $result = $stmt->get_result();

            $claims = [];
            while ($row = $result->fetch_assoc()) {
                $claims[] = $row;
            }

            echo json_encode($claims);
        }
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['user_id']) || !isset($data['submission_id']) || !isset($data['report_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        $stmt = $conn->prepare("
            INSERT INTO claims (user_id, submission_id, report_id, status) 
            VALUES (?, ?, ?, 'pending')
        ");
        $stmt->bind_param('iii', $data['user_id'], $data['submission_id'], $data['report_id']);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Claim created successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create claim']);
        }
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);

        if (!isset($data['claim_id']) || !isset($data['status'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing required fields']);
            exit;
        }

        // Validate status input
        $valid_statuses = ['pending', 'approved', 'rejected'];
        if (!in_array($data['status'], $valid_statuses)) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid status value']);
            exit;
        }

        // Retrieve the report ID linked to the claim
        $stmt = $conn->prepare("SELECT report_id FROM claims WHERE claim_id = ?");
        $stmt->bind_param('i', $data['claim_id']);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(['error' => 'Claim not found']);
            exit;
        }

        $row = $result->fetch_assoc();
        $report_id = $row['report_id'];

        if ($data['status'] === 'rejected') {
            // Delete the claim
            $deleteStmt = $conn->prepare("DELETE FROM claims WHERE claim_id = ?");
            $deleteStmt->bind_param('i', $data['claim_id']);
            if ($deleteStmt->execute()) {
                echo json_encode(['message' => 'Claim rejected and deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete claim']);
            }
        } elseif ($data['status'] === 'approved') {
            // Delete the associated report
            $deleteReportStmt = $conn->prepare("DELETE FROM reports WHERE report_id = ?");
            $deleteReportStmt->bind_param('i', $report_id);
            if ($deleteReportStmt->execute()) {
                // Optionally delete related claims for the report
                $deleteClaimsStmt = $conn->prepare("DELETE FROM claims WHERE report_id = ?");
                $deleteClaimsStmt->bind_param('i', $report_id);
                $deleteClaimsStmt->execute();

                echo json_encode(['message' => 'Claim approved and report deleted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to delete report']);
            }
        } else {
            // Simply update the claim status
            $updateStmt = $conn->prepare("UPDATE claims SET status = ? WHERE claim_id = ?");
            $updateStmt->bind_param('si', $data['status'], $data['claim_id']);
            if ($updateStmt->execute()) {
                echo json_encode(['message' => 'Claim status updated successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Failed to update claim status']);
            }
        }
        break;

    case 'DELETE':
        if (!isset($_GET['claim_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Missing claim_id']);
            exit;
        }

        $stmt = $conn->prepare("DELETE FROM claims WHERE claim_id = ?");
        $stmt->bind_param('i', $_GET['claim_id']);

        if ($stmt->execute()) {
            echo json_encode(['message' => 'Claim deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete claim']);
        }
        break;

    default:
        http_response_code(405); // Method Not Allowed
        echo json_encode(['error' => 'Method not allowed']);
        break;
}
?>
