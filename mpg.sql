-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 24, 2018 at 02:51 PM
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
  `allies` json DEFAULT NULL,
  `prefs` varchar(535) COLLATE utf8_bin NOT NULL DEFAULT '_'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `pseudo`, `pshort`, `pic`, `bldView`, `bldIdent`, `unitView`, `unitIdent`, `mapView`, `mapCarto`, `exploredTiles`, `enemies`, `allies`, `prefs`) VALUES
(1, 'Bob', 'Bob', 'dragon', '[]', '[]', '[91]', '[91]', '[41, 42, 43, 58, 73, 86, 55, 39, 54, 57, 38, 83, 11, 26, 12, 70, 85, 100, 28, 114, 59, 68, 71, 23, 60, 45, 112, 125, 103, 30, 29, 14, 82, 97, 108, 123, 109, 27, 40, 44, 96, 122, 69, 72, 67, 94, 102, 37, 111, 110, 127, 84, 95, 78, 79, 74, 25, 101, 63, 56, 88, 89, 99, 104, 117, 119, 98, 53, 87, 105, 120, 133, 134, 135, 22, 36, 51, 52, 24]', '[55, 39, 58, 54, 38, 41, 86, 83, 68, 60, 112, 125, 82, 97, 73]', '[]', '[\"Zorglub\"]', '[\"Madrigal\"]', '_detu_'),
(2, 'Zorglub', 'Zorg', 'demon', '[]', '[]', '[47, 40, 49, 61, 93, 105, 104, 113]', '[47, 40, 49, 61, 105, 104, 113]', '[58, 73, 74, 88, 104, 116, 85, 57, 72, 87, 100, 117, 130, 115, 70, 55, 41, 132, 26, 40, 59, 42, 56, 71, 103, 131, 89, 101, 54, 69, 84, 86, 114, 98, 99, 113, 128, 129, 102, 97, 112, 127]', '[73, 116, 88, 57, 70, 114, 113]', '[]', '[\"Bob\"]', '[]', '_'),
(3, 'Morpheus', 'Mrph', 'triton', '[]', '[]', '[66, 11, 49, 50, 90]', '[66, 49, 50]', '[]', '[]', '[88]', '[]', '[]', '_'),
(4, 'Madrigal', 'Madr', 'minotaur', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[\"Zorglub\"]', '[\"Bob\"]', '_');

-- --------------------------------------------------------

--
-- Table structure for table `pop`
--

CREATE TABLE `pop` (
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
  `tileId` int(11) NOT NULL,
  `prevTileId` int(11) NOT NULL,
  `follow` int(11) DEFAULT NULL,
  `onTrack` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `pop`
--

INSERT INTO `pop` (`id`, `player`, `type`, `typeId`, `number`, `x`, `y`, `blessures`, `move`, `fatigue`, `tileId`, `prevTileId`, `follow`, `onTrack`) VALUES
(5, 'Zorglub', 'Chamane', 5, 1, 3, 15, 0, 65, 0, 74, 74, NULL, 0),
(11, 'Zorglub', 'Barbares', 1, 48, 3, 15, 0, 65, 0, 88, 88, NULL, 0),
(38, 'Bob', 'Château', 9, 1, 6, 1, 0, 0, 0, 41, 41, NULL, 0),
(41, 'Bob', 'Piquiers', 2, 4, 6, 1, 0, 60, 0, 39, 23, NULL, 1),
(42, 'Bob', 'Piquiers', 2, 13, 6, 1, 0, 60, 0, 14, 29, NULL, 0),
(44, 'Bob', 'Piquiers', 2, 27, 6, 1, 0, 60, 0, 59, 60, NULL, 0),
(45, 'Bob', 'Espion', 7, 1, 6, 1, 0, 70, 0, 42, 42, NULL, 0),
(47, 'Bob', 'Piquiers', 2, 15, 6, 1, 0, 60, 0, 72, 73, 2, 0),
(48, 'Bob', 'Forgeron', 4, 1, 6, 1, 0, 60, 0, 41, 41, 1, 0),
(51, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 72, 73, 2, 0),
(52, 'Bob', 'Eclaireurs', 6, 6, 6, 1, 0, 70, 0, 44, 43, NULL, 0),
(53, 'Zorglub', 'Barbares', 1, 13, 3, 15, 0, 65, 0, 58, 58, NULL, 0),
(54, 'Zorglub', 'Pisteur', 3, 61, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(55, 'Zorglub', 'Barbares', 1, 127, 3, 15, 0, 65, 0, 116, 116, 2, 0),
(56, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 44, 43, NULL, 0),
(58, 'Zorglub', 'Barbares', 1, 3, 3, 15, 0, 65, 0, 85, 85, NULL, 0),
(59, 'Zorglub', 'Barbares', 1, 1, 3, 15, 0, 65, 0, 55, 40, NULL, 0),
(60, 'Bob', 'Piquiers', 2, 2, 6, 1, 0, 60, 0, 26, 42, NULL, 0),
(63, 'Zorglub', 'Barbares', 1, 7, 3, 15, 0, 65, 0, 104, 104, NULL, 0),
(64, 'Zorglub', 'Barbares', 1, 30, 3, 15, 0, 65, 0, 116, 116, 2, 0),
(65, 'Bob', 'Eclaireurs', 6, 5, 6, 1, 0, 70, 0, 41, 70, 1, 0),
(67, 'Bob', 'Piquiers', 2, 6, 6, 1, 0, 60, 0, 83, 84, NULL, 0),
(68, 'Bob', 'Piquiers', 2, 60, 6, 1, 0, 60, 0, 57, 72, NULL, 0),
(75, 'Bob', 'Espion', 7, 20, 6, 1, 0, 70, 0, 63, 78, NULL, 0),
(76, 'Bob', 'Espion', 7, 1, 6, 1, 0, 70, 0, 12, 13, NULL, 0),
(77, 'Zorglub', 'Barbares', 1, 8, 3, 15, 0, 65, 0, 74, 74, NULL, 0),
(78, 'Zorglub', 'Barbares', 1, 10, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(79, 'Zorglub', 'Barbares', 1, 13, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(80, 'Zorglub', 'Barbares', 1, 42, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(81, 'Zorglub', 'Barbares', 1, 23, 3, 15, 0, 65, 0, 73, 73, 1, 0),
(82, 'Zorglub', 'Barbares', 1, 2, 3, 15, 0, 65, 0, 73, 73, NULL, 0),
(83, 'Zorglub', 'Pisteur', 3, 12, 3, 15, 0, 65, 0, 73, 73, NULL, 0),
(89, 'Zorglub', 'Pisteur', 3, 17, 3, 15, 0, 65, 103, 113, 114, NULL, 0),
(90, 'Zorglub', 'Pisteur', 3, 48, 3, 15, 0, 65, 0, 88, 88, NULL, 0),
(91, 'Morpheus', 'Piquiers', 2, 7, 6, 1, 0, 60, 0, 58, 58, NULL, 0),
(92, 'Morpheus', 'Espion', 7, 2, 6, 1, 0, 70, 0, 43, 43, 6, 0),
(93, 'Morpheus', 'Pisteur', 3, 150, 3, 15, 0, 65, 106, 88, 88, NULL, 0),
(94, 'Bob', 'Piquiers', 2, 4, 6, 1, 0, 60, 0, 86, 102, NULL, 0),
(95, 'Bob', 'Piquiers', 2, 5, 6, 1, 0, 60, 0, 111, 97, NULL, 0),
(96, 'Morpheus', 'Piquiers', 2, 3, 6, 1, 0, 60, 42, 73, 73, NULL, 0),
(97, 'Bob', 'Eclaireurs', 6, 5, 6, 1, 0, 70, 0, 58, 73, NULL, 0),
(98, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 11, 41, NULL, 0),
(99, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 41, 41, 1, 0),
(100, 'Bob', 'Cartographe', 8, 4, 6, 1, 0, 65, 0, 45, 60, NULL, 0),
(103, 'Bob', 'Piquiers', 2, 16, 6, 1, 0, 60, 0, 71, 72, NULL, 2),
(109, 'Bob', 'Piquiers', 2, 1, 6, 1, 0, 60, 0, 41, 41, 1, 0),
(110, 'Bob', 'Piquiers', 2, 384, 6, 1, 0, 60, 0, 70, 71, 3, 0),
(113, 'Bob', 'Piquiers', 2, 11, 6, 1, 0, 60, 0, 55, 70, NULL, 1),
(114, 'Bob', 'Piquiers', 2, 6, 6, 1, 0, 60, 0, 70, 85, 3, 1),
(121, 'Bob', 'Piquiers', 2, 12, 6, 1, 0, 60, 0, 100, 101, NULL, 0),
(122, 'Bob', 'Piquiers', 2, 4, 6, 1, 0, 60, 85, 37, 23, NULL, 0),
(123, 'Bob', 'Piquiers', 2, 6, 6, 1, 0, 60, 110, 119, 103, NULL, 0),
(124, 'Bob', 'Vachement trop longs', 10, 188, 6, 1, 0, 60, 0, 70, 71, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` smallint(6) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `price` smallint(6) NOT NULL,
  `AltRes` varchar(20) COLLATE utf8_bin NOT NULL,
  `CostRes` varchar(20) COLLATE utf8_bin NOT NULL,
  `CostNum` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `name`, `price`, `AltRes`, `CostRes`, `CostNum`) VALUES
(1, 'Bois', 25, 'Chevrons', '', 0),
(2, 'Chevrons', 80, '', 'Bois', 2),
(3, 'Argile', 30, '', '', 0),
(4, 'Brique', 45, 'Pierre', 'Argile', 1),
(5, 'Pierre', 65, '', '', 0),
(6, 'Végétaux', 20, '', '', 0),
(7, 'Céréales', 25, '', '', 0),
(8, 'Grain', 45, '', 'Céréales', 1),
(9, 'Pain', 130, '', 'Grain', 1),
(10, 'Fruits', 25, '', '', 0),
(11, 'Légumes', 25, '', '', 0),
(12, 'Poissons', 40, '', '', 0),
(13, 'Gibier', 40, '', '', 0),
(14, 'Viande', 90, '', 'Gibier', 1),
(15, 'Métal', 70, 'Acier', '', 0),
(16, 'Acier', 200, '', 'Métal', 2),
(17, 'Engrenages', 1000, '', 'Acier', 3),
(18, 'Spiritueux', 330, '', 'Céréales', 8),
(19, 'Drogues', 340, '', 'Végétaux', 12),
(20, 'Charbon', 80, '', '', 0),
(21, 'Cuir', 120, '', 'Gibier', 1),
(22, 'Tissus', 250, '', 'Végétaux', 5),
(23, 'Voiles', 700, '', 'Tissus', 2),
(24, 'Encens', 500, '', 'Végétaux', 15),
(25, 'Papier', 150, '', 'Végétaux', 4),
(26, 'Epices', 400, '', '', 0),
(27, 'Cadavres', 140, '', '', 0),
(28, 'Argent', 10, '', '', 0),
(29, 'Cuivre', 1, '', '', 0),
(30, 'Or', 100, '', '', 0),
(31, 'Gemmes', 1000, '', '', 0),
(32, 'Perles', 700, '', '', 0),
(33, 'Fourrures', 250, '', 'Gibier', 1),
(34, 'Laine', 50, '', '', 0),
(35, 'Poudre à canon', 450, '', 'Charbon', 2),
(36, 'Mithril', 4000, '', '', 0),
(37, 'Adamantite', 3500, '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `terrains`
--

CREATE TABLE `terrains` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(28) COLLATE utf8_bin NOT NULL,
  `icon` varchar(20) COLLATE utf8_bin NOT NULL,
  `shad` enum('shadg','shadw','') COLLATE utf8_bin NOT NULL DEFAULT 'shadg',
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

INSERT INTO `terrains` (`id`, `name`, `icon`, `shad`, `moveCostAdj`, `escarpement`, `vegetation`, `innondation`, `humidite`, `tempMin`, `tempMax`) VALUES
(1, 'plaine', 'plaine', 'shadg', 0, 0, 5, 0, 0, 0, 25),
(2, 'forêt ombrophile', 'foretdense', 'shadg', 0, 10, 35, 0, 0, 0, 25),
(3, 'collines (arides)', 'collines', 'shadg', 0, 25, 5, 0, 0, 0, 25),
(4, 'montagnes (1)', 'montagnes', 'shadg', 0, 40, 5, 0, 0, 0, 25),
(5, 'marécages', 'marecages', 'shadg', 0, 0, 10, 35, 0, 0, 25),
(6, 'prairie', 'prairie', 'shadg', 0, 0, 10, 0, 0, 0, 25),
(7, 'pâturages', 'paturages', 'shadg', 0, 0, 15, 0, 0, 0, 25),
(8, 'steppe', 'steppe', 'shadg', 0, 10, 5, 0, 0, 0, 25),
(9, 'toundra', 'toundra', '', 0, 5, 15, 0, 0, 0, 5),
(10, 'pampa', 'pampa', 'shadg', 0, 10, 5, 0, 0, 0, 25),
(11, 'veld', 'veld', 'shadg', 0, 0, 10, 0, 0, 0, 50),
(12, 'savane (1)', 'savane', 'shadg', 0, 0, 15, 0, 0, 0, 50),
(13, 'banquise (1)', 'ice', '', 20, 0, 0, 0, 0, 0, 0),
(14, 'désert', 'desert', 'shadg', 0, 0, 0, 0, 0, 0, 25),
(15, 'désert de sable', 'sand', 'shadg', 20, 0, 0, 0, 0, 0, 50),
(26, 'oasis', 'oasis', 'shadg', 20, 0, 25, 0, 0, 0, 50),
(27, 'haut plateau', '', 'shadg', 0, 10, 10, 0, 0, 0, 25),
(28, 'fagne', 'fagnes', 'shadg', 0, 0, 20, 25, 0, 0, 25),
(29, 'pantanal', 'panta', 'shadg', 0, 0, 5, 50, 0, 0, 25),
(30, 'pré-salé', 'presale', 'shadg', 0, 0, 10, 40, 0, 0, 25),
(31, 'tourbière', 'tourbe', 'shadg', 0, 0, 20, 35, 0, 0, 25),
(32, 'palud', 'palud', 'shadg', 0, 0, 15, 40, 0, 0, 25),
(33, 'bayou', 'bayou', 'shadg', 0, 0, 30, 50, 0, 0, 25),
(34, 'mangrove', 'mangrove', 'shadg', 0, 0, 40, 50, 0, 0, 50),
(36, 'sapinière', '', 'shadg', 0, 10, 30, 0, 0, 0, 25),
(37, 'taïga', 'taiga', '', 15, 10, 30, 0, 0, 0, 5),
(38, 'forêt sèche', '', 'shadg', 0, 10, 35, 0, 0, 0, 50),
(39, 'jungle', '', 'shadg', 0, 10, 50, 0, 0, 0, 50),
(40, 'laurisylve', '', 'shadg', 0, 30, 35, 0, 0, 0, 50),
(41, 'forêt de nuages', '', 'shadg', 0, 30, 50, 0, 0, 0, 50),
(42, 'inlandsis', 'snow', '', 20, 0, 0, 0, 0, 0, 0),
(43, 'lande', '', 'shadg', 0, 10, 20, 0, 0, 0, 25),
(44, 'bush', '', 'shadg', 0, 10, 20, 0, 0, 0, 25),
(45, 'garrigue', '', 'shadg', 0, 10, 20, 0, 0, 0, 25),
(46, 'brousse', 'brousse', 'shadg', 0, 10, 20, 0, 0, 0, 50),
(47, 'maquis', '', 'shadg', 0, 20, 20, 0, 0, 0, 25),
(48, 'chaparral', '', 'shadg', 0, 20, 20, 0, 0, 0, 25),
(49, 'miombo', 'miombo', 'shadg', 0, 20, 25, 0, 0, 0, 50),
(50, 'caatinga', '', 'shadg', 0, 20, 30, 0, 0, 0, 50),
(52, 'mer', 'mer', '', 0, 0, 0, 100, 0, 0, 50),
(53, 'lac (1)', 'lac', '', 0, 0, 0, 75, 0, 0, 50),
(54, 'océan', 'ocean', '', 0, 0, 0, 110, 0, 0, 50),
(55, 'mer (récifs)', 'recifs', '', 20, 0, 10, 85, 0, 0, 50),
(56, 'abysses', 'abyss', '', 0, 0, 0, 125, 0, 0, 50),
(57, 'hautes montagnes (1)', 'hmount', 'shadg', 0, 50, 0, 0, 0, 0, 25),
(58, 'collines (boisées)', 'colbois', 'shadg', 0, 25, 30, 0, 0, 0, 25),
(59, 'collines (verdoyantes)', 'collinesvertes', 'shadg', 0, 25, 10, 0, 0, 0, 25),
(60, 'lac (étocs)', 'etocs', '', 20, 0, 10, 70, 0, 0, 50),
(61, 'océan (brisants)', 'brisants', '', 20, 0, 10, 85, 0, 0, 50),
(62, 'varenne', 'varenne', 'shadg', 0, 0, 15, 0, 0, 0, 25),
(63, 'herbage', 'herbage', 'shadg', 0, 0, 15, 0, 0, 0, 50),
(64, 'dunes', 'dunes', 'shadg', 25, 15, 0, 0, 0, 0, 50),
(65, 'oasis (dunes)', 'oadunes', 'shadg', 25, 15, 25, 0, 0, 0, 50),
(66, 'banquise (2)', 'icehole', '', 35, 0, 0, 0, 0, 0, 0),
(67, 'neiges éternelles (1)', 'mntsnow', '', 20, 40, 0, 0, 0, 0, 5),
(68, 'collines (enneigées)', 'colneige', '', 15, 25, 5, 0, 0, 0, 5),
(69, 'taïga (dense)', 'taigadense', '', 15, 10, 35, 0, 0, 0, 5),
(70, 'taïga (clairsemée)', 'taigaclaire', '', 15, 10, 25, 0, 0, 0, 5),
(71, 'désert (enneigé)', 'desneige', '', 15, 0, 5, 0, 0, 0, 5),
(72, 'désert rocailleux (enneigé)', 'rockneige', '', 15, 10, 5, 0, 0, 0, 5),
(74, 'inlandsis (péril)', 'snowskull', '', 20, 0, 0, 0, 0, 0, 0),
(75, 'fleuve', 'fleuve', '', 0, 0, 0, 75, 0, 0, 50),
(77, 'fleuve (gué)', 'gue', '', 0, 0, 0, 65, 0, 0, 50),
(78, 'étang (1)', 'etang', '', 0, 0, 0, 65, 0, 0, 50),
(79, 'pâquis (1)', 'paquis', 'shadg', 0, 0, 15, 0, 0, 0, 25),
(80, 'savane (2)', 'savanebis', 'shadg', 0, 0, 15, 0, 0, 0, 50),
(81, 'lac (2)', 'lillies', '', 0, 0, 5, 75, 0, 0, 50),
(82, 'étang (2)', 'etangveg', '', 0, 0, 10, 65, 0, 0, 50),
(83, 'fleuve (gué non vu)', 'fleuve', '', 0, 0, 0, 75, 0, 0, 50),
(84, 'fleuve (étocs)', 'fletocs', '', 20, 0, 10, 70, 0, 0, 50),
(85, 'fleuve (étocs non vus)', 'fleuve', '', 0, 0, 0, 75, 0, 0, 50),
(86, 'lac (étocs non vus)', 'lac', '', 0, 0, 0, 75, 0, 0, 50),
(87, 'mer (récifs non vus)', 'mer', '', 0, 0, 0, 100, 0, 0, 50),
(88, 'océan (brisants non vus)', 'ocean', '', 0, 0, 0, 110, 0, 0, 50),
(89, 'neiges éternelles (2)', 'mntsnowbis', '', 20, 40, 0, 0, 0, 0, 5),
(91, 'forêt mixte (clairsemée)', '', 'shadg', 0, 10, 25, 0, 0, 0, 25),
(92, 'désert rocailleux', 'rock', '', 0, 10, 0, 0, 0, 0, 25),
(93, 'forêt mixte', 'mix', 'shadg', 0, 10, 30, 0, 0, 0, 25),
(94, 'forêt mixte (bis)', 'mixvert', 'shadg', 0, 10, 30, 0, 0, 0, 25),
(95, 'forêt décidue', 'autumn', 'shadg', 0, 10, 30, 0, 0, 0, 25),
(96, 'montagnes (2)', 'montbis', 'shadg', 0, 40, 5, 0, 0, 0, 25),
(97, 'terres cultivées', 'tcult', 'shadg', 0, 0, 15, 0, 0, 0, 25),
(98, 'terres cultivées (riches)', 'tcultrich', 'shadg', 0, 0, 20, 0, 0, 0, 25),
(99, 'terres cultivées (pauvres)', 'tcultpoor', 'shadg', 0, 0, 10, 0, 0, 0, 25),
(100, 'pâquis (2)', 'paquibis', 'shadg', 0, 0, 15, 0, 0, 0, 25),
(101, 'volcan', 'volcan', 'shadg', 0, 40, 0, 0, 0, 0, 25),
(102, 'hautes montagnes (2)', 'hmountbis', 'shadg', 0, 50, 0, 0, 0, 0, 25),
(103, 'puy (1)', 'lonemnt', 'shadg', 0, 30, 5, 0, 0, 0, 25),
(104, 'puy (2)', 'lonemntbis', 'shadg', 0, 38, 5, 0, 0, 0, 25);

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
(2, 'Bob', 'route 66', '_65_66_67_68_71_73_74_72_69_70_90_', 65, 74, 'Harapan', 'Tushpahassapticon');

-- --------------------------------------------------------

--
-- Table structure for table `unitTypes`
--

CREATE TABLE `unitTypes` (
  `id` int(11) NOT NULL,
  `type` varchar(30) COLLATE utf8_bin NOT NULL,
  `typeSing` varchar(30) COLLATE utf8_bin NOT NULL,
  `cat` varchar(3) COLLATE utf8_bin NOT NULL,
  `illu` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `attitude` enum('at','ass','af','d','f') COLLATE utf8_bin NOT NULL DEFAULT 'ass',
  `apts` smallint(6) NOT NULL,
  `hp` int(11) NOT NULL,
  `stature` enum('1','2','3','4','5','6','7','8','9') COLLATE utf8_bin NOT NULL DEFAULT '3',
  `nature` enum('Bâtiment','Mécanique','Vivant','Mort','Magique','Spécial') COLLATE utf8_bin NOT NULL DEFAULT 'Vivant',
  `domaine` enum('Terrestre','Marin','Volant') COLLATE utf8_bin NOT NULL DEFAULT 'Terrestre',
  `categorie` varchar(50) COLLATE utf8_bin NOT NULL COMMENT 'flag_',
  `armure` smallint(6) NOT NULL,
  `esquive` smallint(6) NOT NULL,
  `parade` smallint(6) NOT NULL,
  `coverAdj` smallint(6) NOT NULL,
  `ammo` int(11) NOT NULL,
  `rapidite` smallint(6) NOT NULL,
  `actions` smallint(6) NOT NULL,
  `portee` enum('0','1','2','3','4','5') COLLATE utf8_bin NOT NULL,
  `puissance` smallint(6) NOT NULL,
  `penetration` smallint(6) NOT NULL DEFAULT '100',
  `attaque` smallint(6) NOT NULL,
  `defense` smallint(6) NOT NULL,
  `degatsSurNatures` varchar(60) COLLATE utf8_bin NOT NULL DEFAULT 'Vivant_Mort_Mécanique' COMMENT 'Vivant_MortX2_Mécanique',
  `degatsSurDomaines` enum('Terrestre','Terrestre_Marin','Terrestre_Volant','Terrestre_Marin_Volant','Marin') COLLATE utf8_bin NOT NULL DEFAULT 'Terrestre',
  `combatBoost` json NOT NULL COMMENT '[{"val":1,"prop":"puissance","cat":"orc"}]',
  `endurance` smallint(6) NOT NULL DEFAULT '50',
  `moral` smallint(6) NOT NULL DEFAULT '35',
  `loyaute` smallint(6) NOT NULL DEFAULT '35',
  `move` smallint(6) NOT NULL,
  `moveAdj` smallint(6) NOT NULL,
  `moveType` enum('ter','air','alt','cab','mix','mer') COLLATE utf8_bin NOT NULL,
  `escarpAdj` smallint(6) NOT NULL DEFAULT '100',
  `innondAdj` smallint(6) NOT NULL DEFAULT '100',
  `vegetAdj` smallint(6) NOT NULL DEFAULT '100',
  `cargRes` smallint(6) NOT NULL DEFAULT '0',
  `cargUnits` smallint(6) NOT NULL DEFAULT '0',
  `detection` smallint(6) NOT NULL,
  `discretion` smallint(6) NOT NULL,
  `skills` varchar(500) COLLATE utf8_bin NOT NULL COMMENT 'info_cland_explo_',
  `prod_tempsConst` smallint(6) NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `unitTypes`
--

INSERT INTO `unitTypes` (`id`, `type`, `typeSing`, `cat`, `illu`, `attitude`, `apts`, `hp`, `stature`, `nature`, `domaine`, `categorie`, `armure`, `esquive`, `parade`, `coverAdj`, `ammo`, `rapidite`, `actions`, `portee`, `puissance`, `penetration`, `attaque`, `defense`, `degatsSurNatures`, `degatsSurDomaines`, `combatBoost`, `endurance`, `moral`, `loyaute`, `move`, `moveAdj`, `moveType`, `escarpAdj`, `innondAdj`, `vegetAdj`, `cargRes`, `cargUnits`, `detection`, `discretion`, `skills`, `prod_tempsConst`) VALUES
(1, 'Barbares', 'Barbare', 'sld', NULL, 'ass', 0, 14, '3', 'Vivant', 'Terrestre', '', 20, 8, 8, 150, -1, 40, 3, '0', 6, 100, 15, 10, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 65, 50, 'ter', 100, 100, 100, 0, 0, 65, 45, '', 5),
(2, 'Piquiers', 'Piquier', 'sld', NULL, 'ass', 0, 14, '3', 'Vivant', 'Terrestre', '', 35, 6, 9, 75, -1, 35, 3, '0', 5, 100, 10, 12, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 60, 100, 'ter', 100, 100, 100, 0, 0, 60, 25, 'regu_', 5),
(3, 'Pisteurs', 'Pisteur', 'spy', NULL, 'af', 0, 14, '3', 'Vivant', 'Terrestre', '', 20, 9, 7, 150, -1, 45, 3, '0', 5, 100, 12, 10, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 65, 30, 'ter', 100, 100, 100, 0, 0, 110, 85, 'explo_info_cland_', 5),
(4, 'Forgerons', 'Forgeron', 'wrk', NULL, 'd', 0, 12, '3', 'Vivant', 'Terrestre', '', 10, 5, 5, 50, -1, 30, 3, '0', 6, 100, 5, 6, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 60, 100, 'ter', 100, 100, 100, 0, 0, 60, 25, '', 5),
(5, 'Chamanes', 'Chamane', 'spy', NULL, 'ass', 0, 14, '3', 'Vivant', 'Terrestre', '', 20, 8, 5, 150, -1, 40, 3, '0', 5, 100, 10, 13, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 65, 50, 'ter', 100, 100, 100, 0, 0, 75, 75, '', 5),
(6, 'Eclaireurs', 'Eclaireur', 'spy', NULL, 'af', 0, 11, '3', 'Vivant', 'Terrestre', '', 15, 7, 5, 150, -1, 45, 3, '0', 4, 100, 6, 7, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 70, 30, 'ter', 100, 100, 100, 0, 0, 120, 120, 'explo_info_cland_', 5),
(7, 'Espions', 'Espion', 'spy', NULL, 'd', 0, 11, '3', 'Vivant', 'Terrestre', '', 10, 9, 5, 120, -1, 55, 3, '0', 4, 100, 5, 5, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 70, 50, 'ter', 100, 100, 100, 0, 0, 150, 150, 'spy_', 5),
(8, 'Cartographes', 'Cartographe', 'wrk', NULL, 'f', 0, 10, '3', 'Vivant', 'Terrestre', '', 10, 4, 3, 100, -1, 30, 3, '0', 3, 100, 4, 5, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 65, 50, 'ter', 100, 100, 100, 0, 0, 80, 30, 'carto_', 5),
(9, 'Châteaux', 'Château', 'bld', NULL, 'd', 0, 2000, '3', 'Vivant', 'Terrestre', '', 120, 0, 0, 0, -1, 20, 3, '0', 10, 100, 0, 15, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 0, 100, 'ter', 100, 100, 100, 0, 0, 80, 0, 'regu_', 5),
(10, 'Chasseurs de sorcières', 'Chasseur de sorcières', 'spy', NULL, 'ass', 0, 17, '3', 'Vivant', 'Terrestre', '', 20, 9, 7, 150, -1, 45, 3, '0', 5, 100, 12, 10, 'Vivant_Mort_Mécanique', 'Terrestre', 'null', 50, 35, 35, 65, 30, 'ter', 100, 100, 100, 0, 0, 110, 85, 'explo_info_cland_', 5);

-- --------------------------------------------------------

--
-- Table structure for table `world`
--

CREATE TABLE `world` (
  `id` int(11) NOT NULL,
  `tileName` varchar(24) COLLATE utf8_bin NOT NULL,
  `seed` char(1) COLLATE utf8_bin NOT NULL,
  `flags` varchar(255) COLLATE utf8_bin NOT NULL,
  `terrainId` tinyint(4) NOT NULL,
  `x` int(3) NOT NULL,
  `y` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `world`
--

INSERT INTO `world` (`id`, `tileName`, `seed`, `flags`, `terrainId`, `x`, `y`) VALUES
(1, '', 'a', '', 56, 1, 1),
(2, '', 'a', '', 54, 1, 2),
(3, '', 'b', '', 54, 1, 3),
(4, '', 'a', '', 54, 1, 4),
(5, '', 'c', '', 54, 1, 5),
(6, '', 'a', '', 61, 1, 6),
(7, '', 'b', '', 52, 1, 7),
(8, '', 'b', '', 55, 1, 8),
(9, '', 'c', '', 6, 1, 9),
(10, '', 'b', '', 1, 1, 10),
(11, '', 'c', '', 93, 1, 11),
(12, '', 'b', '', 59, 1, 12),
(13, '', 'a', '', 59, 1, 13),
(14, '', 'b', '', 59, 1, 14),
(15, '', 'c', '', 93, 1, 15),
(16, '', 'b', '', 54, 2, 1),
(17, '', 'c', '', 54, 2, 2),
(18, '', 'c', '', 52, 2, 3),
(19, '', 'a', '', 52, 2, 4),
(20, '', 'a', '', 52, 2, 5),
(21, '', 'c', '', 52, 2, 6),
(22, '', 'c', '', 55, 2, 7),
(23, '', 'b', 'river_river_', 79, 2, 8),
(24, '', 'a', '', 1, 2, 9),
(25, '', 'c', 'river_river_point_point_', 104, 2, 10),
(26, '', 'b', '', 1, 2, 11),
(27, '', 'c', '', 94, 2, 12),
(28, '', 'b', 'road_road_', 93, 2, 13),
(29, '', 'a', 'road_point_point_', 93, 2, 14),
(30, '', 'a', 'road_', 93, 2, 15),
(31, '', 'c', '', 52, 3, 1),
(32, '', 'c', '', 52, 3, 2),
(33, '', 'a', '', 52, 3, 3),
(34, '', 'a', '', 97, 3, 4),
(35, '', 'c', '', 62, 3, 5),
(36, '', 'a', 'navig_', 99, 3, 6),
(37, '', 'a', 'navig_', 97, 3, 7),
(38, '', 'a', 'road_road_', 7, 3, 8),
(39, '', 'b', 'river_road_road_point_point_', 97, 3, 9),
(40, '', 'c', 'river_road_road_point_point_', 1, 3, 10),
(41, '', 'a', 'road_', 1, 3, 11),
(42, '', 'c', 'road_pointer_pointer_', 94, 3, 12),
(43, '', 'b', 'pointer_pointer_', 94, 3, 13),
(44, '', 'c', '', 93, 3, 14),
(45, '', 'b', '', 93, 3, 15),
(46, '', 'a', '', 52, 4, 1),
(47, '', 'a', '', 3, 4, 2),
(48, '', 'a', '', 3, 4, 3),
(49, '', 'b', '', 99, 4, 4),
(50, '', 'b', '', 97, 4, 5),
(51, '', 'a', '', 97, 4, 6),
(52, '', 'b', 'navig_', 98, 4, 7),
(53, '', 'b', '', 100, 4, 8),
(54, '', 'a', '', 94, 4, 9),
(55, 'Chez Willy', 'b', 'road_point_point_', 2, 4, 10),
(56, '', 'c', 'pointer_pointer_river_river_', 94, 4, 11),
(57, '', 'b', 'pointer_pointer_river_river_', 94, 4, 12),
(58, '', 'c', 'point_point_river_river_', 93, 4, 13),
(59, '', 'b', '', 93, 4, 14),
(60, '', 'b', '', 95, 4, 15),
(61, '', 'c', '', 52, 5, 1),
(62, '', 'a', '', 3, 5, 2),
(63, '', 'a', '', 57, 5, 3),
(64, '', 'a', '', 96, 5, 4),
(65, '', 'a', '', 99, 5, 5),
(66, '', 'c', 'point_point_', 4, 5, 6),
(67, '', 'a', '', 79, 5, 7),
(68, '', 'b', '', 2, 5, 8),
(69, '', 'a', '', 94, 5, 9),
(70, 'Croisée des chemins', 'b', 'road_', 94, 5, 10),
(71, '', 'a', '', 94, 5, 11),
(72, '', 'b', '', 58, 5, 12),
(73, '', 'b', 'point_point_', 93, 5, 13),
(74, '', 'c', 'river_river_', 95, 5, 14),
(75, '', 'a', '', 95, 5, 15),
(76, '', 'b', '', 52, 6, 1),
(77, '', 'a', '', 4, 6, 2),
(78, '', 'c', '', 57, 6, 3),
(79, '', 'a', '', 102, 6, 4),
(80, '', 'c', '', 96, 6, 5),
(81, '', 'a', '', 101, 6, 6),
(82, '', 'a', '', 3, 6, 7),
(83, 'Café du coin', 'b', '', 94, 6, 8),
(84, '', 'c', '', 94, 6, 9),
(85, '', 'a', 'road_', 94, 6, 10),
(86, '', 'c', '', 94, 6, 11),
(87, '', 'a', 'point_point_', 94, 6, 12),
(88, '', 'b', '', 58, 6, 13),
(89, '', 'c', 'river_river_', 93, 6, 14),
(90, '', 'b', 'point_point_', 93, 6, 15),
(91, '', 'b', '', 92, 7, 1),
(92, '', 'a', '', 3, 7, 2),
(93, '', 'c', '', 4, 7, 3),
(94, '', 'b', 'point_point_', 4, 7, 4),
(95, '', 'a', '', 4, 7, 5),
(96, '', 'a', 'point_point_', 96, 7, 6),
(97, '', 'c', '', 4, 7, 7),
(98, '', 'a', '', 2, 7, 8),
(99, '', 'c', '', 2, 7, 9),
(100, '', 'a', 'road_', 2, 7, 10),
(101, '', 'a', '', 94, 7, 11),
(102, '', 'a', '', 58, 7, 12),
(103, '', 'b', '', 94, 7, 13),
(104, '', 'b', 'river_river_', 94, 7, 14),
(105, '', 'b', '', 94, 7, 15),
(106, '', 'a', '', 14, 8, 1),
(107, '', 'c', '', 14, 8, 2),
(108, '', 'b', '', 14, 8, 3),
(109, '', 'b', 'road_road_', 92, 8, 4),
(110, '', 'a', 'road_road_', 14, 8, 5),
(111, '', 'a', 'road_road_', 3, 8, 6),
(112, '', 'c', '', 96, 8, 7),
(113, '', 'a', '', 2, 8, 8),
(114, '', 'c', 'road_', 2, 8, 9),
(115, '', 'b', '', 58, 8, 10),
(116, '', 'b', '', 2, 8, 11),
(117, '', 'a', '', 58, 8, 12),
(118, '', 'b', '', 2, 8, 13),
(119, '', 'c', '', 2, 8, 14),
(120, '', 'a', 'river_river_', 94, 8, 15),
(121, '', 'c', 'road_road_', 92, 9, 1),
(122, '', 'b', 'road_road_', 14, 9, 2),
(123, '', 'a', 'road_road_', 92, 9, 3),
(124, '', 'c', '', 14, 9, 4),
(125, '', 'b', '', 3, 9, 5),
(126, '', 'b', 'point_point_', 59, 9, 6),
(127, '', 'a', 'road_road_', 2, 9, 7),
(128, '', 'c', 'road_road_', 2, 9, 8),
(129, '', 'b', '', 58, 9, 9),
(130, '', 'b', '', 58, 9, 10),
(131, '', 'a', '', 2, 9, 11),
(132, '', 'c', '', 2, 9, 12),
(133, '', 'a', '', 2, 9, 13),
(134, '', 'b', '', 2, 9, 14),
(135, '', 'c', 'river_river_', 2, 9, 15);

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
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `terrains`
--
ALTER TABLE `terrains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `name_2` (`name`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;
--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;
--
-- AUTO_INCREMENT for table `terrains`
--
ALTER TABLE `terrains`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;
--
-- AUTO_INCREMENT for table `tracks`
--
ALTER TABLE `tracks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `unitTypes`
--
ALTER TABLE `unitTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `world`
--
ALTER TABLE `world`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
