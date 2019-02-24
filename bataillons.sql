-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 23, 2019 at 08:44 PM
-- Server version: 5.7.24
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `koqebwix_mpg`
--

-- --------------------------------------------------------

--
-- Table structure for table `bataillons`
--

CREATE TABLE `bataillons` (
  `id` int(11) NOT NULL,
  `player` varchar(12) COLLATE utf8_bin NOT NULL,
  `type` varchar(30) COLLATE utf8_bin NOT NULL,
  `typeId` smallint(6) NOT NULL,
  `number` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `blessures` smallint(6) NOT NULL DEFAULT '0',
  `move` smallint(6) NOT NULL,
  `fatigue` smallint(6) NOT NULL DEFAULT '0',
  `endurance` smallint(6) NOT NULL DEFAULT '50',
  `time` tinyint(1) NOT NULL DEFAULT '1',
  `tileId` int(11) NOT NULL,
  `prevTileId` int(11) NOT NULL,
  `follow` int(11) DEFAULT NULL,
  `onTrack` int(11) NOT NULL DEFAULT '0',
  `combatId` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `bataillons`
--

INSERT INTO `bataillons` (`id`, `player`, `type`, `typeId`, `number`, `x`, `y`, `blessures`, `move`, `fatigue`, `endurance`, `time`, `tileId`, `prevTileId`, `follow`, `onTrack`, `combatId`) VALUES
(5, 'Zorglub', 'chamane', 503, 1, 3, 15, 0, 63, 5, 70, 1, 541, 540, 3, 0, 0),
(38, 'Bob', 'château', 127, 1, 6, 1, 0, 0, 0, 100, 1, 674, 41, NULL, 0, 0),
(44, 'Bob', 'hommes d\'armes', 1, 24, 6, 1, 0, 45, -20, 30, 1, 405, 272, NULL, 0, 0),
(45, 'Bob', 'caporal', 801, 1, 6, 1, 0, 54, -70, 70, 1, 3978, 3846, 5, 0, 0),
(47, 'Bob', 'hommes d\'armes', 1, 15, 6, 1, 0, 45, -30, 30, 1, 540, 539, 2, 0, 0),
(48, 'Bob', 'forgeron', 43, 1, 6, 1, 0, 45, -30, 30, 1, 674, 675, 1, 0, 0),
(51, 'Bob', 'espion', 92, 2, 6, 1, 0, 54, -80, 80, 1, 540, 539, 2, 0, 0),
(52, 'Bob', 'éclaireur', 50, 6, 6, 1, 0, 54, -55, 55, 1, 4236, 4103, 7, 0, 0),
(65, 'Bob', 'éclaireur', 50, 10, 6, 1, 0, 54, -55, 55, 1, 3979, 3846, 4, 0, 0),
(67, 'Bob', 'chasseur de sorcières', 64, 6, 6, 1, 0, 54, -70, 70, 1, 3979, 3846, 4, 0, 0),
(75, 'Bob', 'informateur', 615, 22, 6, 1, 0, 45, -20, 20, 1, 3978, 3846, 5, 0, 0),
(81, 'Zorglub', 'barbares', 226, 182, 3, 15, 0, 54, -23, 40, 1, 1075, 944, NULL, 0, 0),
(83, 'Zorglub', 'perce-lignes', 204, 114, 3, 15, 0, 54, -65, 80, 1, 1204, 1073, NULL, 0, 0),
(92, 'Morpheus', 'espion', 92, 2, 6, 1, 0, 54, 0, 80, 1, 538, 407, 1, 0, 0),
(93, 'Morpheus', 'perce-lignes', 204, 138, 3, 15, 0, 54, 0, 80, 1, 538, 407, 1, 0, 0),
(95, 'Bob', 'lancier', 12, 85, 6, 1, 0, 45, -35, 35, 1, 3978, 3846, 5, 0, 0),
(96, 'Morpheus', 'piquier', 13, 10, 6, 1, 0, 45, 0, 55, 1, 538, 407, 1, 0, 0),
(99, 'Bob', 'lancier', 12, 40, 6, 1, 0, 45, -35, 35, 1, 541, 674, 1, 0, 0),
(100, 'Bob', 'cartographe', 319, 4, 6, 1, 0, 108, -50, 50, 1, 3978, 3846, 5, 0, 0),
(109, 'Bob', 'piquier', 13, 1, 6, 1, 0, 45, -55, 55, 1, 9908, 9777, NULL, 0, 0),
(125, 'Bob', 'perce-lignes', 204, 18, 3, 15, 0, 54, -80, 80, 1, 4236, 4103, 7, 0, 0),
(126, 'Zorglub', 'barbares', 226, 72, 3, 15, 0, 54, -6, 40, 1, 541, 540, 3, 0, 0),
(127, 'Morpheus', 'perce-lignes', 204, 12, 3, 15, 0, 54, 0, 80, 1, 675, 88, NULL, 0, 0),
(128, 'Bob', 'piquier', 13, 32, 6, 1, 0, 45, -55, 55, 1, 19680, 19547, NULL, 0, 0),
(131, 'Bob', 'piquier', 13, 2, 6, 1, 0, 45, -55, 55, 1, 3979, 3846, 4, 0, 0),
(134, 'Bob', 'tonneau', 581, 1, 6, 1, 0, 9, -63, 100, 1, 4236, 4103, 7, 0, 0),
(135, 'Bob', 'coffres', 408, 3, 6, 1, 0, 18, -100, 100, 1, 4370, 4238, 8, 0, 0),
(136, 'Bob', 'coffres', 408, 1, 6, 1, 0, 18, -100, 100, 1, 4236, 4103, 7, 0, 0),
(137, 'Bob', 'engrenages', 1828, 26, 6, 1, 0, 0, 0, 0, 1, 3841, 3708, 3, 0, 0),
(138, 'Bob', 'piquier', 13, 252, 6, 1, 0, 45, -55, 55, 1, 4236, 4103, 7, 0, 0),
(166, 'Bob', 'hommes d\'armes', 1, 6, 6, 1, 0, 45, -30, 30, 1, 2380, 2247, NULL, 0, 0),
(169, 'Zorglub', 'barbares', 226, 13, 3, 15, 0, 54, -40, 40, 1, 805, 938, NULL, 0, 0),
(170, 'Bob', 'transport de troupe', 82, 3, 6, 1, 0, 64, -95, 95, 1, 4370, 4238, 8, 0, 0),
(176, 'Bob', 'cartographe', 319, 4, 6, 1, 0, 108, -50, 50, 1, 6772, 2787, 5, 0, 0),
(177, 'Bob', 'éclaireur', 50, 6, 6, 1, 0, 54, -55, 55, 1, 6371, 2518, NULL, 0, 0),
(178, 'Bob', 'perce-lignes', 204, 6, 3, 15, 0, 54, -80, 80, 1, 4370, 4238, 8, 0, 0),
(184, 'Bob', 'lancier', 12, 6, 6, 1, 0, 45, -35, 35, 1, 3839, 3708, NULL, 0, 0),
(185, 'Bob', 'engrenages', 1828, 6, 6, 1, 0, 0, 0, 0, 1, 4236, 4103, 7, 0, 0),
(196, 'Bob', 'piquier', 13, 36, 6, 1, 0, 45, -55, 55, 1, 19548, 19680, NULL, 0, 0),
(197, 'Bob', 'hommes d\'armes', 1, 72, 6, 1, 0, 45, -30, 30, 1, 19811, 19679, NULL, 0, 0),
(199, 'Bob', 'lancier', 12, 265, 6, 1, 0, 45, -35, 35, 1, 4370, 4238, 8, 0, 0),
(202, 'Bob', 'caporal', 801, 1, 6, 1, 0, 54, -70, 70, 1, 4370, 4238, 8, 0, 0),
(203, 'Bob', 'engrenages', 1828, 7, 6, 1, 0, 0, 0, 0, 1, 4370, 4238, 8, 0, 0),
(204, 'Bob', 'piquier', 13, 24, 6, 1, 0, 45, -55, 55, 1, 3841, 3708, 3, 0, 0),
(205, 'Zorglub', 'forgeron', 43, 1, 6, 1, 0, 45, -30, 30, 1, 540, 540, 2, 0, 0),
(206, 'Zorglub', 'éclaireur', 50, 6, 6, 1, 0, 54, 1, 55, 1, 541, 540, 3, 0, 0),
(207, 'Zorglub', 'cartographe', 319, 4, 6, 1, 0, 108, -40, 50, 1, 540, 540, 2, 0, 0),
(208, 'Zorglub', 'transport de troupe', 82, 3, 6, 1, 0, 64, -35, 95, 1, 540, 540, 2, 0, 0),
(209, 'Zorglub', 'engrenages', 1828, 20, 6, 1, 0, 0, 0, 0, 1, 540, 540, 2, 0, 0),
(210, 'Zorglub', 'tonneau', 581, 6, 6, 1, 0, 9, 0, 100, 1, 540, 540, 2, 0, 0),
(211, 'Zorglub', 'château', 127, 1, 6, 1, 0, 0, 0, 100, 1, 540, 540, NULL, 0, 0),
(212, 'Zorglub', 'lancier', 12, 204, 6, 1, 0, 45, -35, 35, 1, 1332, 1201, NULL, 0, 0),
(213, 'Zorglub', 'coffres', 408, 10, 6, 1, 0, 18, 0, 100, 1, 1202, 1201, 1, 0, 0),
(214, 'Zorglub', 'hommes d\'armes', 1, 48, 6, 1, 0, 45, -30, 30, 1, 1202, 1201, 1, 0, 0),
(215, 'Zorglub', 'barbares', 226, 36, 3, 15, 0, 54, -40, 40, 1, 944, 811, NULL, 0, 0),
(216, 'Zorglub', 'barbares', 226, 24, 3, 15, 0, 54, 130, 40, 0, 1207, 1075, NULL, 0, 0),
(217, 'Bob', 'espion', 92, 1, 6, 1, 0, 54, -80, 80, 1, 4111, 3978, NULL, 0, 0),
(218, 'Bob', 'archer', 57, 20, 6, 1, 0, 45, -40, 40, 1, 541, 674, 1, 0, 0),
(219, 'Bob', 'caporal', 801, 1, 6, 1, 0, 54, -70, 70, 1, 541, 3846, 1, 0, 0),
(220, 'Zorglub', 'archer', 57, 12, 6, 1, 0, 45, -17, 40, 1, 541, 674, 3, 0, 0),
(221, 'Zorglub', 'pixies', 937, 37, 3, 15, 0, 18, -6, 85, 1, 541, 540, 3, 0, 0),
(222, 'Zorglub', 'infanterie gobeline', 748, 45, 3, 15, 0, 36, -6, 30, 1, 541, 540, 3, 0, 0),
(223, 'Bob', 'pavois', 2, 35, 6, 1, 0, 45, -45, 45, 1, 541, 674, 1, 0, 0),
(224, 'Bob', 'phalange', 4, 16, 6, 1, 0, 45, -65, 65, 1, 541, 674, 1, 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bataillons`
--
ALTER TABLE `bataillons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bataillons`
--
ALTER TABLE `bataillons`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=225;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
