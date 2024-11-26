<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the config file to connect to the database
include('../db/config.php');

// start a session
session_start();
header('Content-Type: application/json');

// // Check if user is logged in
// if (!isset($_SESSION['user_id'])) {
//     // send the url to the login page
//     http_response_code(401);
//     echo json_encode(['message' => 'user not logged in', 'redirect' => 'login.html']);
//     exit();
// }

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Get the user_id from the request
    if (isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];
        // $user_id = 1; // default for testing purposes

        // Query to check if the user has any pending reports
        $check_status_sql = "SELECT report_status FROM users WHERE user_id = ?";
        
        if ($status_stmt = $conn->prepare($check_status_sql)) {
            $status_stmt->bind_param("i", $user_id);
            $status_stmt->execute();
            $status_result = $status_stmt->get_result();
            $status_row = $status_result->fetch_assoc();

            // Check if the user has a pending report (status = 1)
            if ($status_row['report_status'] == 1) {

                // Get report IDs for the user from the users_reports table
                $reports_sql = "
                    SELECT ur.report_id
                    FROM users_reports ur
                    WHERE ur.user_id = ?
                ";

                if ($stmt = $conn->prepare($reports_sql)) {
                    $stmt->bind_param("i", $user_id);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    // Initialize an array to store the reports and matching items
                    $reported_items = [];

                    while ($row = $result->fetch_assoc()) {
                        $report_id = $row['report_id'];

                        // Get report details from the reports table
                        $report_details_sql = "
                            SELECT r.report_id, r.item_description, r.report_date, r.status, r.category, r.location_id, r.photo_url
                            FROM reports r
                            WHERE r.report_id = ?
                        ";

                        if ($report_stmt = $conn->prepare($report_details_sql)) {
                            $report_stmt->bind_param("i", $report_id);
                            $report_stmt->execute();
                            $report_details_result = $report_stmt->get_result();
                            $report_details = $report_details_result->fetch_assoc();

                            // Get matching found items from the submissions table based on the category only
                            $matching_items_sql = "
                                SELECT s.description AS found_item, s.photo_url AS found_photo
                                FROM submissions s
                                WHERE s.category = ?
                            ";

                            if ($matching_stmt = $conn->prepare($matching_items_sql)) {
                                $matching_stmt->bind_param("s", $report_details['category']);
                                $matching_stmt->execute();
                                $matching_result = $matching_stmt->get_result();

                                // Initialize an array to store the matching found items
                                $matching_found_items = [];

                                while ($matching_row = $matching_result->fetch_assoc()) {
                                    $matching_found_items[] = $matching_row;
                                }

                                // Add matching found items to the report details
                                $report_details['matching_found_items'] = $matching_found_items;
                                $reported_items[] = $report_details;

                                // Close the matching statement
                                $matching_stmt->close();
                            }

                            // Close the report details statement
                            $report_stmt->close();
                        }
                    }

                    // Return the result as JSON
                    if (count($reported_items) > 0) {
                        echo json_encode(['reported_items' => $reported_items]);
                    } else {
                        echo json_encode(['message' => 'No matching found items for your reports.']);
                    }

                    // Close the reports statement
                    $stmt->close();
                } else {
                    echo json_encode(['message' => 'Error preparing the SQL query for fetching report IDs.']);
                }

            } else {
                echo json_encode(['message' => 'No pending reports found for this user.']);
            }

            // Close the status check statement
            $status_stmt->close();

        } else {
            echo json_encode(['message' => 'Error checking report status for user.']);
        }

    } else {
        echo json_encode(['message' => 'User ID is required.']);
    }

} else {
    echo json_encode(['message' => 'Invalid request method. Use GET.']);
}

// Close the connection
$conn->close();


// sample data returned:
// {"reported_items":[{"report_id":1,"item_description":"Lost camera with black
//     cover","report_date":"2024-11-24
//     10:00:00","status":"pending","category":"Electronics","location_id":1,"photo_url":"camera.jpg","matching_found_items":[{"found_item":"Lost
//     camera with black cover, found in the park","found_photo":"camera_found.jpg"},{"found_item":"Headphones found, left ear
//     still not working","found_photo":"headphones_found.jpg"}]},{"report_id":4,"item_description":"Lost notebook, spiral
//     bound","report_date":"2024-11-20
//     11:00:00","status":"pending","category":"Stationary","location_id":1,"photo_url":"notebook.jpg","matching_found_items":[{"found_item":"Spiral
//     bound notebook found near the benches","found_photo":"notebook_found.jpg"}]}]}


?>
