-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 23, 2019 at 08:49 PM
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
  `prefs` json DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `players`
--

INSERT INTO `players` (`id`, `pseudo`, `pshort`, `pic`, `bldView`, `bldIdent`, `unitView`, `unitIdent`, `mapView`, `mapCarto`, `exploredTiles`, `enemies`, `allies`, `prefs`) VALUES
(1, 'Bob', 'Bob', 'dragon', '[211]', '[211]', '[91, 11, 53, 78, 79, 80, 54, 55, 64, 126, 207, 205, 208, 206, 5, 220, 222, 221]', '[91, 11, 53, 78, 79, 80, 54, 55, 64, 126, 5]', '[41, 58, 73, 86, 55, 39, 54, 38, 83, 68, 60, 112, 125, 82, 97, 276, 800, 1595, 275, 408, 142, 541, 9908, 19547, 799, 667, 674, 539, 669, 801, 668, 673, 540, 409, 933, 932, 672, 542, 538, 931, 410, 407, 274, 143, 144, 406, 405, 537, 670, 671, 803, 936, 804, 802, 535, 402, 403, 404, 534, 536, 666, 934, 935, 277, 1065, 1063, 798, 146, 13, 14, 15, 145, 147, 278, 279, 807, 1066, 929, 272, 930, 1062, 1064, 1194, 1195, 1196, 1067, 1197, 1198, 1199, 805, 937, 1068, 1069, 675, 676, 806, 808, 938, 939, 940, 12, 139, 140, 141, 271, 273, 796, 797, 928, 1060, 1061, 543, 411, 412, 544, 663, 664, 665, 795, 927, 794, 926, 1058, 1059, 1326, 1327, 1328, 925, 1057, 1189, 1190, 1191, 1192, 1322, 1323, 1324, 1200, 1334, 1201, 1332, 1331, 1333, 1463, 1464, 1465, 1462, 1594, 1596, 1726, 1727, 1728, 1071, 1203, 1070, 1072, 1202, 1204, 1335, 1336, 1466, 1467, 1468, 1597, 1598, 1599, 1455, 1454, 1456, 1586, 1587, 1588, 1329, 1330, 9775, 9776, 9777, 9907, 9909, 10039, 10040, 10041, 1859, 1458, 1193, 1325, 1457, 1460, 1461, 1730, 1729, 1731, 1861, 1862, 1863, 1858, 1860, 1990, 1991, 1992, 1590, 1993, 1994, 1995, 1459, 1589, 1591, 1721, 1722, 1723, 2127, 1996, 2126, 2128, 2258, 2259, 2260, 1592, 1724, 1854, 1855, 1856, 1720, 1725, 1857, 1989, 2391, 2390, 2392, 2522, 2523, 2524, 1853, 1719, 1851, 1852, 2124, 2123, 2125, 2255, 2256, 2257, 1987, 2119, 1985, 1984, 1986, 1988, 2118, 2120, 2250, 2251, 2252, 2117, 2655, 2116, 2247, 1983, 2115, 2248, 2249, 2389, 2654, 2656, 2786, 2787, 2788, 2388, 2520, 2521, 2121, 2253, 2383, 2384, 2385, 2114, 2246, 2378, 2379, 2380, 2514, 2382, 2653, 2919, 2918, 2920, 3050, 3051, 3052, 2381, 2122, 2254, 2386, 2511, 2512, 2513, 2643, 2644, 2645, 2516, 2515, 2517, 2518, 2650, 2648, 2780, 2912, 2519, 2387, 2651, 2652, 3044, 2779, 2646, 2647, 2778, 2910, 2911, 2781, 2649, 2782, 2913, 2914, 2784, 2785, 3043, 3045, 3177, 3175, 3176, 3178, 3311, 3046, 3047, 3179, 3309, 3310, 3443, 3576, 3312, 3442, 3444, 3574, 3575, 3708, 3841, 3577, 3707, 3709, 3839, 3840, 3842, 3843, 3710, 3711, 3712, 3844, 3974, 3975, 3976, 4106, 4107, 4108, 3973, 3972, 19414, 19415, 19416, 19546, 19548, 19678, 19679, 19680, 19810, 19811, 19812, 19942, 19943, 19944, 3182, 3183, 3184, 3314, 3181, 3313, 3315, 3445, 3446, 3447, 3316, 3448, 3578, 3579, 3580, 3317, 3449, 3581, 3318, 3450, 3582, 3714, 3583, 3713, 3715, 3845, 3846, 3847, 2915, 2783, 2916, 3048, 3308, 3180, 3440, 3307, 3439, 3441, 3571, 3572, 3573, 3703, 3704, 3705, 3837, 3706, 3836, 3838, 3968, 3969, 3970, 3971, 4101, 4102, 4103, 3977, 3978, 3979, 4104, 4234, 4235, 4236, 4105, 4237, 4367, 4368, 4369, 4238, 4239, 4370, 4371, 545, 677, 809, 678, 810, 941, 942, 1075, 943, 944, 1074, 1076, 1206, 1207, 1208, 1339, 1338, 1340, 1470, 1471, 1472, 1337, 1469, 1601, 1602, 1603, 1733, 1600, 1732, 1734, 1864, 1865, 1866, 1998, 1867, 1997, 1999, 2129, 2130, 2131, 2261, 2262, 2263, 2394, 2393, 2395, 2525, 2526, 2527, 2657, 2658, 2659, 2790, 2789, 2791, 2921, 2922, 2923, 3054, 3053, 3055, 3185, 3186, 3187, 3320, 3188, 3189, 3319, 3321, 3451, 3452, 3453, 3584, 4111, 3980, 4110, 4112, 4242, 4243, 4244, 4109]', '[55, 39, 58, 54, 38, 41, 86, 83, 68, 60, 112, 125, 82, 97, 73, 1595, 541, 275, 800, 1335, 1466, 1324, 1862, 1590, 2127, 1723, 2517, 3978]', '[]', '[\"Zorglub\"]', '[\"Madrigal\"]', '{\"detail\": {\"tile\": false, \"squad\": true}, \"offset\": {\"x\": 0, \"y\": 6}, \"numTiles\": {\"h\": 19, \"v\": 11}}'),
(2, 'Zorglub', 'Zorg', 'demon', '[38]', '[38]', '[40, 49, 61, 105, 104, 113, 91, 47]', '[40, 49, 61, 105, 104, 113, 91, 47]', '[58, 73, 74, 88, 116, 85, 57, 72, 87, 100, 117, 115, 70, 55, 41, 132, 26, 40, 59, 42, 56, 71, 103, 131, 89, 101, 54, 69, 84, 86, 114, 99, 113, 128, 129, 102, 97, 112, 127, 276, 143, 144, 145, 275, 277, 407, 408, 409, 540, 674, 673, 805, 802, 803, 670, 671, 672, 804, 934, 935, 936, 1068, 937, 1067, 1069, 1199, 1200, 1201, 938, 806, 807, 939, 1070, 1071, 542, 410, 411, 541, 543, 675, 544, 545, 412, 413, 414, 546, 676, 677, 678, 808, 809, 940, 941, 1334, 1332, 1202, 1073, 1204, 811, 944, 1075, 1207, 1074, 1076, 1206, 1208, 1338, 1339, 1340]', '[73, 116, 88, 57, 70, 114, 113, 276]', '[1207]', '[\"Bob\"]', '[]', '{\"detail\": {\"tile\": false, \"squad\": true}, \"offset\": {\"x\": 3, \"y\": 9}, \"numTiles\": {\"h\": 11, \"v\": 8}}'),
(3, 'Morpheus', 'Mrph', 'triton', '[38]', '[38]', '[66, 11, 49, 50, 90, 99, 109, 81, 83]', '[66, 49, 50, 99, 109]', '[276, 274, 275, 538, 539]', '[]', '[]', '[]', '[]', '{}'),
(4, 'Madrigal', 'Madr', 'minotaur', '[]', '[]', '[]', '[]', '[]', '[]', '[]', '[\"Zorglub\"]', '[\"Bob\"]', '{}');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
