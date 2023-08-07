-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 07 Ağu 2023, 09:37:24
-- Sunucu sürümü: 10.4.20-MariaDB
-- PHP Sürümü: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `turizm`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `driver`
--

CREATE TABLE `driver` (
  `id` int(11) NOT NULL,
  `address` varchar(200) NOT NULL,
  `drivinglicenceno` varchar(15) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `tc` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `driver`
--

INSERT INTO `driver` (`id`, `address`, `drivinglicenceno`, `lastname`, `name`, `phone`, `tc`) VALUES
(1, 'ist.', '234er', 'koco', 'rami', '05353333333', '11111111111'),
(2, 'Ank.', '456ty', 'koç', 'samet', '22222222222', '11444444444'),
(3, 'Bursa', 'fe8974', 'Bozkurt', 'Mehmet', '03333233232', '22222222222'),
(4, 'bnhytr', 'tyu7654', 'Kaplan', 'Nurnnisa', '08888888888', '66666666666'),
(5, 'vvvvvv', 'as333334', 'Şen', 'Hülya', '55555555555', '99999999999');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `passenger`
--

CREATE TABLE `passenger` (
  `id` int(11) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(11) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `passenger`
--

INSERT INTO `passenger` (`id`, `lastname`, `name`, `phone`, `type`) VALUES
(1, 'yılmaz', 'Mithat', '66666666666', '2'),
(2, 'esen', 'esra', '22222222222', '1'),
(3, 'Kaya', 'Figen', '87878787878', '1'),
(4, 'Candan', 'Büşra', '77777777777', '3'),
(5, 'Demir', 'Murat', '55555555555', '2'),
(6, 'Altaylı', 'Ahmet', '44444444444', '3'),
(7, 'Murzayaw', 'Atabek', '777777777', '3');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `transfers`
--

CREATE TABLE `transfers` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `driver_id` int(11) NOT NULL,
  `passenger_id` int(11) NOT NULL,
  `end_point` varchar(50) NOT NULL,
  `expedition_time` time NOT NULL,
  `starting_point` varchar(200) NOT NULL,
  `vehicle_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `transfers`
--

INSERT INTO `transfers` (`id`, `date`, `driver_id`, `passenger_id`, `end_point`, `expedition_time`, `starting_point`, `vehicle_id`) VALUES
(1, '2023-08-06', 1, 1, 'dddddd', '00:00:00', 'wwwwwwwww', 2),
(2, '2023-08-20', 1, 2, 'ankara', '12:00:00', 'istanbul', 2),
(3, '2023-08-25', 4, 4, 'Ankara', '23:30:00', 'Kırıkkale', 2),
(4, '2023-08-06', 2, 6, 'eeeeeeee', '12:20:00', 'ssssss', 5),
(5, '2023-08-06', 2, 6, 'eeeeeeee', '12:20:00', 'ssssss', 5),
(6, '2023-08-08', 2, 6, 'zzzzz', '12:00:00', 'zzzxxx', 6),
(7, '2023-08-23', 3, 3, 'fgggg', '14:00:00', 'fffff', 5),
(8, '2023-08-29', 3, 2, 'uuuu', '12:20:00', 'eeee', 6);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `vehicle`
--

CREATE TABLE `vehicle` (
  `id` int(11) NOT NULL,
  `model` varchar(50) NOT NULL,
  `plate` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Tablo döküm verisi `vehicle`
--

INSERT INTO `vehicle` (`id`, `model`, `plate`) VALUES
(1, 'BMW', '34İST34'),
(2, 'Ford', '06ANK06'),
(4, 'Audi', '27BN417'),
(5, 'Citroen', '58SİV58'),
(6, 'Nissan', '55HYT563'),
(7, 'Volvo', '01ASX867'),
(8, 'Honda', '08KLM97'),
(9, 'Renault', '71KK71'),
(10, 'Fiat', '27GNP27');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `passenger`
--
ALTER TABLE `passenger`
  ADD PRIMARY KEY (`id`);

--
-- Tablo için indeksler `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `driver_id` (`driver_id`),
  ADD KEY `passenger_id` (`passenger_id`),
  ADD KEY `vehicle_id` (`vehicle_id`);

--
-- Tablo için indeksler `vehicle`
--
ALTER TABLE `vehicle`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `plate` (`plate`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `driver`
--
ALTER TABLE `driver`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tablo için AUTO_INCREMENT değeri `passenger`
--
ALTER TABLE `passenger`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Tablo için AUTO_INCREMENT değeri `transfers`
--
ALTER TABLE `transfers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tablo için AUTO_INCREMENT değeri `vehicle`
--
ALTER TABLE `vehicle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `transfers`
--
ALTER TABLE `transfers`
  ADD CONSTRAINT `transfers_ibfk_1` FOREIGN KEY (`driver_id`) REFERENCES `driver` (`id`),
  ADD CONSTRAINT `transfers_ibfk_2` FOREIGN KEY (`passenger_id`) REFERENCES `passenger` (`id`),
  ADD CONSTRAINT `transfers_ibfk_3` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
