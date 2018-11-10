-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 10, 2018 at 03:38 PM
-- Server version: 5.7.24-0ubuntu0.18.04.1
-- PHP Version: 7.2.10-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mpg`
--

-- --------------------------------------------------------

--
-- Table structure for table `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `pseudo` varchar(12) COLLATE utf8_bin NOT NULL,
  `pshort` varchar(4) COLLATE utf8_bin NOT NULL,
  `bldView` json DEFAULT NULL,
  `bldIdent` json DEFAULT NULL,
  `unitView` json DEFAULT NULL,
  `unitIdent` json DEFAULT NULL,
  `mapView` json DEFAULT NULL,
  `mapCarto` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `pseudo`, `pshort`, `bldView`, `bldIdent`, `unitView`, `unitIdent`, `mapView`, `mapCarto`) VALUES
(1, 'Bob', 'Bob', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'Zorglub', 'Zorg', NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pop`
--

CREATE TABLE `pop` (
  `id` int(11) NOT NULL,
  `player` varchar(12) COLLATE utf8_bin NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL,
  `icon` varchar(12) COLLATE utf8_bin NOT NULL,
  `cat` varchar(3) COLLATE utf8_bin NOT NULL,
  `number` int(11) NOT NULL,
  `pic` varchar(20) COLLATE utf8_bin NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `hp` int(11) NOT NULL,
  `damage` int(11) DEFAULT NULL,
  `ammo` int(11) DEFAULT NULL,
  `power` tinyint(4) NOT NULL,
  `attack` int(11) NOT NULL,
  `defense` int(11) NOT NULL,
  `move` int(11) NOT NULL,
  `moveAdj` int(11) NOT NULL,
  `fatigue` int(11) DEFAULT NULL,
  `tileId` int(11) NOT NULL,
  `coverAdj` int(11) NOT NULL,
  `follow` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `pop`
--

INSERT INTO `pop` (`id`, `player`, `type`, `icon`, `cat`, `number`, `pic`, `x`, `y`, `hp`, `damage`, `ammo`, `power`, `attack`, `defense`, `move`, `moveAdj`, `fatigue`, `tileId`, `coverAdj`, `follow`) VALUES
(5, 'Zorglub', 'Shaman', 'spy', 'spy', 1, 'metroid.png', 3, 15, 190, NULL, -1, 6, 15, 20, 45, 150, 0, 73, 75, 1),
(11, 'Zorglub', 'Barbarian', 'sld', 'sld', 58, 'alien-bug.png', 3, 15, 35, NULL, -1, 4, 15, 7, 90, 100, 75, 73, 150, NULL),
(31, 'Bob', 'Pikemen', 'sld', 'sld', 109, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 90, 71, 100, 3),
(37, 'Bob', 'Pikemen', 'sld', 'sld', 5, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 90, 71, 100, 3),
(38, 'Bob', 'Castle', 'bld', 'bld', 1, '', 6, 1, 2000, NULL, 100, 8, 0, 20, 0, 100, 0, 41, 0, NULL),
(39, 'Bob', 'Pikemen', 'sld', 'sld', 24, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 90, 71, 100, 3),
(40, 'Bob', 'Pikemen', 'sld', 'sld', 3, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 74, 100, 1),
(41, 'Bob', 'Pikemen', 'sld', 'sld', 8, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 41, 100, 4),
(42, 'Bob', 'Pikemen', 'sld', 'sld', 13, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 43, 100, NULL),
(44, 'Bob', 'Pikemen', 'sld', 'sld', 14, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 58, 100, NULL),
(45, 'Bob', 'Spy', 'spy', 'spy', 2, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 10, 7, 70, 25, 0, 28, 150, NULL),
(46, 'Bob', 'Pikemen', 'sld', 'sld', 120, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 90, 71, 100, 3),
(47, 'Bob', 'Pikemen', 'sld', 'sld', 12, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 73, 100, NULL),
(48, 'Bob', 'Blacksmith', 'wrk', 'wrk', 1, 'space-suit.png', 6, 1, 18, NULL, 100, 3, 3, 6, 60, 100, 0, 41, 100, 4),
(49, 'Bob', 'Pikemen', 'sld', 'sld', 6, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 74, 100, 1),
(50, 'Bob', 'Pikemen', 'sld', 'sld', 7, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 74, 100, 1),
(51, 'Bob', 'Spy', 'spy', 'spy', 14, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 10, 7, 70, 25, 90, 71, 150, 3),
(52, 'Bob', 'Spy', 'spy', 'spy', 6, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 10, 7, 70, 25, 0, 43, 150, NULL),
(53, 'Zorglub', 'Barbarian', 'sld', 'sld', 13, 'alien-bug.png', 3, 15, 35, NULL, -1, 4, 15, 7, 90, 100, 0, 58, 150, NULL),
(54, 'Zorglub', 'Barbarian', 'sld', 'sld', 226, 'alien-bug.png', 3, 15, 35, NULL, -1, 4, 15, 7, 90, 100, 0, 73, 150, 1),
(55, 'Zorglub', 'Barbarian', 'sld', 'sld', 164, 'alien-bug.png', 3, 15, 35, NULL, -1, 4, 15, 7, 90, 100, 0, 102, 150, NULL),
(56, 'Bob', 'Spy', 'spy', 'spy', 2, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 10, 7, 70, 25, 0, 43, 150, NULL),
(57, 'Bob', 'Pikemen', 'sld', 'sld', 3, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 56, 100, NULL),
(58, 'Zorglub', 'Barbarian', 'sld', 'sld', 3, 'alien-bug.png', 3, 15, 35, NULL, -1, 4, 15, 7, 90, 100, 30, 85, 150, NULL),
(59, 'Zorglub', 'Barbarian', 'sld', 'sld', 1, 'alien-bug.png', 3, 15, 35, NULL, -1, 4, 15, 7, 90, 100, 0, 86, 150, NULL),
(60, 'Bob', 'Pikemen', 'sld', 'sld', 10, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 42, 100, NULL),
(61, 'Bob', 'Pikemen', 'sld', 'sld', 10, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 58, 100, NULL),
(62, 'Bob', 'Pikemen', 'sld', 'sld', 5, 'space-suit.png', 6, 1, 20, NULL, 100, 3, 12, 12, 70, 50, 0, 56, 100, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `terrains`
--

CREATE TABLE `terrains` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `moveCost` tinyint(4) NOT NULL,
  `cover` tinyint(4) NOT NULL,
  `defense` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `terrains`
--

INSERT INTO `terrains` (`id`, `name`, `moveCost`, `cover`, `defense`) VALUES
(1, 'plains', 30, 0, 0),
(2, 'forest', 45, 50, 15),
(3, 'hills', 50, 20, 30),
(4, 'mountains', 100, 40, 60),
(5, 'swamp', 85, 0, 30);

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Table structure for table `world`
--

CREATE TABLE `world` (
  `id` int(11) NOT NULL,
  `terrain` varchar(24) COLLATE utf8_bin NOT NULL,
  `terrainId` tinyint(4) NOT NULL,
  `x` int(3) NOT NULL,
  `y` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `world`
--

INSERT INTO `world` (`id`, `terrain`, `terrainId`, `x`, `y`) VALUES
(1, 'plains', 1, 1, 1),
(2, 'forest', 2, 1, 2),
(3, 'forest', 2, 1, 3),
(4, 'hills', 3, 1, 4),
(5, 'forest', 2, 1, 5),
(6, 'plains', 1, 1, 6),
(7, 'plains', 1, 1, 7),
(8, 'forest', 2, 1, 8),
(9, 'mountains', 4, 1, 9),
(10, 'mountains', 4, 1, 10),
(11, 'hills', 3, 1, 11),
(12, 'plains', 1, 1, 12),
(13, 'hills', 3, 1, 13),
(14, 'forest', 2, 1, 14),
(15, 'forest', 2, 1, 15),
(16, 'plains', 1, 2, 1),
(17, 'plains', 1, 2, 2),
(18, 'forest', 2, 2, 3),
(19, 'forest', 2, 2, 4),
(20, 'forest', 2, 2, 5),
(21, 'plains', 1, 2, 6),
(22, 'forest', 2, 2, 7),
(23, 'forest', 2, 2, 8),
(24, 'hills', 3, 2, 9),
(25, 'mountains', 4, 2, 10),
(26, 'plains', 1, 2, 11),
(27, 'plains', 1, 2, 12),
(28, 'mountains', 4, 2, 13),
(29, 'hills', 3, 2, 14),
(30, 'forest', 2, 2, 15),
(31, 'plains', 1, 3, 1),
(32, 'forest', 2, 3, 2),
(33, 'hills', 3, 3, 3),
(34, 'forest', 2, 3, 4),
(35, 'mountains', 4, 3, 5),
(36, 'plains', 1, 3, 6),
(37, 'plains', 1, 3, 7),
(38, 'plains', 1, 3, 8),
(39, 'plains', 1, 3, 9),
(40, 'forest', 2, 3, 10),
(41, 'plains', 1, 3, 11),
(42, 'forest', 2, 3, 12),
(43, 'forest', 2, 3, 13),
(44, 'forest', 2, 3, 14),
(45, 'hills', 3, 3, 15),
(46, 'hills', 3, 4, 1),
(47, 'hills', 3, 4, 2),
(48, 'mountains', 4, 4, 3),
(49, 'swamp', 5, 4, 4),
(50, 'swamp', 5, 4, 5),
(51, 'swamp', 5, 4, 6),
(52, 'swamp', 5, 4, 7),
(53, 'plains', 1, 4, 8),
(54, 'plains', 1, 4, 9),
(55, 'plains', 1, 4, 10),
(56, 'forest', 2, 4, 11),
(57, 'forest', 2, 4, 12),
(58, 'forest', 2, 4, 13),
(59, 'hills', 3, 4, 14),
(60, 'hills', 3, 4, 15),
(61, 'hills', 3, 5, 1),
(62, 'hills', 3, 5, 2),
(63, 'mountains', 4, 5, 3),
(64, 'mountains', 4, 5, 4),
(65, 'swamp', 5, 5, 5),
(66, 'swamp', 5, 5, 6),
(67, 'plains', 1, 5, 7),
(68, 'plains', 1, 5, 8),
(69, 'plains', 1, 5, 9),
(70, 'plains', 1, 5, 10),
(71, 'plains', 1, 5, 11),
(72, 'plains', 1, 5, 12),
(73, 'forest', 2, 5, 13),
(74, 'forest', 2, 5, 14),
(75, 'hills', 3, 5, 15),
(76, 'hills', 3, 6, 1),
(77, 'mountains', 4, 6, 2),
(78, 'mountains', 4, 6, 3),
(79, 'mountains', 4, 6, 4),
(80, 'mountains', 4, 6, 5),
(81, 'swamp', 5, 6, 6),
(82, 'swamp', 5, 6, 7),
(83, 'plains', 1, 6, 8),
(84, 'plains', 1, 6, 9),
(85, 'plains', 1, 6, 10),
(86, 'plains', 1, 6, 11),
(87, 'forest', 2, 6, 12),
(88, 'forest', 2, 6, 13),
(89, 'forest', 2, 6, 14),
(90, 'forest', 2, 6, 15),
(91, 'hills', 3, 7, 1),
(92, 'hills', 3, 7, 2),
(93, 'hills', 3, 7, 3),
(94, 'mountains', 4, 7, 4),
(95, 'hills', 3, 7, 5),
(96, 'swamp', 5, 7, 6),
(97, 'forest', 2, 7, 7),
(98, 'plains', 1, 7, 8),
(99, 'plains', 1, 7, 9),
(100, 'plains', 1, 7, 10),
(101, 'forest', 2, 7, 11),
(102, 'plains', 1, 7, 12),
(103, 'forest', 2, 7, 13),
(104, 'forest', 2, 7, 14),
(105, 'plains', 1, 7, 15),
(106, 'plains', 1, 8, 1),
(107, 'plains', 1, 8, 2),
(108, 'hills', 3, 8, 3),
(109, 'hills', 3, 8, 4),
(110, 'plains', 1, 8, 5),
(111, 'plains', 1, 8, 6),
(112, 'swamp', 5, 8, 7),
(113, 'plains', 1, 8, 8),
(114, 'plains', 1, 8, 9),
(115, 'forest', 2, 8, 10),
(116, 'forest', 2, 8, 11),
(117, 'plains', 1, 8, 12),
(118, 'plains', 1, 8, 13),
(119, 'forest', 2, 8, 14),
(120, 'plains', 1, 8, 15),
(121, 'plains', 1, 9, 1),
(122, 'plains', 1, 9, 2),
(123, 'plains', 1, 9, 3),
(124, 'plains', 1, 9, 4),
(125, 'plains', 1, 9, 5),
(126, 'plains', 1, 9, 6),
(127, 'plains', 1, 9, 7),
(128, 'plains', 1, 9, 8),
(129, 'hills', 3, 9, 9),
(130, 'hills', 3, 9, 10),
(131, 'plains', 1, 9, 11),
(132, 'plains', 1, 9, 12),
(133, 'plains', 1, 9, 13),
(134, 'plains', 1, 9, 14),
(135, 'plains', 1, 9, 15);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `pshort` (`pshort`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `pop`
--
ALTER TABLE `pop`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `terrains`
--
ALTER TABLE `terrains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `world`
--
ALTER TABLE `world`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `pop`
--
ALTER TABLE `pop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT for table `terrains`
--
ALTER TABLE `terrains`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `world`
--
ALTER TABLE `world`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
