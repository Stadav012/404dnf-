<?php

// Include the config file to connect to the database
include('config.php');

// start a session
session_start();

// check if user is logged in
if (!isset($_SESSION['user_id'])) {
    // send the url to the login page
    http_response_code(401);
    echo json_encode(['message' => 'user not logged in', 'redirect' => 'login.html']);
    exit();
}

// Check if the request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    // Get the user_id from the request
    if (isset($_GET['user_id'])) {
        $user_id = $_GET['user_id'];
        // $user_id = 1; // default for testing purposes


        // Query to get the reported missing items (status = 'Open')
        $reported_sql = "
            SELECT r.report_id, r.item_description AS reported_item, r.report_date, r.status AS report_status, r.location_id AS report_location_id, r.photo_url AS report_photo
            FROM reports r
            WHERE r.user_id = ? AND r.status = 'Open'
        ";

        if ($stmt = $conn->prepare($reported_sql)) {
            // Bind the user_id to the query
            $stmt->bind_param("i", $user_id);
            $stmt->execute();
            $result = $stmt->get_result();

            // Initialize an array to store the results
            $reported_items = [];

            while ($row = $result->fetch_assoc()) {
                $reported_items[] = $row;
            }

            // Check if there are reported items
            if (count($reported_items) > 0) {
                // Loop through the reported items and check for matching found items
                foreach ($reported_items as &$reported_item) {
                    $report_location_id = $reported_item['report_location_id'];

                    // Query to get found items with the same location_id
                    $found_sql = "
                        SELECT i.item_description AS found_item, i.found_date, i.photo_url AS found_photo, l.location_name AS found_location
                        FROM items_found i
                        JOIN found_locations f ON i.found_id = f.found_id
                        JOIN locations l ON f.location_id = l.location_id
                        WHERE f.location_id = ? AND i.user_id != ?
                    ";

                    if ($found_stmt = $conn->prepare($found_sql)) {
                        // Bind the location_id and user_id to the query
                        $found_stmt->bind_param("ii", $report_location_id, $user_id);
                        $found_stmt->execute();
                        $found_result = $found_stmt->get_result();

                        // Initialize an array to store the matching found items
                        $matching_found_items = [];

                        while ($found_row = $found_result->fetch_assoc()) {
                            $matching_found_items[] = $found_row;
                        }

                        // Add the matching found items to the reported item
                        $reported_item['matching_found_items'] = $matching_found_items;

                        // Close the found statement
                        $found_stmt->close();
                    }
                }

                // Return the result as JSON
                echo json_encode(['reported_items' => $reported_items]);
            } else {
                echo json_encode(['message' => 'No reported items found for this user.']);
            }

            // Close the reported statement
            $stmt->close();

        } else {
            echo json_encode(['message' => 'Error preparing the SQL query for reported items.']);
        }

    } else {
        echo json_encode(['message' => 'User ID is required.']);
    }

} else {
    echo json_encode(['message' => 'Invalid request method. Use GET.']);
}

// Close the connection
$conn->close();






// sampple infor for inbox
// {
//     "reported_items": [
//         {
//             "report_id": 1,
//             "reported_item": "Black Backpack",
//             "report_date": "2024-11-24 10:00:00",
//             "report_status": "Open",
//             "report_location_id": 1,
//             "report_photo": "http://example.com/photos/reports/black_backpack.jpg",
//             "matching_found_items": [
//                 {
//                     "found_item": "Black Backpack",
//                     "found_date": "2024-11-20 14:00:00",
//                     "found_photo": "http://example.com/photos/found/black_backpack_found.jpg",
//                     "found_location": "location_1"
//                 },
//                 {
//                     "found_item": "Brown Backpack",
//                     "found_date": "2024-11-21 16:00:00",
//                     "found_photo": "http://example.com/photos/found/brown_backpack_found.jpg",
//                     "found_location": "location_1"
//                 }
//             ]
//         }
//     ]
// }

?>