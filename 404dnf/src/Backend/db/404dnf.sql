-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 24, 2024 at 05:13 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `404dnf`
--

-- --------------------------------------------------------

--
-- Table structure for table `claims`
--

CREATE TABLE `claims` (
  `claim_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `submission_id` varchar(255) NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `report_id` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `claims`
--

INSERT INTO `claims` (`claim_id`, `user_id`, `submission_id`, `status`, `report_id`, `created_at`, `updated_at`) VALUES
(1, 1, '1', 'pending', 1, '2024-11-24 16:12:49', '2024-11-24 16:12:49'),
(2, 1, '2', 'approved', 4, '2024-11-24 16:12:49', '2024-11-24 16:12:49'),
(3, 2, '3', 'pending', 2, '2024-11-24 16:12:49', '2024-11-24 16:12:49'),
(4, 2, '4', 'rejected', 5, '2024-11-24 16:12:49', '2024-11-24 16:12:49'),
(5, 3, '5', 'approved', 3, '2024-11-24 16:12:49', '2024-11-24 16:12:49');

-- --------------------------------------------------------

--
-- Table structure for table `contribution_counts`
--

CREATE TABLE `contribution_counts` (
  `contribution_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reports_count` int(11) DEFAULT 0,
  `submissions_count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contribution_counts`
--

INSERT INTO `contribution_counts` (`contribution_id`, `user_id`, `reports_count`, `submissions_count`) VALUES
(1, 1, 2, 2),
(2, 2, 2, 2),
(3, 3, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `location_id` int(11) NOT NULL,
  `location_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`location_id`, `location_name`) VALUES
(1, 'Location 1'),
(2, 'Location 2'),
(3, 'Location 3');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `report_id` int(11) NOT NULL,
  `item_description` text NOT NULL,
  `report_date` datetime DEFAULT current_timestamp(),
  `status` enum('pending','resolved') DEFAULT 'pending',
  `category` enum('Electronics','Clothing','Accessories','Stationary') NOT NULL DEFAULT 'Accessories',
  `location_id` int(11) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`report_id`, `item_description`, `report_date`, `status`, `category`, `location_id`, `photo_url`) VALUES
(1, 'Lost camera with black cover', '2024-11-24 10:00:00', 'pending', 'Electronics', 1, 'camera.jpg'),
(2, 'Missing jacket, size M', '2024-11-23 14:30:00', 'resolved', 'Clothing', 2, 'jacket.jpg'),
(3, 'Found wallet with ID and cards', '2024-11-22 08:00:00', 'resolved', 'Accessories', 3, 'wallet.jpg'),
(4, 'Lost notebook, spiral bound', '2024-11-20 11:00:00', 'pending', 'Stationary', 1, 'notebook.jpg'),
(5, 'Broken headphones, left ear not working', '2024-11-19 09:00:00', 'pending', 'Electronics', 2, 'headphones.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `rewards`
--

CREATE TABLE `rewards` (
  `reward_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `user_found_items` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rewards`
--

INSERT INTO `rewards` (`reward_id`, `user_id`, `user_found_items`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `submissions`
--

CREATE TABLE `submissions` (
  `submission_id` int(11) NOT NULL,
  `category` enum('Electronics','Clothing','Accessories','Stationary') NOT NULL DEFAULT 'Accessories',
  `description` text NOT NULL,
  `location_id` int(11) NOT NULL,
  `photo_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `submissions`
--

INSERT INTO `submissions` (`submission_id`, `category`, `description`, `location_id`, `photo_url`) VALUES
(1, 'Electronics', 'Lost camera with black cover, found in the park', 1, 'camera_found.jpg'),
(2, 'Stationary', 'Spiral bound notebook found near the benches', 1, 'notebook_found.jpg'),
(3, 'Clothing', 'Jacket found near Times Square, size M', 2, 'jacket_found.jpg'),
(4, 'Accessories', 'Found wallet with IDs, left near Brooklyn Bridge', 3, 'wallet_found.jpg'),
(5, 'Electronics', 'Headphones found, left ear still not working', 2, 'headphones_found.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `profile_pic` varchar(255) DEFAULT NULL,
  `theme` enum('vid1','vid2') NOT NULL DEFAULT 'vid1',
  `role` enum('admin','regular') NOT NULL DEFAULT 'regular',
  `report_status` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `fname`, `lname`, `email`, `password`, `created_at`, `last_login`, `profile_pic`, `theme`, `role`, `report_status`) VALUES
(1, 'john_doe', 'John', 'Doe', 'john.doe@example.com', 'password123', '2024-11-24 16:12:49', '2024-11-24 16:12:49', 'john_pic.jpg', 'vid1', 'regular', 0),
(2, 'jane_smith', 'Jane', 'Smith', 'jane.smith@example.com', 'password456', '2024-11-24 16:12:49', '2024-11-24 16:12:49', 'jane_pic.jpg', 'vid2', 'regular', 0),
(3, 'mike_lee', 'Mike', 'Lee', 'mike.lee@example.com', 'password789', '2024-11-24 16:12:49', '2024-11-24 16:12:49', 'mike_pic.jpg', 'vid1', 'regular', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users_reports`
--

CREATE TABLE `users_reports` (
  `user_report_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `report_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_reports`
--

INSERT INTO `users_reports` (`user_report_id`, `user_id`, `report_id`) VALUES
(1, 1, 1),
(2, 1, 4),
(3, 2, 2),
(4, 2, 5),
(5, 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users_submissions`
--

CREATE TABLE `users_submissions` (
  `user_submission_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users_submissions`
--

INSERT INTO `users_submissions` (`user_submission_id`, `user_id`, `submission_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 3),
(4, 2, 4),
(5, 3, 5);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `claims`
--
ALTER TABLE `claims`
  ADD PRIMARY KEY (`claim_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `contribution_counts`
--
ALTER TABLE `contribution_counts`
  ADD PRIMARY KEY (`contribution_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`location_id`),
  ADD UNIQUE KEY `location_name` (`location_name`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`report_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `rewards`
--
ALTER TABLE `rewards`
  ADD PRIMARY KEY (`reward_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `submissions`
--
ALTER TABLE `submissions`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `location_id` (`location_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_reports`
--
ALTER TABLE `users_reports`
  ADD PRIMARY KEY (`user_report_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `report_id` (`report_id`);

--
-- Indexes for table `users_submissions`
--
ALTER TABLE `users_submissions`
  ADD PRIMARY KEY (`user_submission_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `submission_id` (`submission_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contribution_counts`
--
ALTER TABLE `contribution_counts`
  MODIFY `contribution_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `location_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `submissions`
--
ALTER TABLE `submissions`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users_reports`
--
ALTER TABLE `users_reports`
  MODIFY `user_report_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users_submissions`
--
ALTER TABLE `users_submissions`
  MODIFY `user_submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `contribution_counts`
--
ALTER TABLE `contribution_counts`
  ADD CONSTRAINT `contribution_counts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `submissions`
--
ALTER TABLE `submissions`
  ADD CONSTRAINT `submissions_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`);

--
-- Constraints for table `users_reports`
--
ALTER TABLE `users_reports`
  ADD CONSTRAINT `users_reports_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `users_reports_ibfk_2` FOREIGN KEY (`report_id`) REFERENCES `reports` (`report_id`);

--
-- Constraints for table `users_submissions`
--
ALTER TABLE `users_submissions`
  ADD CONSTRAINT `users_submissions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `users_submissions_ibfk_2` FOREIGN KEY (`submission_id`) REFERENCES `submissions` (`submission_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
