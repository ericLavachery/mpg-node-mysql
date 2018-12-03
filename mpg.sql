-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 03, 2018 at 09:57 PM
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
  `pic` varchar(20) COLLATE utf8_bin NOT NULL,
  `bldView` json DEFAULT NULL,
  `bldIdent` json DEFAULT NULL,
  `unitView` json DEFAULT NULL,
  `unitIdent` json DEFAULT NULL,
  `mapView` json DEFAULT NULL,
  `mapCarto` json DEFAULT NULL,
  `exploredTiles` json DEFAULT NULL,
  `enemies` json DEFAULT NULL,
  `allies` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `pseudo`, `pshort`, `pic`, `bldView`, `bldIdent`, `unitView`, `unitIdent`, `mapView`, `mapCarto`, `exploredTiles`, `enemies`, `allies`) VALUES
(1, 'Bob', 'Bob', 'dragon.png', '[]', '[]', '[54, 91, 78, 79, 80, 81, 96, 89]', '[91, 96, 78, 79, 80, 81]', '[41, 42, 43, 58, 72, 89, 73, 86, 55, 39, 54, 57, 38, 66, 51, 83, 11, 26, 12, 90, 70, 85, 100, 28, 115, 114, 23, 24, 52, 27, 35, 36, 65, 44, 74, 68, 69, 82, 84, 102, 10, 56, 71, 8, 67, 97, 101, 50, 40, 99, 37, 87, 98, 25, 59]', '[55, 39, 58, 54, 38, 66, 51, 41, 86, 83]', '[55]', '[\"Zorglub\"]', '[\"Madrigal\"]'),
(2, 'Zorglub', 'Zorg', 'demon.png', '[]', '[]', '[47, 40, 49, 61, 93, 105, 104]', '[47, 40, 49, 61, 105, 104]', '[58, 73, 74, 88, 104, 116, 85, 57, 72, 87, 100, 102, 117, 130, 103, 115, 70, 55, 41, 89, 101, 132, 26, 39, 40, 59, 131]', '[73, 116, 88]', '[]', '[\"Bob\"]', '[]'),
(3, 'Morpheus', 'Mrph', 'triton.png', '[]', '[]', '[66, 11, 49, 50, 90]', '[66, 49, 50]', '[]', '[]', '[88]', '[]', '[]'),
(4, 'Madrigal', 'Madr', 'minotaur.png', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[\"Zorglub\"]', '[\"Bob\"]');

-- --------------------------------------------------------

--
-- Table structure for table `pop`
--

CREATE TABLE `pop` (
  `id` int(11) NOT NULL,
  `player` varchar(12) COLLATE utf8_bin NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL,
  `typeId` smallint(6) NOT NULL,
  `number` int(11) NOT NULL,
  `x` int(11) DEFAULT NULL,
  `y` int(11) DEFAULT NULL,
  `blessures` smallint(6) NOT NULL,
  `move` smallint(6) NOT NULL,
  `fatigue` smallint(6) NOT NULL,
  `tileId` int(11) NOT NULL,
  `prevTileId` int(11) NOT NULL,
  `follow` int(11) DEFAULT NULL,
  `onTrack` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `pop`
--

INSERT INTO `pop` (`id`, `player`, `type`, `typeId`, `number`, `x`, `y`, `blessures`, `move`, `fatigue`, `tileId`, `prevTileId`, `follow`, `onTrack`) VALUES
(5, 'Zorglub', 'Chamane', 5, 1, 3, 15, 0, 65, 0, 74, 74, NULL, 0),
(11, 'Zorglub', 'Barbares', 1, 48, 3, 15, 0, 65, 0, 88, 88, NULL, 0),
(38, 'Bob', 'Château', 9, 1, 6, 1, 0, 0, 0, 41, 41, NULL, 0),
(41, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 23, 41, NULL, 0),
(42, 'Bob', 'Piquiers', 2, 13, 6, 1, 0, 60, 0, 43, 43, NULL, 0),
(44, 'Bob', 'Piquiers', 2, 14, 6, 1, 0, 60, 0, 90, 74, NULL, 0),
(45, 'Bob', 'Espion', 7, 1, 6, 1, 0, 70, 0, 42, 42, NULL, 0),
(47, 'Bob', 'Piquiers', 2, 15, 6, 1, 0, 60, 0, 73, 73, NULL, 0),
(48, 'Bob', 'Forgeron', 4, 1, 6, 1, 0, 60, 0, 41, 41, 1, 0),
(50, 'Bob', 'Piquiers', 2, 13, 6, 1, 0, 60, 0, 74, 89, NULL, 0),
(51, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 73, 73, NULL, 0),
(52, 'Bob', 'Eclaireurs', 6, 6, 6, 1, 0, 70, 0, 43, 43, 6, 0),
(53, 'Zorglub', 'Barbares', 1, 13, 3, 15, 0, 65, 0, 58, 58, NULL, 0),
(54, 'Zorglub', 'Pisteur', 3, 61, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(55, 'Zorglub', 'Barbares', 1, 127, 3, 15, 0, 65, 0, 116, 116, 2, 0),
(56, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 43, 43, 6, 0),
(58, 'Zorglub', 'Barbares', 1, 3, 3, 15, 0, 65, 0, 85, 85, NULL, 0),
(59, 'Zorglub', 'Barbares', 1, 1, 3, 15, 0, 65, 0, 55, 40, NULL, 0),
(60, 'Bob', 'Piquiers', 2, 2, 6, 1, 0, 60, 0, 26, 42, NULL, 0),
(63, 'Zorglub', 'Barbares', 1, 7, 3, 15, 0, 65, 0, 104, 104, NULL, 0),
(64, 'Zorglub', 'Barbares', 1, 30, 3, 15, 0, 65, 0, 116, 116, 2, 0),
(65, 'Bob', 'Eclaireurs', 6, 5, 6, 1, 0, 70, 0, 41, 70, 1, 0),
(67, 'Bob', 'Piquiers', 2, 18, 6, 1, 0, 60, 0, 100, 101, NULL, 0),
(68, 'Bob', 'Piquiers', 2, 60, 6, 1, 0, 60, 0, 57, 72, NULL, 0),
(75, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 115, 87, NULL, 0),
(76, 'Bob', 'Espion', 7, 1, 6, 1, 0, 70, 0, 12, 28, NULL, 0),
(77, 'Zorglub', 'Barbares', 1, 8, 3, 15, 0, 65, 0, 74, 74, NULL, 0),
(78, 'Zorglub', 'Barbares', 1, 10, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(79, 'Zorglub', 'Barbares', 1, 13, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(80, 'Zorglub', 'Barbares', 1, 42, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(81, 'Zorglub', 'Barbares', 1, 23, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(82, 'Zorglub', 'Barbares', 1, 2, 3, 15, 0, 65, 0, 73, 73, NULL, 0),
(83, 'Zorglub', 'Pisteur', 3, 12, 3, 15, 0, 65, 0, 73, 73, NULL, 0),
(89, 'Zorglub', 'Pisteur', 3, 17, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(90, 'Zorglub', 'Pisteur', 3, 48, 3, 15, 0, 65, 0, 88, 88, NULL, 0),
(91, 'Morpheus', 'Piquiers', 2, 7, 6, 1, 0, 60, 0, 58, 58, NULL, 0),
(92, 'Morpheus', 'Espion', 7, 2, 6, 1, 0, 70, 0, 43, 43, 6, 0),
(93, 'Morpheus', 'Pisteur', 3, 150, 3, 15, 0, 65, 106, 88, 88, NULL, 0),
(94, 'Bob', 'Piquiers', 2, 4, 6, 1, 0, 60, 0, 86, 102, NULL, 0),
(95, 'Bob', 'Piquiers', 2, 5, 6, 1, 0, 60, 0, 51, 70, NULL, 0),
(96, 'Morpheus', 'Piquiers', 2, 3, 6, 1, 0, 60, 42, 73, 73, NULL, 0),
(97, 'Bob', 'Eclaireurs', 6, 5, 6, 1, 0, 70, 0, 58, 58, NULL, 0),
(98, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 11, 41, NULL, 0),
(99, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 41, 41, 1, 0),
(100, 'Bob', 'Cartographe', 8, 4, 6, 1, 0, 65, 0, 83, 39, NULL, 0),
(103, 'Bob', 'Piquiers', 2, 36, 6, 1, 0, 60, 0, 72, 72, NULL, 0),
(104, 'Bob', 'Piquiers', 2, 73, 6, 1, 0, 60, 48, 55, 70, NULL, 0),
(105, 'Bob', 'Piquiers', 2, 14, 6, 1, 0, 60, 79, 70, 69, NULL, 0),
(109, 'Bob', 'Piquiers', 2, 1, 6, 1, 0, 60, 0, 41, 41, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `terrains`
--

CREATE TABLE `terrains` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `icon` varchar(20) COLLATE utf8_bin NOT NULL,
  `color` char(7) COLLATE utf8_bin NOT NULL DEFAULT '#cf7c7c',
  `moveCostAdj` tinyint(4) NOT NULL,
  `escarpement` tinyint(4) NOT NULL,
  `vegetation` tinyint(4) NOT NULL,
  `innondation` smallint(11) NOT NULL,
  `humidite` tinyint(4) NOT NULL,
  `tempMin` tinyint(4) NOT NULL,
  `tempMax` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `terrains`
--

INSERT INTO `terrains` (`id`, `name`, `icon`, `color`, `moveCostAdj`, `escarpement`, `vegetation`, `innondation`, `humidite`, `tempMin`, `tempMax`) VALUES
(1, 'plaine', 'plaine', '#c4c878', 0, 0, 5, 0, 0, 0, 0),
(2, 'forêt mixte', 'foret', '#1d6b1b', 0, 10, 35, 0, 0, 0, 0),
(3, 'collines arides', 'collines', '#a88051', 0, 25, 5, 0, 0, 0, 0),
(4, 'montagnes', 'montagnes2', '#71491a', 0, 40, 5, 0, 0, 0, 0),
(5, 'marécages', 'marecages', '#679172', 0, 0, 10, 35, 0, 0, 0),
(6, 'prairie', 'prairie', '#b8d67f', 0, 0, 10, 0, 0, 0, 0),
(7, 'pâturages', '', '#a8c76c', 0, 0, 15, 0, 0, 0, 0),
(8, 'steppe', '', '#b6ac87', 0, 10, 5, 0, 0, 0, 0),
(9, 'tundra', '', '#b2ba81', 0, 10, 5, 0, 0, 0, 0),
(10, 'pampa', '', '#b6ac87', 0, 10, 5, 0, 0, 0, 0),
(11, 'veld', 'veld', '#cbc58e', 0, 0, 10, 0, 0, 0, 0),
(12, 'savane', 'savane', '#cbc58e', 0, 0, 10, 0, 0, 0, 0),
(13, 'banquise', '', '#c0d9d7', 20, 0, 0, 0, 0, 0, 0),
(14, 'désert polaire', '', '#c1baa2', 0, 0, 0, 0, 0, 0, 0),
(15, 'désert de sable', 'dunes', '#d7d362', 25, 15, 0, 0, 0, 0, 0),
(26, 'oasis', 'oasis', '#d7d362', 25, 0, 25, 0, 0, 0, 0),
(27, 'haut plateau', '', '#9ba26f', 0, 10, 10, 0, 0, 0, 0),
(28, 'fagne', '', '#66a167', 0, 0, 20, 25, 0, 0, 0),
(29, 'pantanal', '', '#308879', 0, 0, 5, 50, 0, 0, 0),
(30, 'pré-salé', '', '#7b9167', 0, 0, 10, 40, 0, 0, 0),
(31, 'tourbière', '', '#54795d', 0, 0, 20, 35, 0, 0, 0),
(32, 'palud', '', '#308866', 0, 0, 30, 40, 0, 0, 0),
(33, 'bayou', '', '#1e715b', 0, 0, 30, 50, 0, 0, 0),
(34, 'mangrove', 'mangrove2', '#208776', 0, 0, 40, 50, 0, 0, 0),
(35, 'futaie', '', '#227d1f', 0, 10, 30, 0, 0, 0, 0),
(36, 'pinède', '', '#3e6b1b', 0, 10, 30, 0, 0, 0, 0),
(37, 'taïga', '', '#344e0f', 0, 15, 35, 0, 0, 0, 0),
(38, 'forêt sèche', '', '#486b1b', 0, 10, 35, 0, 0, 0, 0),
(39, 'jungle', 'jungle', '#0f4d3a', 0, 10, 50, 0, 0, 0, 0),
(40, 'laurisylve', 'lauri2', '#0e451d', 0, 30, 35, 0, 0, 0, 0),
(41, 'forêt de nuages', '', '#063325', 0, 30, 50, 0, 0, 0, 0),
(42, 'inlandsis', '', '#c0d9d7', 20, 0, 0, 0, 0, 0, 0),
(43, 'lande', '', '#87ac4b', 0, 10, 20, 0, 0, 0, 0),
(44, 'bush', '', '#87ac4b', 0, 10, 20, 0, 0, 0, 0),
(45, 'garrigue', '', '#87ac4b', 0, 10, 20, 0, 0, 0, 0),
(46, 'brousse', '', '#86913d', 0, 15, 20, 0, 0, 0, 0),
(47, 'maquis', 'maquis', '#779842', 0, 20, 20, 0, 0, 0, 0),
(48, 'chaparral', 'maquis', '#87a851', 0, 20, 20, 0, 0, 0, 0),
(49, 'miombo', '', '#878f44', 0, 20, 25, 0, 0, 0, 0),
(50, 'caatinga', 'caatinga', '#728f44', 0, 20, 30, 0, 0, 0, 0),
(51, 'piémont', '', '#898c42', 0, 25, 15, 0, 0, 0, 0),
(52, 'mer', '', '#97bbdb', 0, 0, 0, 100, 0, 0, 0),
(53, 'lac', '', '#91c4c9', 0, 0, 0, 85, 0, 0, 0),
(54, 'océan', '', '#7d94cd', 0, 0, 0, 110, 0, 0, 0),
(55, 'récifs', 'brisants', '#97bbdb', 20, 0, 10, 75, 0, 0, 0),
(56, 'abysses', '', '#5a6ba8', 0, 0, 0, 125, 0, 0, 0),
(57, 'neiges éternelles', 'eterneiges', '#442b0e', 0, 50, 0, 0, 0, 0, 0),
(58, 'collines boisées', 'collinesbois', '#215b18', 0, 25, 30, 0, 0, 0, 0),
(59, 'collines vertes', 'collinesvertes', '#87a851', 0, 25, 10, 0, 0, 0, 0),
(60, 'étocs', 'brisants', '#91c4c9', 20, 0, 10, 75, 0, 0, 0),
(61, 'brisants', 'brisants', '#7d94cd', 20, 0, 10, 75, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tracks`
--

CREATE TABLE `tracks` (
  `id` int(11) NOT NULL,
  `player` varchar(20) COLLATE utf8_bin NOT NULL,
  `name` varchar(64) COLLATE utf8_bin NOT NULL,
  `tiles` text COLLATE utf8_bin NOT NULL,
  `firstTile` int(11) NOT NULL,
  `lastTile` int(11) NOT NULL,
  `firstTileName` varchar(24) COLLATE utf8_bin NOT NULL,
  `lastTileName` varchar(24) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `tracks`
--

INSERT INTO `tracks` (`id`, `player`, `name`, `tiles`, `firstTile`, `lastTile`, `firstTileName`, `lastTileName`) VALUES
(1, 'Bob', 'route de la soif', '_100_85_70_55_39_23_', 100, 23, 'Asgard', 'Breth'),
(2, 'Bob', 'route 66', '_65_66_67_68_71_73_74_72_69_70_', 65, 74, 'Harapan', 'Tushpahassapticon');

-- --------------------------------------------------------

--
-- Table structure for table `unitTypes`
--

CREATE TABLE `unitTypes` (
  `id` int(11) NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL,
  `typeSing` varchar(20) COLLATE utf8_bin NOT NULL,
  `icon` varchar(12) COLLATE utf8_bin NOT NULL,
  `cat` varchar(3) COLLATE utf8_bin NOT NULL,
  `illu` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `hp` int(11) NOT NULL,
  `armure` smallint(6) NOT NULL,
  `esquive` smallint(6) NOT NULL,
  `parade` smallint(6) NOT NULL,
  `ammo` int(11) NOT NULL,
  `rapidite` smallint(6) NOT NULL,
  `actions` smallint(6) NOT NULL,
  `puissance` smallint(6) NOT NULL,
  `attaque` smallint(6) NOT NULL,
  `defense` smallint(6) NOT NULL,
  `move` smallint(6) NOT NULL,
  `moveAdj` smallint(6) NOT NULL,
  `moveType` enum('ter','air','alt','cab','mix','mer') COLLATE utf8_bin NOT NULL,
  `escarpAdj` smallint(6) NOT NULL DEFAULT '100',
  `innondAdj` smallint(6) NOT NULL DEFAULT '100',
  `vegetAdj` smallint(6) NOT NULL DEFAULT '100',
  `coverAdj` smallint(6) NOT NULL,
  `detection` smallint(6) NOT NULL,
  `discretion` smallint(6) NOT NULL,
  `skills` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `unitTypes`
--

INSERT INTO `unitTypes` (`id`, `type`, `typeSing`, `icon`, `cat`, `illu`, `hp`, `armure`, `esquive`, `parade`, `ammo`, `rapidite`, `actions`, `puissance`, `attaque`, `defense`, `move`, `moveAdj`, `moveType`, `escarpAdj`, `innondAdj`, `vegetAdj`, `coverAdj`, `detection`, `discretion`, `skills`) VALUES
(1, 'Barbares', 'Barbare', 'sld', 'sld', NULL, 10, 20, 8, 8, -1, 40, 3, 6, 15, 10, 65, 50, 'ter', 100, 100, 100, 150, 65, 45, ''),
(2, 'Piquiers', 'Piquier', 'sld', 'sld', NULL, 10, 35, 6, 9, -1, 35, 3, 5, 10, 12, 60, 100, 'ter', 100, 100, 100, 75, 60, 25, 'pole_regular_'),
(3, 'Pisteurs', 'Pisteur', 'spy', 'spy', NULL, 10, 20, 9, 7, -1, 45, 3, 5, 12, 10, 65, 30, 'ter', 100, 100, 100, 150, 110, 85, 'undercover_explo_informer_'),
(4, 'Forgerons', 'Forgeron', 'wrk', 'wrk', NULL, 10, 10, 5, 5, -1, 30, 3, 6, 5, 6, 60, 100, 'ter', 100, 100, 100, 50, 60, 25, ''),
(5, 'Chamanes', 'Chamane', 'spy', 'spy', NULL, 10, 20, 8, 5, -1, 40, 3, 5, 10, 13, 65, 50, 'ter', 100, 100, 100, 150, 75, 75, ''),
(6, 'Eclaireurs', 'Eclaireur', 'spy', 'spy', NULL, 8, 15, 7, 5, -1, 45, 3, 4, 6, 7, 70, 30, 'ter', 100, 100, 100, 150, 120, 120, 'undercover_explo_informer_'),
(7, 'Espions', 'Espion', 'spy', 'spy', NULL, 8, 10, 9, 5, -1, 55, 3, 4, 5, 5, 70, 50, 'ter', 100, 100, 100, 120, 150, 150, 'spy_'),
(8, 'Cartographes', 'Cartographe', 'wrk', 'wrk', NULL, 8, 10, 4, 3, -1, 30, 3, 3, 4, 5, 65, 50, 'ter', 100, 100, 100, 100, 80, 30, 'carto_'),
(9, 'Châteaux', 'Château', 'bld', 'bld', NULL, 2000, 120, 0, 0, -1, 20, 3, 10, 0, 15, 0, 100, 'ter', 100, 100, 100, 0, 80, 0, 'regular_');

-- --------------------------------------------------------

--
-- Table structure for table `world`
--

CREATE TABLE `world` (
  `id` int(11) NOT NULL,
  `tileName` varchar(24) COLLATE utf8_bin NOT NULL,
  `terrain` varchar(24) COLLATE utf8_bin NOT NULL,
  `flags` varchar(255) COLLATE utf8_bin NOT NULL,
  `terrainId` tinyint(4) NOT NULL,
  `x` int(3) NOT NULL,
  `y` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `world`
--

INSERT INTO `world` (`id`, `tileName`, `terrain`, `flags`, `terrainId`, `x`, `y`) VALUES
(1, '', 'plains', '', 1, 1, 1),
(2, '', 'forest', '', 2, 1, 2),
(3, '', 'forest', '', 2, 1, 3),
(4, '', 'hills', '', 3, 1, 4),
(5, '', 'forest', '', 2, 1, 5),
(6, '', 'plains', '', 1, 1, 6),
(7, '', 'plains', '', 1, 1, 7),
(8, '', 'forest', '', 2, 1, 8),
(9, '', 'mountains', '', 4, 1, 9),
(10, '', 'mountains', 'road_', 57, 1, 10),
(11, '', 'hills', '', 3, 1, 11),
(12, '', 'plains', '', 1, 1, 12),
(13, '', 'hills', '', 3, 1, 13),
(14, '', 'forest', '', 2, 1, 14),
(15, '', 'forest', '', 2, 1, 15),
(16, '', 'plains', '', 1, 2, 1),
(17, '', 'plains', '', 1, 2, 2),
(18, '', 'forest', '', 2, 2, 3),
(19, '', 'forest', '', 2, 2, 4),
(20, '', 'forest', '', 2, 2, 5),
(21, '', 'plains', '', 1, 2, 6),
(22, '', 'forest', '', 2, 2, 7),
(23, '', 'forest', '', 2, 2, 8),
(24, '', 'hills', '', 3, 2, 9),
(25, '', 'mountains', '', 4, 2, 10),
(26, '', 'plains', 'road_river_', 1, 2, 11),
(27, '', 'plains', 'river_', 1, 2, 12),
(28, '', 'mountains', 'river_road_', 4, 2, 13),
(29, '', 'hills', 'road_', 59, 2, 14),
(30, '', 'forest', 'road_', 2, 2, 15),
(31, '', 'plains', '', 1, 3, 1),
(32, '', 'forest', '', 2, 3, 2),
(33, '', 'hills', '', 3, 3, 3),
(34, '', 'forest', '', 2, 3, 4),
(35, '', 'mountains', '', 4, 3, 5),
(36, '', 'lac', 'navig_', 53, 3, 6),
(37, '', 'lac', 'navig_', 53, 3, 7),
(38, '', 'plains', 'river_', 6, 3, 8),
(39, '', 'plains', 'river_', 1, 3, 9),
(40, '', 'forest', 'river_', 2, 3, 10),
(41, '', 'plains', 'road_river_', 1, 3, 11),
(42, '', 'forest', 'road_', 2, 3, 12),
(43, '', 'forest', '', 2, 3, 13),
(44, '', 'forest', '', 2, 3, 14),
(45, '', 'hills', '', 58, 3, 15),
(46, '', 'hills', '', 3, 4, 1),
(47, '', 'hills', '', 3, 4, 2),
(48, '', 'mountains', '', 4, 4, 3),
(49, '', 'swamp', '', 5, 4, 4),
(50, '', 'swamp', '', 5, 4, 5),
(51, '', 'swamp', '', 34, 4, 6),
(52, '', 'récifs', 'navig_', 60, 4, 7),
(53, '', 'plains', '', 6, 4, 8),
(54, '', 'plains', '', 6, 4, 9),
(55, 'Chez Willy', 'plains', 'road_', 6, 4, 10),
(56, '', 'forest', '', 2, 4, 11),
(57, '', 'forest', '', 2, 4, 12),
(58, '', 'forest', '', 2, 4, 13),
(59, '', 'hills', '', 58, 4, 14),
(60, '', 'hills', '', 59, 4, 15),
(61, '', 'hills', '', 3, 5, 1),
(62, '', 'hills', '', 3, 5, 2),
(63, '', 'mountains', '', 4, 5, 3),
(64, '', 'mountains', '', 4, 5, 4),
(65, '', 'swamp', '', 5, 5, 5),
(66, '', 'swamp', '', 5, 5, 6),
(67, '', 'plains', '', 6, 5, 7),
(68, '', 'plains', '', 6, 5, 8),
(69, '', 'plains', '', 6, 5, 9),
(70, '', 'plains', 'road_', 1, 5, 10),
(71, '', 'plains', '', 1, 5, 11),
(72, '', 'plains', '', 1, 5, 12),
(73, '', 'forest', '', 2, 5, 13),
(74, '', 'forest', '', 2, 5, 14),
(75, '', 'hills', '', 58, 5, 15),
(76, '', 'hills', '', 3, 6, 1),
(77, '', 'mountains', '', 4, 6, 2),
(78, '', 'mountains', '', 4, 6, 3),
(79, '', 'mountains', '', 4, 6, 4),
(80, '', 'mountains', '', 4, 6, 5),
(81, '', 'swamp', '', 5, 6, 6),
(82, '', 'swamp', '', 5, 6, 7),
(83, 'Café du coin', 'plains', '', 6, 6, 8),
(84, '', 'plains', '', 1, 6, 9),
(85, '', 'plains', 'road_', 1, 6, 10),
(86, '', 'plains', '', 1, 6, 11),
(87, '', 'laurisylve', '', 40, 6, 12),
(88, '', 'forest', '', 2, 6, 13),
(89, '', 'forest', '', 2, 6, 14),
(90, '', 'forest', '', 2, 6, 15),
(91, '', 'hills', '', 3, 7, 1),
(92, '', 'hills', '', 3, 7, 2),
(93, '', 'hills', '', 3, 7, 3),
(94, '', 'mountains', '', 4, 7, 4),
(95, '', 'hills', '', 3, 7, 5),
(96, '', 'swamp', '', 47, 7, 6),
(97, '', 'forest', '', 50, 7, 7),
(98, '', 'plains', '', 12, 7, 8),
(99, '', 'plains', '', 15, 7, 9),
(100, '', 'plains', 'road_', 1, 7, 10),
(101, '', 'forest', '', 2, 7, 11),
(102, '', 'plains', '', 39, 7, 12),
(103, '', 'forest', '', 2, 7, 13),
(104, '', 'forest', '', 2, 7, 14),
(105, '', 'plains', '', 1, 7, 15),
(106, '', 'plains', '', 1, 8, 1),
(107, '', 'plains', '', 1, 8, 2),
(108, '', 'hills', '', 3, 8, 3),
(109, '', 'hills', '', 3, 8, 4),
(110, '', 'plains', '', 1, 8, 5),
(111, '', 'plains', '', 48, 8, 6),
(112, '', 'swamp', '', 11, 8, 7),
(113, '', 'plains', '', 26, 8, 8),
(114, '', 'plains', 'road_', 15, 8, 9),
(115, '', 'forest', '', 2, 8, 10),
(116, '', 'forest', '', 2, 8, 11),
(117, '', 'plains', '', 1, 8, 12),
(118, '', 'plains', '', 1, 8, 13),
(119, '', 'forest', '', 2, 8, 14),
(120, '', 'plains', '', 1, 8, 15),
(121, '', 'plains', '', 1, 9, 1),
(122, '', 'plains', '', 1, 9, 2),
(123, '', 'plains', '', 1, 9, 3),
(124, '', 'plains', '', 1, 9, 4),
(125, '', 'plains', '', 1, 9, 5),
(126, '', 'plains', '', 1, 9, 6),
(127, '', 'plains', '', 1, 9, 7),
(128, '', 'plains', '', 1, 9, 8),
(129, '', 'hills', '', 3, 9, 9),
(130, '', 'hills', '', 3, 9, 10),
(131, '', 'plains', '', 1, 9, 11),
(132, '', 'plains', '', 1, 9, 12),
(133, '', 'plains', '', 1, 9, 13),
(134, '', 'plains', '', 1, 9, 14),
(135, '', 'plains', '', 1, 9, 15);

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
-- Indexes for table `tracks`
--
ALTER TABLE `tracks`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `unitTypes`
--
ALTER TABLE `unitTypes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `type` (`type`),
  ADD UNIQUE KEY `typeSing` (`typeSing`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `pop`
--
ALTER TABLE `pop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;
--
-- AUTO_INCREMENT for table `terrains`
--
ALTER TABLE `terrains`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;
--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `unitTypes`
--
ALTER TABLE `unitTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `world`
--
ALTER TABLE `world`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
