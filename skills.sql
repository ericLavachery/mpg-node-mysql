-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 23, 2019 at 10:18 AM
-- Server version: 5.7.22
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wzW5xdQemU`
--

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `name` varchar(8) COLLATE utf8_bin NOT NULL,
  `ordre` smallint(5) UNSIGNED NOT NULL,
  `expl` varchar(40) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `ordre`, `expl`) VALUES
(1, 'explo', 1, 'explorateur'),
(2, 'carto', 2, 'cartographe'),
(3, 'spy', 6, 'espion'),
(4, 'cland', 8, 'clandestin'),
(5, 'shield', 10, 'bouclier'),
(6, 'shpar', 20, 'parable seulement avec un bouclier'),
(7, 'nopar', 21, 'imparable'),
(8, 'noesq', 22, 'inesquivable'),
(9, 'crit', 30, 'coups critiques'),
(10, 'noemb', 40, 'pas de tir embarqué'),
(11, 'insub', 50, 'insubbordoné'),
(12, 'medic', 60, 'médecin de combat'),
(13, 'armarch', 70, 'arrêt marchand'),
(14, 'chefchan', 75, 'producteur ou récolteur'),
(15, 'produc', 71, 'chef de chantier'),
(16, 'regu', 9, 'armée régulière'),
(17, 'info', 5, 'informateur');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
