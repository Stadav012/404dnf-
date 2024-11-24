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
    // $user_id = 1;
    $category = $data['category'] ?? '';
    $description = $data['description'] ?? '';
    $location_id = $data['location_id'] ?? '';
    $photo_url = $data['photo_url'] ?? '';

    // validating required fields
    if (empty($category) || empty($description) || empty($location_id)) {
        die(json_encode(['success' => false, 'message' => 'Missing required fields.']));
    }

    // validtng category value
    $valid_categories = ['electronics', 'clothing', 'stationery', 'accessories'];
    if (!in_array($category, $valid_categories)) {
        die(json_encode(['success' => false, 'message' => 'Invalid category value.']));
    }

    // insering into submissions table
    $query = 'INSERT INTO submissions (category, description, location_id, photo_url) VALUES (?, ?, ?, ?)';
    $stmt = $conn->prepare($query);
    $stmt->bind_param('ssis', $category, $description, $location_id, $photo_url);

    if ($stmt->execute()) {
        $submission_id = $stmt->insert_id;

        // inserting into users_submissions table
        $query = 'INSERT INTO users_submissions (user_id, submission_id) VALUES (?, ?)';
        $stmt = $conn->prepare($query);
        $stmt->bind_param('ii', $user_id, $submission_id);
        $stmt->execute();

        // updating contribution_counts table
        $query = 'INSERT INTO contribution_counts (user_id, submissions_count) 
                  VALUES (?, 1) ON DUPLICATE KEY UPDATE submissions_count = submissions_count + 1';     // incrementing submissions if key already exists
        $stmt = $conn->prepare($query);
        $stmt->bind_param('i', $user_id);
        $stmt->execute();

        echo json_encode(['success' => true, 'message' => 'Submission posted successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to post submission.']);
    }

    $stmt->close();
}
$conn->close();
?>
