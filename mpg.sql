-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Mar 27 Novembre 2018 à 15:23
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
-- Contenu de la table `players`
--

INSERT INTO `players` (`id`, `pseudo`, `pshort`, `pic`, `bldView`, `bldIdent`, `unitView`, `unitIdent`, `mapView`, `mapCarto`, `exploredTiles`, `enemies`, `allies`) VALUES
(1, 'Bob', 'Bob', 'dragon.png', '[]', '[]', '[54, 78, 79, 80, 81, 91, 83, 77, 82, 89, 96, 53]', '[91, 83, 78, 79, 80, 81, 54, 77, 82, 89, 96, 53]', '[56, 41, 42, 43, 28, 58, 72, 70, 87, 102, 101, 74, 89, 73, 86, 55, 11, 39, 54, 40, 26, 44, 57, 38, 69, 9, 66, 52, 51, 65, 67, 82, 59, 35, 36, 84, 98, 88, 71, 81, 53, 50, 25, 68, 80, 37, 23, 24, 103, 22, 27]', '[55, 39, 58, 54, 38, 66, 51]', '[]', '["Zorglub"]', '["Madrigal"]'),
(2, 'Zorglub', 'Zorg', 'demon.png', '[]', '[]', '[47, 40, 49, 61, 44, 93]', '[47, 40, 49, 61, 44]', '[58, 73, 74, 88, 104, 116, 86, 85, 57, 59, 72, 87, 89, 100, 101, 102, 117, 130, 131, 132, 103, 115]', '[73, 116, 88]', '[]', '["Bob"]', '[]'),
(3, 'Morpheus', 'Mrph', 'triton.png', '[]', '[]', '[66, 11, 49, 50, 90]', '[66, 49, 50]', '[]', '[]', '[88]', '[]', '[]'),
(4, 'Madrigal', 'Madr', 'minotaur.png', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '["Zorglub"]', '["Bob"]');

-- --------------------------------------------------------

--
-- Structure de la table `pop`
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
  `follow` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `pop`
--

INSERT INTO `pop` (`id`, `player`, `type`, `typeId`, `number`, `x`, `y`, `blessures`, `move`, `fatigue`, `tileId`, `prevTileId`, `follow`) VALUES
(5, 'Zorglub', 'Chamane', 5, 1, 3, 15, 0, 65, 0, 74, 74, NULL),
(11, 'Zorglub', 'Barbares', 1, 48, 3, 15, 0, 65, 0, 88, 88, NULL),
(31, 'Bob', 'Piquiers', 2, 126, 6, 1, 0, 60, 0, 72, 72, 2),
(38, 'Bob', 'Château', 9, 1, 6, 1, 0, 0, 0, 41, 41, NULL),
(41, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 41, 41, NULL),
(42, 'Bob', 'Piquiers', 2, 13, 6, 1, 0, 60, 0, 43, 43, NULL),
(44, 'Bob', 'Piquiers', 2, 14, 6, 1, 0, 60, 0, 74, 74, NULL),
(45, 'Bob', 'Espion', 7, 1, 6, 1, 0, 70, 0, 42, 42, 3),
(47, 'Bob', 'Piquiers', 2, 15, 6, 1, 0, 60, 0, 73, 73, NULL),
(48, 'Bob', 'Forgeron', 4, 1, 6, 1, 0, 60, 0, 41, 41, NULL),
(50, 'Bob', 'Piquiers', 2, 13, 6, 1, 0, 60, 0, 89, 89, NULL),
(51, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 73, 73, NULL),
(52, 'Bob', 'Eclaireurs', 6, 6, 6, 1, 0, 70, 0, 43, 43, 6),
(53, 'Zorglub', 'Barbares', 1, 13, 3, 15, 0, 65, 0, 58, 58, NULL),
(54, 'Zorglub', 'Pisteur', 3, 61, 3, 15, 0, 65, 0, 73, 73, 1),
(55, 'Zorglub', 'Barbares', 1, 127, 3, 15, 0, 65, 0, 116, 116, 2),
(56, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 43, 43, 6),
(58, 'Zorglub', 'Barbares', 1, 3, 3, 15, 0, 65, 0, 85, 85, NULL),
(59, 'Zorglub', 'Barbares', 1, 1, 3, 15, 0, 65, 0, 86, 86, NULL),
(60, 'Bob', 'Piquiers', 2, 2, 6, 1, 0, 60, 0, 42, 42, 3),
(61, 'Bob', 'Piquiers', 2, 10, 6, 1, 0, 60, 0, 72, 72, NULL),
(62, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 56, 56, NULL),
(63, 'Zorglub', 'Barbares', 1, 7, 3, 15, 0, 65, 0, 104, 104, NULL),
(64, 'Zorglub', 'Barbares', 1, 30, 3, 15, 0, 65, 0, 116, 116, 2),
(65, 'Bob', 'Eclaireurs', 6, 5, 6, 1, 0, 70, 0, 70, 70, NULL),
(66, 'Bob', 'Piquiers', 2, 36, 6, 1, 0, 60, 0, 86, 86, NULL),
(67, 'Bob', 'Piquiers', 2, 18, 6, 1, 0, 60, 0, 101, 101, NULL),
(68, 'Bob', 'Piquiers', 2, 60, 6, 1, 0, 60, 0, 72, 72, 2),
(75, 'Bob', 'Espion', 7, 2, 6, 1, 0, 70, 0, 88, 87, NULL),
(76, 'Bob', 'Espion', 7, 1, 6, 1, 0, 70, 0, 28, 28, NULL),
(77, 'Zorglub', 'Barbares', 1, 8, 3, 15, 0, 65, 0, 74, 74, NULL),
(78, 'Zorglub', 'Barbares', 1, 10, 3, 15, 0, 65, 0, 73, 73, 1),
(79, 'Zorglub', 'Barbares', 1, 13, 3, 15, 0, 65, 0, 73, 73, 1),
(80, 'Zorglub', 'Barbares', 1, 42, 3, 15, 0, 65, 0, 73, 73, 1),
(81, 'Zorglub', 'Barbares', 1, 23, 3, 15, 0, 65, 0, 73, 73, 1),
(82, 'Zorglub', 'Barbares', 1, 2, 3, 15, 0, 65, 0, 73, 73, NULL),
(83, 'Zorglub', 'Pisteur', 3, 12, 3, 15, 0, 65, 0, 73, 73, NULL),
(89, 'Zorglub', 'Pisteur', 3, 17, 3, 15, 0, 65, 0, 73, 73, 1),
(90, 'Zorglub', 'Pisteur', 3, 48, 3, 15, 0, 65, 0, 88, 88, NULL),
(91, 'Morpheus', 'Piquiers', 2, 7, 6, 1, 0, 60, 0, 58, 58, NULL),
(92, 'Morpheus', 'Espion', 7, 2, 6, 1, 0, 70, 0, 43, 43, 6),
(93, 'Morpheus', 'Pisteur', 3, 150, 3, 15, 0, 65, 106, 88, 88, NULL),
(94, 'Bob', 'Piquiers', 2, 6, 6, 1, 0, 60, 2, 87, 102, NULL),
(95, 'Bob', 'Piquiers', 2, 5, 6, 1, 0, 60, 0, 98, 70, NULL),
(96, 'Morpheus', 'Piquiers', 2, 3, 6, 1, 0, 60, 42, 73, 73, NULL),
(97, 'Bob', 'Eclaireurs', 6, 5, 6, 1, 0, 70, 0, 58, 58, NULL),
(98, 'Bob', 'Piquiers', 2, 8, 6, 1, 0, 60, 0, 9, 41, NULL),
(99, 'Bob', 'Piquiers', 2, 1, 6, 1, 0, 60, 0, 41, 41, NULL),
(100, 'Bob', 'Cartographe', 8, 4, 6, 1, 0, 65, 0, 51, 39, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `terrains`
--

CREATE TABLE `terrains` (
  `id` tinyint(4) NOT NULL,
  `name` varchar(20) COLLATE utf8_bin NOT NULL,
  `icon` varchar(20) COLLATE utf8_bin NOT NULL,
  `color` char(7) COLLATE utf8_bin NOT NULL DEFAULT '#c8b678',
  `moveCostAdj` tinyint(4) NOT NULL,
  `moveCostCab` smallint(6) NOT NULL,
  `moveCostMix` smallint(6) NOT NULL,
  `moveCostMer` smallint(6) NOT NULL,
  `escarpement` tinyint(4) NOT NULL,
  `vegetation` tinyint(4) NOT NULL,
  `innondation` tinyint(4) NOT NULL,
  `humidite` tinyint(4) NOT NULL,
  `tempMin` tinyint(4) NOT NULL,
  `tempMax` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `terrains`
--

INSERT INTO `terrains` (`id`, `name`, `icon`, `color`, `moveCostAdj`, `moveCostCab`, `moveCostMix`, `moveCostMer`, `escarpement`, `vegetation`, `innondation`, `humidite`, `tempMin`, `tempMax`) VALUES
(1, 'plaine', '', '#c8b678', 0, 0, 0, 0, 0, 5, 0, 0, 0, 0),
(2, 'forêt mixte', '', '#1d6b1b', 0, 0, 0, 0, 10, 35, 0, 0, 0, 0),
(3, 'collines arides', '', '#a88051', 0, 0, 0, 0, 25, 5, 0, 0, 0, 0),
(4, 'montagnes', '', '#71491a', 0, 0, 0, 0, 40, 10, 0, 0, 0, 0),
(5, 'marécages', '', '#679172', 0, 0, 0, 0, 0, 10, 35, 0, 0, 0),
(6, 'prairie', '', '#c8b678', 0, 0, 0, 0, 0, 10, 0, 0, 0, 0),
(7, 'pâturages', '', '#c8b678', 0, 0, 0, 0, 0, 15, 0, 0, 0, 0),
(8, 'steppe', '', '#c8b678', 0, 0, 0, 0, 10, 5, 0, 0, 0, 0),
(9, 'tundra', '', '#c8b678', 0, 0, 0, 0, 10, 5, 0, 0, 0, 0),
(10, 'pampa', '', '#c8b678', 0, 0, 0, 0, 10, 5, 0, 0, 0, 0),
(11, 'veld', '', '#c8b678', 0, 0, 0, 0, 0, 10, 0, 0, 0, 0),
(12, 'savane', '', '#c8b678', 0, 0, 0, 0, 0, 10, 0, 0, 0, 0),
(13, 'banquise', '', '#c8b678', 20, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(14, 'désert polaire', '', '#c8b678', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(15, 'désert de sable', '', '#c8b678', 25, 0, 0, 0, 15, 0, 0, 0, 0, 0),
(26, 'oasis', '', '#c8b678', 25, 0, 0, 0, 0, 25, 0, 0, 0, 0),
(27, 'haut plateau', '', '#c8b678', 0, 0, 0, 0, 10, 10, 0, 0, 0, 0),
(28, 'fagne', '', '#c8b678', 0, 0, 0, 0, 0, 20, 25, 0, 0, 0),
(29, 'pantanal', '', '#c8b678', 0, 0, 0, 0, 0, 5, 50, 0, 0, 0),
(30, 'pré-salé', '', '#c8b678', 0, 0, 0, 0, 0, 10, 40, 0, 0, 0),
(31, 'tourbière', '', '#c8b678', 0, 0, 0, 0, 0, 20, 35, 0, 0, 0),
(32, 'palud', '', '#c8b678', 0, 0, 0, 0, 0, 30, 40, 0, 0, 0),
(33, 'bayou', '', '#c8b678', 0, 0, 0, 0, 0, 30, 50, 0, 0, 0),
(34, 'mangrove', '', '#c8b678', 0, 0, 0, 0, 0, 40, 50, 0, 0, 0),
(35, 'futaie', '', '#c8b678', 0, 0, 0, 0, 10, 30, 0, 0, 0, 0),
(36, 'pinède', '', '#c8b678', 0, 0, 0, 0, 10, 30, 0, 0, 0, 0),
(37, 'taïga', '', '#c8b678', 0, 0, 0, 0, 15, 35, 0, 0, 0, 0),
(38, 'forêt sèche', '', '#c8b678', 0, 0, 0, 0, 10, 35, 0, 0, 0, 0),
(39, 'jungle', '', '#c8b678', 0, 0, 0, 0, 10, 50, 0, 0, 0, 0),
(40, 'laurisylve', '', '#0e451d', 0, 0, 0, 0, 30, 35, 0, 0, 0, 0),
(41, 'forêt de nuages', '', '#c8b678', 0, 0, 0, 0, 30, 50, 0, 0, 0, 0),
(42, 'inlandsis', '', '#c0d9d7', 20, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(43, 'lande', '', '#c8b678', 0, 0, 0, 0, 10, 20, 0, 0, 0, 0),
(44, 'bush', '', '#c8b678', 0, 0, 0, 0, 10, 20, 0, 0, 0, 0),
(45, 'garrigue', '', '#c8b678', 0, 0, 0, 0, 10, 20, 0, 0, 0, 0),
(46, 'brousse', '', '#c8b678', 0, 0, 0, 0, 15, 20, 0, 0, 0, 0),
(47, 'maquis', '', '#c8b678', 0, 0, 0, 0, 20, 20, 0, 0, 0, 0),
(48, 'chaparral', '', '#c8b678', 0, 0, 0, 0, 20, 20, 0, 0, 0, 0),
(49, 'miombo', '', '#c8b678', 0, 0, 0, 0, 20, 25, 0, 0, 0, 0),
(50, 'caatinga', '', '#c8b678', 0, 0, 0, 0, 20, 30, 0, 0, 0, 0),
(51, 'piémont', '', '#c8b678', 0, 0, 0, 0, 25, 15, 0, 0, 0, 0),
(52, 'mer', '', '#c8b678', 0, 0, 0, 0, 0, 0, 100, 0, 0, 0),
(53, 'lac', '', '#91c4c9', 0, 0, 0, 0, 0, 0, 100, 0, 0, 0),
(54, 'océan', '', '#c8b678', 0, 0, 0, 0, 0, 0, 100, 0, 0, 0),
(55, 'récifs', '', '#7c93a7', 0, 0, 0, 0, 0, 10, 80, 0, 0, 0),
(56, 'abysses', '', '#c8b678', 0, 0, 0, 0, 0, 0, 100, 0, 0, 0),
(57, 'neiges éternelles', '', '#442b0e', 0, 0, 0, 0, 50, 0, 0, 0, 0, 0),
(58, 'collines boisées', '', '#c8b678', 0, 0, 0, 0, 25, 30, 0, 0, 0, 0),
(59, 'collines vertes', '', '#c8b678', 0, 0, 0, 0, 25, 10, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `unitTypes`
--

CREATE TABLE `unitTypes` (
  `id` int(11) NOT NULL,
  `type` varchar(20) COLLATE utf8_bin NOT NULL,
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
-- Contenu de la table `unitTypes`
--

INSERT INTO `unitTypes` (`id`, `type`, `icon`, `cat`, `illu`, `hp`, `armure`, `esquive`, `parade`, `ammo`, `rapidite`, `actions`, `puissance`, `attaque`, `defense`, `move`, `moveAdj`, `moveType`, `escarpAdj`, `innondAdj`, `vegetAdj`, `coverAdj`, `detection`, `discretion`, `skills`) VALUES
(1, 'Barbares', 'sld', 'sld', NULL, 10, 20, 8, 8, -1, 40, 3, 6, 15, 10, 65, 50, 'ter', 100, 100, 100, 150, 65, 45, ''),
(2, 'Piquiers', 'sld', 'sld', NULL, 10, 35, 6, 9, -1, 35, 3, 5, 10, 12, 60, 100, 'ter', 100, 100, 100, 75, 60, 25, 'pole_regular_'),
(3, 'Pisteurs', 'spy', 'spy', NULL, 10, 20, 9, 7, -1, 45, 3, 5, 12, 10, 65, 30, 'ter', 100, 100, 100, 150, 110, 85, 'undercover_explo_informer_'),
(4, 'Forgeron', 'wrk', 'wrk', NULL, 10, 10, 5, 5, -1, 30, 3, 6, 5, 6, 60, 100, 'ter', 100, 100, 100, 50, 60, 25, ''),
(5, 'Chamane', 'spy', 'spy', NULL, 10, 20, 8, 5, -1, 40, 3, 5, 10, 13, 65, 50, 'ter', 100, 100, 100, 150, 75, 75, ''),
(6, 'Eclaireurs', 'spy', 'spy', NULL, 8, 15, 7, 5, -1, 45, 3, 4, 6, 7, 70, 30, 'ter', 100, 100, 100, 150, 120, 120, 'undercover_explo_informer_'),
(7, 'Espion', 'spy', 'spy', NULL, 8, 10, 9, 5, -1, 55, 3, 4, 5, 5, 70, 50, 'ter', 100, 100, 100, 120, 150, 150, 'spy_'),
(8, 'Cartographe', 'wrk', 'wrk', NULL, 8, 10, 4, 3, -1, 30, 3, 3, 4, 5, 65, 50, 'ter', 100, 100, 100, 100, 80, 30, 'carto_'),
(9, 'Château', 'bld', 'bld', NULL, 2000, 120, 0, 0, -1, 20, 3, 10, 0, 15, 0, 100, 'ter', 100, 100, 100, 0, 80, 0, 'regular_');

-- --------------------------------------------------------

--
-- Structure de la table `world`
--

CREATE TABLE `world` (
  `id` int(11) NOT NULL,
  `terrain` varchar(24) COLLATE utf8_bin NOT NULL,
  `flags` varchar(255) COLLATE utf8_bin NOT NULL,
  `terrainId` tinyint(4) NOT NULL,
  `x` int(3) NOT NULL,
  `y` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Contenu de la table `world`
--

INSERT INTO `world` (`id`, `terrain`, `flags`, `terrainId`, `x`, `y`) VALUES
(1, 'plains', '', 1, 1, 1),
(2, 'forest', '', 2, 1, 2),
(3, 'forest', '', 2, 1, 3),
(4, 'hills', '', 3, 1, 4),
(5, 'forest', '', 2, 1, 5),
(6, 'plains', '', 1, 1, 6),
(7, 'plains', '', 1, 1, 7),
(8, 'forest', '', 2, 1, 8),
(9, 'mountains', '', 4, 1, 9),
(10, 'mountains', '', 4, 1, 10),
(11, 'hills', 'road_', 3, 1, 11),
(12, 'plains', '', 1, 1, 12),
(13, 'hills', '', 3, 1, 13),
(14, 'forest', '', 2, 1, 14),
(15, 'forest', '', 2, 1, 15),
(16, 'plains', '', 1, 2, 1),
(17, 'plains', '', 1, 2, 2),
(18, 'forest', '', 2, 2, 3),
(19, 'forest', '', 2, 2, 4),
(20, 'forest', '', 2, 2, 5),
(21, 'plains', '', 1, 2, 6),
(22, 'forest', '', 2, 2, 7),
(23, 'forest', '', 2, 2, 8),
(24, 'hills', '', 3, 2, 9),
(25, 'mountains', '', 4, 2, 10),
(26, 'plains', 'road_river_', 1, 2, 11),
(27, 'plains', 'river_', 1, 2, 12),
(28, 'mountains', 'river_', 4, 2, 13),
(29, 'hills', '', 3, 2, 14),
(30, 'forest', '', 2, 2, 15),
(31, 'plains', '', 1, 3, 1),
(32, 'forest', '', 2, 3, 2),
(33, 'hills', '', 3, 3, 3),
(34, 'forest', '', 2, 3, 4),
(35, 'mountains', '', 4, 3, 5),
(36, 'lac', 'navig_', 53, 3, 6),
(37, 'lac', 'navig_', 53, 3, 7),
(38, 'plains', 'river_', 1, 3, 8),
(39, 'plains', 'river_', 1, 3, 9),
(40, 'forest', 'river_', 2, 3, 10),
(41, 'plains', 'road_river_', 1, 3, 11),
(42, 'forest', '', 2, 3, 12),
(43, 'forest', '', 2, 3, 13),
(44, 'forest', '', 2, 3, 14),
(45, 'hills', '', 3, 3, 15),
(46, 'hills', '', 3, 4, 1),
(47, 'hills', '', 3, 4, 2),
(48, 'mountains', '', 4, 4, 3),
(49, 'swamp', '', 5, 4, 4),
(50, 'swamp', '', 5, 4, 5),
(51, 'swamp', '', 5, 4, 6),
(52, 'récifs', 'navig_', 55, 4, 7),
(53, 'plains', '', 1, 4, 8),
(54, 'plains', '', 1, 4, 9),
(55, 'plains', 'road_', 1, 4, 10),
(56, 'forest', '', 2, 4, 11),
(57, 'forest', '', 2, 4, 12),
(58, 'forest', '', 2, 4, 13),
(59, 'hills', '', 3, 4, 14),
(60, 'hills', '', 3, 4, 15),
(61, 'hills', '', 3, 5, 1),
(62, 'hills', '', 3, 5, 2),
(63, 'mountains', '', 4, 5, 3),
(64, 'mountains', '', 4, 5, 4),
(65, 'swamp', '', 5, 5, 5),
(66, 'swamp', '', 5, 5, 6),
(67, 'plains', '', 1, 5, 7),
(68, 'plains', '', 1, 5, 8),
(69, 'plains', '', 1, 5, 9),
(70, 'plains', 'road_', 1, 5, 10),
(71, 'plains', '', 1, 5, 11),
(72, 'plains', '', 1, 5, 12),
(73, 'forest', '', 2, 5, 13),
(74, 'forest', '', 2, 5, 14),
(75, 'hills', '', 3, 5, 15),
(76, 'hills', '', 3, 6, 1),
(77, 'mountains', '', 4, 6, 2),
(78, 'mountains', '', 4, 6, 3),
(79, 'mountains', '', 4, 6, 4),
(80, 'mountains', '', 4, 6, 5),
(81, 'swamp', '', 5, 6, 6),
(82, 'swamp', '', 5, 6, 7),
(83, 'plains', '', 1, 6, 8),
(84, 'plains', '', 1, 6, 9),
(85, 'plains', 'road_', 1, 6, 10),
(86, 'plains', '', 1, 6, 11),
(87, 'laurisylve', '', 40, 6, 12),
(88, 'forest', '', 2, 6, 13),
(89, 'forest', '', 2, 6, 14),
(90, 'forest', '', 2, 6, 15),
(91, 'hills', '', 3, 7, 1),
(92, 'hills', '', 3, 7, 2),
(93, 'hills', '', 3, 7, 3),
(94, 'mountains', '', 4, 7, 4),
(95, 'hills', '', 3, 7, 5),
(96, 'swamp', '', 5, 7, 6),
(97, 'forest', '', 2, 7, 7),
(98, 'plains', '', 1, 7, 8),
(99, 'plains', '', 1, 7, 9),
(100, 'plains', 'road_', 1, 7, 10),
(101, 'forest', '', 2, 7, 11),
(102, 'plains', '', 1, 7, 12),
(103, 'forest', '', 2, 7, 13),
(104, 'forest', '', 2, 7, 14),
(105, 'plains', '', 1, 7, 15),
(106, 'plains', '', 1, 8, 1),
(107, 'plains', '', 1, 8, 2),
(108, 'hills', '', 3, 8, 3),
(109, 'hills', '', 3, 8, 4),
(110, 'plains', '', 1, 8, 5),
(111, 'plains', '', 1, 8, 6),
(112, 'swamp', '', 5, 8, 7),
(113, 'plains', '', 1, 8, 8),
(114, 'plains', 'road_', 1, 8, 9),
(115, 'forest', '', 2, 8, 10),
(116, 'forest', '', 2, 8, 11),
(117, 'plains', '', 1, 8, 12),
(118, 'plains', '', 1, 8, 13),
(119, 'forest', '', 2, 8, 14),
(120, 'plains', '', 1, 8, 15),
(121, 'plains', '', 1, 9, 1),
(122, 'plains', '', 1, 9, 2),
(123, 'plains', '', 1, 9, 3),
(124, 'plains', '', 1, 9, 4),
(125, 'plains', '', 1, 9, 5),
(126, 'plains', '', 1, 9, 6),
(127, 'plains', '', 1, 9, 7),
(128, 'plains', '', 1, 9, 8),
(129, 'hills', '', 3, 9, 9),
(130, 'hills', '', 3, 9, 10),
(131, 'plains', '', 1, 9, 11),
(132, 'plains', '', 1, 9, 12),
(133, 'plains', '', 1, 9, 13),
(134, 'plains', '', 1, 9, 14),
(135, 'plains', '', 1, 9, 15);

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
-- Index pour la table `unitTypes`
--
ALTER TABLE `unitTypes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`),
  ADD UNIQUE KEY `type` (`type`);

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
  MODIFY `id` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;
--
-- AUTO_INCREMENT pour la table `unitTypes`
--
ALTER TABLE `unitTypes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT pour la table `world`
--
ALTER TABLE `world`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
