-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:5306:5306
-- Generation Time: Dec 21, 2023 at 02:01 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_node_mysql_g5`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Description` text DEFAULT NULL,
  `ParentId` int(11) DEFAULT 0,
  `Status` tinyint(1) DEFAULT 1,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`Id`, `Name`, `Description`, `ParentId`, `Status`, `CreateAt`) VALUES
(1, 'Hot', 'Hot', NULL, 1, '2023-10-28 14:16:23'),
(2, 'Ice', 'Ice', NULL, 1, '2023-10-28 14:16:23'),
(3, 'Frappe', 'Frappe', NULL, 1, '2023-10-28 14:16:23'),
(4, 'Drink', 'Drink', NULL, 0, '2023-10-28 14:16:23'),
(5, 'Juice', '', NULL, 1, '2023-11-11 13:57:14');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `firstname` varchar(120) NOT NULL,
  `lastname` varchar(120) NOT NULL,
  `gender` tinyint(1) NOT NULL,
  `dob` date NOT NULL,
  `tel` varchar(16) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `firstname`, `lastname`, `gender`, `dob`, `tel`, `email`, `status`, `create_at`) VALUES
(1, 'Dara', 'Sok', 1, '2000-01-19', '0888888899', 'darasok9999@gmail.com', 0, '2023-10-09 06:35:22'),
(2, 'Lyly', 'Sok', 0, '2001-01-22', '0998888778', 'soklyly@gmail.com', 1, '2023-10-09 06:36:40'),
(3, 'Daro', 'Sok', 1, '2000-01-22', '0998888772', 'darasok@gmail.com', 1, '2023-10-09 06:38:13'),
(4, 'Som', 'Sokha', 1, '2000-01-22', '0998888776', 'sosokha@gmail.com', 1, '2023-10-09 06:38:13'),
(5, 'Dara', 'Sok', 1, '2000-01-22', '09244448888', 'darasok8888@gmail.com', 1, '2023-10-19 13:24:31'),
(6, 'Dara', 'Sok', 1, '2000-01-22', '09244448888', 'darasok8888@gmail.com', 1, '2023-10-19 13:26:28'),
(13, 'Jon', 'So', 1, '2000-01-01', '099988888', 'jon@gmail.com', 1, '2023-10-19 13:39:09'),
(18, 'Mr', 'Logo', 1, '2020-01-01', '0966890667', 'logo@gmail.com', 1, '2023-11-13 13:43:57');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Id` int(11) NOT NULL,
  `Firstname` varchar(120) NOT NULL,
  `Lastname` varchar(120) NOT NULL,
  `Gender` tinyint(1) NOT NULL,
  `Dob` date NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Email` varchar(120) DEFAULT NULL,
  `Tel` varchar(16) NOT NULL,
  `Password` text DEFAULT NULL,
  `Address` text NOT NULL,
  `Role` varchar(120) NOT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Id`, `Firstname`, `Lastname`, `Gender`, `Dob`, `Image`, `Email`, `Tel`, `Password`, `Address`, `Role`, `CreateAt`) VALUES
(1, 'Mom', 'Mony', 0, '1999-01-23', 'image_emp-1702300505630-31781673', 'mommony@gmail.com', '0988888889', '$2b$10$bRFLVlrnf6UFrLZ4rjL5Le5qIwWKoGXvD47zO/cyl7otqaNzjv3du', '#123, st 124 , PP', 'Admin', '2023-11-20 13:36:03'),
(2, 'Solo', 'Dara', 1, '2000-01-01', 'image_emp-1701266235497-60366065', '', '09888877777', NULL, '123, st 233,..', 'Admin', '2023-11-29 13:57:15'),
(8, 'Jon', 'Jo', 1, '2012-01-10', NULL, NULL, '0988787866', NULL, '', 'Admin', '2023-11-16 13:55:46'),
(9, 'Mr', 'Roinaldo', 1, '1992-01-01', NULL, 'ronaldo@gmail.com', '0988787866', NULL, '#123, st456, PP', 'Admin', '2023-11-20 13:16:25'),
(14, 'Mr', 'Messi', 1, '1999-01-23', NULL, NULL, '0988888889', '$2b$10$bRFLVlrnf6UFrLZ4rjL5Le5qIwWKoGXvD47zO/cyl7otqaNzjv3du', '#123, st PP', 'Admin', '2023-11-20 13:39:43'),
(18, 'BB', 'BB', 1, '1999-01-23', NULL, 'bb@gmail.com', '0988888889', NULL, 'SangKat Phnom Penh Thmey, Kan San Sok', 'Admin', '2023-11-30 13:39:24'),
(19, 'Jon', 'Sina', 1, '1992-01-01', 'image_emp-1701352062143-589542643', 'sina@gmail.com', '0988787866', NULL, 'SangKat Phnom Penh Thmey, Kan San Sok', 'Admin', '2023-11-30 13:47:42'),
(20, 'Linux', 'Mrs', 0, '1999-01-23', 'image_emp-1701955910405-6172770', 'linux2gmail.com', '0988888880', NULL, '', 'Admin', '2023-12-05 13:43:35');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_status`
--

CREATE TABLE `invoice_status` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Code` varchar(120) NOT NULL,
  `Description` text DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `invoice_status`
--

INSERT INTO `invoice_status` (`Id`, `Name`, `Code`, `Description`, `CreateAt`) VALUES
(1, 'PAID', 'paid', '', '2023-10-29 13:20:52'),
(2, 'VOID', 'void', '', '2023-10-29 13:20:52'),
(3, 'RETURN', 'return', '', '2023-10-29 13:20:52'),
(4, 'DUE', 'due', '', '2023-10-29 13:20:52');

-- --------------------------------------------------------

--
-- Table structure for table `payment_method`
--

CREATE TABLE `payment_method` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Code` varchar(120) NOT NULL,
  `Description` text DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `payment_method`
--

INSERT INTO `payment_method` (`Id`, `Name`, `Code`, `Description`, `CreateAt`) VALUES
(1, 'Cash', 'cash', '', '2023-10-29 13:21:20'),
(2, 'ABA', 'aba', '', '2023-10-29 13:21:20'),
(3, 'Acelda', 'ac', '', '2023-10-29 13:21:20'),
(4, 'Wing', 'wing', '', '2023-10-29 13:21:20'),
(5, 'True Money', 't_money', '', '2023-10-29 13:21:20'),
(6, 'E Money', 'e_money', '', '2023-10-29 13:21:20');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` int(11) NOT NULL,
  `CategoryId` int(11) DEFAULT 0,
  `Name` varchar(120) NOT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `Price` decimal(6,4) DEFAULT NULL,
  `Status` tinyint(1) DEFAULT 1,
  `CreateBy` varchar(120) DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `CategoryId`, `Name`, `Image`, `Description`, `Price`, `Status`, `CreateBy`, `CreateAt`) VALUES
(1, 1, 'Hot Latte', NULL, 'Hot Latee', 2.5000, 1, NULL, '2023-10-29 13:22:33'),
(2, 1, 'Hot Cappocino', NULL, 'Hot Cappocino', 2.5000, 1, NULL, '2023-10-29 13:22:33'),
(3, 1, 'Hot Americano', NULL, 'Hot Americano', 2.0000, 1, NULL, '2023-10-29 13:22:33'),
(4, 1, 'Hot Milk', NULL, 'Hot Milk', 2.5000, 1, NULL, '2023-10-29 13:22:33'),
(5, 1, 'Hot Chocolate', NULL, 'Hot Chocolate', 2.5000, 1, NULL, '2023-10-29 13:22:33'),
(6, 2, 'Ice Latte', NULL, 'Ice Latee', 2.8000, 1, NULL, '2023-10-29 13:22:33'),
(7, 2, 'Ice Cappocino', NULL, 'Ice Cappocino', 2.8000, 1, NULL, '2023-10-29 13:22:33'),
(8, 2, 'Ice Americano', NULL, 'Ice Americano', 2.8000, 1, NULL, '2023-10-29 13:22:33'),
(9, 2, 'Ice Milk', NULL, 'Ice Milk', 2.8000, 1, NULL, '2023-10-29 13:22:33'),
(10, 2, 'Ice Chocolate', NULL, 'Ice Chocolate', 2.8000, 1, NULL, '2023-10-29 13:22:33'),
(11, 3, 'Latte Frappe', NULL, 'Latee Frappe', 2.0000, 1, NULL, '2023-10-29 13:22:33'),
(12, 3, 'Cappocino Frappe', NULL, 'Cappocino Frappe', 2.0000, 1, NULL, '2023-10-29 13:22:33'),
(13, 3, 'Green Tea Frappe', NULL, 'Green Tea Frappe', 2.0000, 1, NULL, '2023-10-29 13:22:33'),
(14, 3, 'Chocolate Frappe', NULL, 'Chocolate Frappe', 2.0000, 1, NULL, '2023-10-29 13:22:33'),
(15, NULL, 'Test', NULL, '111', 11.0000, 1, NULL, '2023-12-14 14:05:31'),
(16, NULL, 'Test', NULL, '1111', 11.0000, 1, NULL, '2023-12-14 14:06:40'),
(17, NULL, 'Hot moka', NULL, 'Hot moka', 2.0000, 0, NULL, '2023-12-19 13:28:42'),
(18, 1, 'Hot moka1', NULL, 'Hot moka des ', 2.0000, 1, NULL, '2023-12-19 13:30:51'),
(19, 1, 'Test', NULL, '111', 2.0000, 0, NULL, '2023-12-19 13:37:07'),
(20, 1, 'Test', 'image_product-1702993293333-383219729', '111', 22.0000, 0, NULL, '2023-12-19 13:41:33');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `Id` int(11) NOT NULL,
  `Name` varchar(64) NOT NULL,
  `Code` varchar(64) NOT NULL,
  `Description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`Id`, `Name`, `Code`, `Description`) VALUES
(1, 'Admin', 'amdin', ''),
(2, 'Manager', 'Manager', ''),
(3, 'Cashier', 'Cashier', ''),
(4, 'Service', 'Service', '');

-- --------------------------------------------------------

--
-- Table structure for table `shift`
--

CREATE TABLE `shift` (
  `Id` int(11) NOT NULL,
  `Name` varchar(120) NOT NULL,
  `Description` text DEFAULT NULL,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `shift`
--

INSERT INTO `shift` (`Id`, `Name`, `Description`, `CreateAt`) VALUES
(1, 'Morning', 'Morning', '2023-10-28 14:13:35'),
(2, 'Evening', 'Evening', '2023-10-28 14:13:35');

-- --------------------------------------------------------

--
-- Table structure for table `shift_details`
--

CREATE TABLE `shift_details` (
  `Id` int(11) NOT NULL,
  `ShiftId` int(11) NOT NULL,
  `EmployeeId` int(11) NOT NULL,
  `OpenningBalance` decimal(6,4) DEFAULT NULL,
  `IsClose` tinyint(1) DEFAULT 0,
  `CreateAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `shift_details`
--

INSERT INTO `shift_details` (`Id`, `ShiftId`, `EmployeeId`, `OpenningBalance`, `IsClose`, `CreateAt`) VALUES
(1, 1, 1, 80.0000, 0, '2023-10-29 13:20:22'),
(2, 2, 2, 90.0000, 0, '2023-10-29 13:47:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `category_unigue_name` (`Name`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `invoice_status`
--
ALTER TABLE `invoice_status`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `payment_method`
--
ALTER TABLE `payment_method`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_product_CategoryId` (`CategoryId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `shift`
--
ALTER TABLE `shift`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `shift_details`
--
ALTER TABLE `shift_details`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `fk_shift_detail_ShiftId` (`ShiftId`),
  ADD KEY `fk_shift_detail_EmployeeId` (`EmployeeId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `invoice_status`
--
ALTER TABLE `invoice_status`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment_method`
--
ALTER TABLE `payment_method`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `shift`
--
ALTER TABLE `shift`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `shift_details`
--
ALTER TABLE `shift_details`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_CategoryId` FOREIGN KEY (`CategoryId`) REFERENCES `category` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
