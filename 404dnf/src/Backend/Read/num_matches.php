<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Include the config file to connect to the database
include('../db/config.php');

// start a session
session_start();
header('Content-Type: application/json');

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Get the user_id from the request
    if (isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];

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

                    // Initialize a counter for total matches
                    $total_matches = 0;

                    while ($row = $result->fetch_assoc()) {
                        $report_id = $row['report_id'];

                        // Get report details from the reports table
                        $report_details_sql = "
                            SELECT r.category
                            FROM reports r
                            WHERE r.report_id = ?
                        ";

                        if ($report_stmt = $conn->prepare($report_details_sql)) {
                            $report_stmt->bind_param("i", $report_id);
                            $report_stmt->execute();
                            $report_details_result = $report_stmt->get_result();
                            $report_details = $report_details_result->fetch_assoc();

                            // Get the count of matching found items from the submissions table based on the category
                            $matching_items_sql = "
                                SELECT COUNT(*) AS match_count
                                FROM submissions s
                                WHERE s.category = ?
                            ";

                            if ($matching_stmt = $conn->prepare($matching_items_sql)) {
                                $matching_stmt->bind_param("s", $report_details['category']);
                                $matching_stmt->execute();
                                $matching_result = $matching_stmt->get_result();
                                $matching_row = $matching_result->fetch_assoc();

                                // Add the match count to the total matches
                                $total_matches += (int) $matching_row['match_count'];

                                // Close the matching statement
                                $matching_stmt->close();
                            }

                            // Close the report details statement
                            $report_stmt->close();
                        }
                    }

                    // Return the total count as JSON
                    echo json_encode(['count' => $total_matches]);

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
?>
