-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2024 at 07:14 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 7.4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weather_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `city_name` varchar(255) DEFAULT NULL,
  `city_slug` varchar(255) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`city_id`, `user_id`, `city_name`, `city_slug`, `created_at`) VALUES
(1, 3, 'New Delhi, Delhi, India', 'new-delhi-delhi-india', '1720268434'),
(2, 3, 'Mumbai, Maharashtra, India', 'mumbai-maharashtra-india', '1720340012'),
(3, 3, 'Hyderabad, Andhra Pradesh, India', 'hyderabad-andhra-pradesh-india', '1720343914'),
(4, 3, 'Goa, Goa, India', 'goa-goa-india', '1720372176'),
(5, 3, 'Pune, Maharashtra, India', 'pune-maharashtra-india', '1720372340'),
(12, 4, 'Varanasi, Uttar Pradesh, India', 'varanasi-uttar-pradesh-india', '1720379828'),
(13, 5, 'Varanasi, Uttar Pradesh, India', 'varanasi-uttar-pradesh-india', '1720423826');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `email`, `phone`, `password`, `created_at`) VALUES
(3, 'Jitesh', 'jitesh@byom.de', '9876543210', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '1718998397'),
(4, 'Vickey', 'vickey@byom.de', '9876543210', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '1720379603'),
(5, 'Test', 'test@best.com', '1234567890', '8ed4f3e22c219128ca64b0f4be1d1259502252e9e4beb0ca57c47ea9aeb41baf', '1720423799');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
