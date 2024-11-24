<?php

include 'config.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!isset($_SESSION['user_id'])) {
        die(json_encode(['success' => false, 'message' => 'User not logged in']));
    }

    $user_id = $_SESSION['user_id'];
    // $user_id = 1;   // debugging purposes
    $item_description = $data['item_description'] ?? '';
    $category = $data['category'] ?? '';
    $location_id = $data['location_id'] ?? '';
    $photo_url = $data['photo_url'] ?? '';

    // validating required fields
    if (empty($item_description) || empty($category) || empty($location_id)) {
        die(json_encode(['success' => false, 'message' => 'Missing required fields.']));
    }

    // validating category value
    $valid_categories = ['electronics', 'clothing', 'stationery', 'accessories'];
    if (!in_array($category, $valid_categories)) {
        die(json_encode(['success' => false, 'message' => 'Invalid category value.']));
    }

    // insering into reports table
    $query = 'INSERT INTO reports (item_description, category, location_id, photo_url) VALUES (?, ?, ?, ?)';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssis', $item_description, $category, $location_id, $photo_url);

    if ($stmt->execute()) {
        $report_id = $stmt->insert_id;

        // inserting into users_reports table
        $query = 'INSERT INTO users_reports (user_id, report_id) VALUES (?, ?)';
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ii', $user_id, $report_id);
        $stmt->execute();

        // updating contribution_counts table
        $query = 'INSERT INTO contribution_counts (user_id, reports_count) 
                  VALUES (?, 1) ON DUPLICATE KEY UPDATE reports_count = reports_count + 1';     // increment value if user_id already exists
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $user_id);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Report submitted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to submit report.']);
    }

    $stmt->close();
}
$conn->close();
?>
