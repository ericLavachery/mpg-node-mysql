-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 23, 2019 at 08:46 PM
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
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(8) COLLATE utf8_bin NOT NULL,
  `expl` varchar(40) COLLATE utf8_bin NOT NULL,
  `ordre` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `expl`, `ordre`) VALUES
(1, 'civil', '', 1),
(2, 'soldat', '', 2),
(3, 'mage', '', 10),
(4, 'relig', 'Religieux', 11),
(5, 'cult', 'Cultiste', 12),
(6, 'chef', '', 0),
(7, 'hll', 'Hors-la-loi', 19),
(8, 'brig', 'Brigands', 20),
(9, 'salt', 'Saltimbanque', 21),
(10, 'spy', 'Espion', 0),
(11, 'milice', '', 0),
(12, 'pv', 'Peau verte', 0),
(13, 'orc', '', 0),
(14, 'gob', '', 0),
(15, 'gnome', '', 0),
(16, 'kob', '', 0),
(17, 'nain', '', 0),
(18, 'elfe', '', 0),
(19, 'saur', '', 0),
(20, 'animal', '', 0),
(21, 'monstre', '', 0),
(22, 'barbare', '', 0),
(23, 'rebelle', '', 0),
(24, 'marin', '', 0),
(25, 'archer', '', 0),
(26, 'garde', '', 0),
(27, 'ugenie', 'Unité de génie', 5),
(28, 'patr', 'Patrouilleurs', 3),
(29, 'chariot', '', 0),
(30, 'machine', '', 0),
(31, 'siege', 'Engin de siège', 0),
(32, 'mortv', 'Mort-vivant', 0),
(33, 'batmil', 'Bâtiment militaire', 0),
(34, 'batciv', 'Bâtiment civil', 0),
(35, 'fortif', 'Fortification', 0),
(36, 'fdc', 'Feu de Camp', 0),
(37, 'reco', 'Récolte', 0),
(38, 'prod', 'Production', 0),
(39, 'terra', 'Terraform', 0),
(40, 'arche', 'La Grande Arche', 0),
(41, 'misg', 'Misgard', 0),
(42, 'tsauv', 'Terres Sauvages', 0),
(43, 'grok', 'Royaume Peaux Vertes', 0),
(44, 'ligue', 'Ligue de l\'Ouest', 0),
(45, 'grim', 'Royaume Nain', 0),
(46, 'gouf', 'Le Gouffre : Brigands de Mannheim', 0),
(47, 'fcote', 'Frères de la côte', 0),
(48, 'rux', 'Pillards des glaces', 0),
(49, 'yano', 'Yanovie', 0),
(50, 'jard', 'Le Jardin', 0),
(51, 'pmar', 'Princes marchands', 0),
(52, 'bogo', 'Bogolan', 0),
(53, 'donga', 'Tribu Bogolan : Savanne', 0),
(54, 'tripis', 'Califat de Tripis', 0),
(55, 'mesa', 'Mésaoniens', 0),
(56, 'sho', 'Shogan : Asiatiques', 0),
(57, 'skri', 'Sauriens', 0),
(58, 'manh', 'Mannheim', 0),
(59, 'kuba', 'Tribu Bogolan : Jungle', 0),
(60, 'hura', 'Hura : Brigands de Koush', 0),
(61, 'veln', 'Velnius : Cultistes', 0),
(62, 'azat', 'Hommes libres', 0),
(63, 'malko', 'Malkovie', 0),
(64, 'fund', 'Funduq : Les Caravanes', 0),
(65, 'koush', '', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
