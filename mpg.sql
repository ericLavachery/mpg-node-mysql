-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mer 21 Novembre 2018 à 14:45
-- Version du serveur :  5.7.24-0ubuntu0.16.04.1
-- Version de PHP :  7.0.32-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mpg`
--

-- --------------------------------------------------------

--
-- Structure de la table `players`
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
  `mapCarto` json DEFAULT NULL,
  `exploredTiles` json DEFAULT NULL,
  `enemies` json DEFAULT NULL,
  `allies` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `players`
--

INSERT INTO `players` (`id`, `pseudo`, `pshort`, `bldView`, `bldIdent`, `unitView`, `unitIdent`, `mapView`, `mapCarto`, `exploredTiles`, `enemies`, `allies`) VALUES
(1, 'Bob', 'Bob', '[]', '[]', '[54, 78, 79, 80, 81, 91, 83, 77, 82, 89, 96]', '[91, 83, 78, 79, 80, 81, 54, 77, 82, 89, 96]', '[56, 41, 26, 42, 43, 28, 58, 72, 70, 87, 102, 101, 74, 89, 73, 54, 55, 69, 71, 84, 85, 86, 57, 88, 103]', '[70, 72, 87]', '[]', '["Zorglub"]', '["Madrigal"]'),
(2, 'Zorglub', 'Zorg', '[]', '[]', '[47, 40, 49, 61, 44, 93]', '[47, 40, 49, 61, 44]', '[58, 73, 74, 88, 104, 116, 86, 85, 57, 59, 72, 87, 89, 100, 101, 102, 117, 130, 131, 132, 103, 115]', '[73, 116, 88]', '[]', '["Bob"]', '[]'),
(3, 'Morpheus', 'Mrph', '[]', '[]', '[66, 11, 49, 50, 90]', '[66, 49, 50]', '[]', '[]', '[88]', '[]', '[]'),
(4, 'Madrigal', 'Madr', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '["Zorglub"]', '["Bob"]');

-- --------------------------------------------------------

--
-- Structure de la table `pop`
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
  `armure` smallint(6) DEFAULT NULL,
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
  `fatigue` smallint(6) NOT NULL,
  `tileId` int(11) NOT NULL,
  `coverAdj` smallint(6) NOT NULL,
  `follow` int(11) DEFAULT NULL,
  `detection` smallint(6) NOT NULL,
  `discretion` smallint(6) NOT NULL,
  `skills` varchar(500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `pop`
--

INSERT INTO `pop` (`id`, `player`, `type`, `icon`, `cat`, `number`, `pic`, `x`, `y`, `hp`, `armure`, `esquive`, `parade`, `ammo`, `rapidite`, `actions`, `puissance`, `attaque`, `defense`, `move`, `moveAdj`, `fatigue`, `tileId`, `coverAdj`, `follow`, `detection`, `discretion`, `skills`) VALUES
(5, 'Zorglub', 'Chamane', 'spy', 'spy', 1, 'demon.png', 3, 15, 190, 20, 6, 8, -1, 40, 1, 6, 15, 20, 45, 150, 0, 74, 75, NULL, 85, 70, ''),
(11, 'Zorglub', 'Barbares', 'sld', 'sld', 48, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 88, 150, NULL, 65, 45, ''),
(31, 'Bob', 'Piquiers', 'sld', 'sld', 126, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 72, 100, 2, 65, 35, 'regular_'),
(38, 'Bob', 'Château', 'bld', 'bld', 1, 'dragon.png', 6, 1, 2000, 120, 0, 0, 100, 40, 1, 8, 0, 20, 0, 100, 0, 41, 0, NULL, 0, 0, 'regular_'),
(40, 'Bob', 'Piquiers', 'sld', 'sld', 3, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 73, 100, NULL, 65, 35, 'regular_'),
(41, 'Bob', 'Piquiers', 'sld', 'sld', 8, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 26, 100, 4, 65, 35, 'regular_'),
(42, 'Bob', 'Piquiers', 'sld', 'sld', 13, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 43, 100, NULL, 65, 35, 'regular_'),
(44, 'Bob', 'Piquiers', 'sld', 'sld', 14, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 74, 100, NULL, 65, 35, 'regular_'),
(45, 'Bob', 'Espion', 'spy', 'spy', 1, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 42, 150, 3, 100, 120, 'spy_'),
(47, 'Bob', 'Piquiers', 'sld', 'sld', 12, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 73, 100, 5, 65, 35, 'regular_'),
(48, 'Bob', 'Forgeron', 'wrk', 'wrk', 1, 'dragon.png', 6, 1, 18, 20, 6, 8, 100, 40, 1, 3, 3, 6, 60, 100, 0, 26, 100, 4, 65, 35, ''),
(50, 'Bob', 'Piquiers', 'sld', 'sld', 13, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 89, 100, NULL, 65, 35, 'regular_'),
(51, 'Bob', 'Espion', 'spy', 'spy', 2, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 73, 150, 5, 100, 120, 'spy_'),
(52, 'Bob', 'Eclaireurs', 'spy', 'spy', 6, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 43, 150, 6, 100, 120, 'undercover_explo_informer_'),
(53, 'Zorglub', 'Barbares', 'sld', 'sld', 13, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 58, 150, NULL, 65, 45, ''),
(54, 'Zorglub', 'Pisteur', 'spy', 'spy', 61, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 3, 14, 12, 100, 25, 0, 73, 150, 1, 110, 75, 'undercover_explo_informer_'),
(55, 'Zorglub', 'Barbares', 'sld', 'sld', 127, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 116, 150, 2, 65, 45, ''),
(56, 'Bob', 'Espion', 'spy', 'spy', 2, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 43, 150, 6, 100, 120, 'spy_'),
(58, 'Zorglub', 'Barbares', 'sld', 'sld', 3, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 85, 150, NULL, 65, 45, ''),
(59, 'Zorglub', 'Barbares', 'sld', 'sld', 1, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 86, 150, NULL, 65, 45, ''),
(60, 'Bob', 'Piquiers', 'sld', 'sld', 2, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 42, 100, 3, 65, 35, 'regular_'),
(61, 'Bob', 'Piquiers', 'sld', 'sld', 10, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 58, 100, NULL, 65, 35, 'regular_'),
(62, 'Bob', 'Piquiers', 'sld', 'sld', 8, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 56, 100, NULL, 65, 35, 'regular_'),
(63, 'Zorglub', 'Barbares', 'sld', 'sld', 7, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 104, 150, NULL, 65, 45, ''),
(64, 'Zorglub', 'Barbares', 'sld', 'sld', 30, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 116, 150, 2, 65, 45, ''),
(65, 'Bob', 'Eclaireurs', 'spy', 'spy', 5, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 70, 150, NULL, 100, 120, 'undercover_explo_informer_'),
(66, 'Bob', 'Piquiers', 'sld', 'sld', 36, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 256, 87, 100, NULL, 65, 35, 'regular_'),
(67, 'Bob', 'Piquiers', 'sld', 'sld', 18, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 101, 100, NULL, 65, 35, 'regular_'),
(68, 'Bob', 'Piquiers', 'sld', 'sld', 60, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 72, 100, 2, 65, 35, 'regular_'),
(75, 'Bob', 'Espion', 'spy', 'spy', 2, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 87, 150, NULL, 100, 120, 'spy_'),
(76, 'Bob', 'Espion', 'spy', 'spy', 1, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 28, 150, NULL, 100, 120, 'spy_'),
(77, 'Zorglub', 'Barbares', 'sld', 'sld', 8, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 74, 150, NULL, 65, 45, ''),
(78, 'Zorglub', 'Barbares', 'sld', 'sld', 10, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 73, 150, 1, 65, 45, ''),
(79, 'Zorglub', 'Barbares', 'sld', 'sld', 13, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 73, 150, 1, 65, 45, ''),
(80, 'Zorglub', 'Barbares', 'sld', 'sld', 42, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 73, 150, 1, 65, 45, ''),
(81, 'Zorglub', 'Barbares', 'sld', 'sld', 23, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 73, 150, 1, 65, 45, ''),
(82, 'Zorglub', 'Barbares', 'sld', 'sld', 2, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 4, 15, 7, 90, 100, 0, 73, 150, NULL, 65, 45, ''),
(83, 'Zorglub', 'Pisteur', 'spy', 'spy', 12, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 3, 14, 12, 100, 25, 0, 73, 150, NULL, 110, 75, 'undercover_explo_informer_'),
(89, 'Zorglub', 'Pisteur', 'spy', 'spy', 17, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 3, 14, 12, 100, 25, 0, 73, 150, 1, 110, 75, 'undercover_explo_informer_'),
(90, 'Zorglub', 'Pisteur', 'spy', 'spy', 48, 'demon.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 3, 14, 12, 100, 25, 0, 88, 150, NULL, 110, 75, 'undercover_explo_informer_'),
(91, 'Morpheus', 'Piquiers', 'sld', 'sld', 7, 'minotaur.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 58, 100, NULL, 65, 35, 'regular_'),
(92, 'Morpheus', 'Espion', 'spy', 'spy', 2, 'minotaur.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 43, 150, 6, 100, 120, 'spy_'),
(93, 'Morpheus', 'Pisteur', 'spy', 'spy', 150, 'minotaur.png', 3, 15, 35, 20, 6, 8, -1, 40, 1, 3, 14, 12, 100, 25, 106, 88, 150, NULL, 110, 75, 'undercover_explo_informer_'),
(94, 'Bob', 'Piquiers', 'sld', 'sld', 6, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 102, 100, NULL, 65, 35, 'regular_'),
(95, 'Bob', 'Piquiers', 'sld', 'sld', 5, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 70, 100, NULL, 65, 35, 'regular_'),
(96, 'Morpheus', 'Piquiers', 'sld', 'sld', 3, 'minotaur.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 42, 73, 100, NULL, 65, 35, 'regular_'),
(97, 'Bob', 'Eclaireurs', 'spy', 'spy', 5, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 10, 7, 70, 25, 0, 72, 150, NULL, 100, 120, 'undercover_explo_informer_'),
(98, 'Bob', 'Piquiers', 'sld', 'sld', 8, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 41, 100, NULL, 65, 35, 'regular_'),
(99, 'Bob', 'Piquiers', 'sld', 'sld', 1, 'dragon.png', 6, 1, 20, 20, 6, 8, 100, 40, 1, 3, 12, 12, 70, 50, 0, 70, 100, NULL, 65, 35, 'regular_'),
(100, 'Bob', 'Cartographe', 'wrk', 'wrk', 1, 'dragon.png', 6, 1, 18, 20, 6, 8, 100, 40, 1, 3, 3, 6, 60, 100, 0, 26, 100, 4, 65, 35, 'carto_');

-- --------------------------------------------------------

--
-- Structure de la table `terrains`
--

CREATE TABLE `terrains` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `moveCost` tinyint(4) NOT NULL,
  `cover` tinyint(4) NOT NULL,
  `defense` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `terrains`
--

INSERT INTO `terrains` (`id`, `name`, `moveCost`, `cover`, `defense`) VALUES
(1, 'plains', 30, 0, 0),
(2, 'forest', 45, 50, 15),
(3, 'hills', 50, 20, 30),
(4, 'mountains', 100, 40, 60),
(5, 'swamp', 85, 0, 30);

-- --------------------------------------------------------

--
-- Structure de la table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `world`
--

CREATE TABLE `world` (
  `id` int(11) NOT NULL,
  `terrain` varchar(24) COLLATE utf8_bin NOT NULL,
  `terrainId` tinyint(4) NOT NULL,
  `x` int(3) NOT NULL,
  `y` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `world`
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
-- Index pour les tables exportées
--

--
-- Index pour la table `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pseudo` (`pseudo`),
  ADD UNIQUE KEY `pshort` (`pshort`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `pop`
--
ALTER TABLE `pop`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `terrains`
--
ALTER TABLE `terrains`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Index pour la table `world`
--
ALTER TABLE `world`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `pop`
--
ALTER TABLE `pop`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT pour la table `terrains`
--
ALTER TABLE `terrains`
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `world`
--
ALTER TABLE `world`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
