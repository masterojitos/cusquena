-- phpMyAdmin SQL Dump
-- version 4.2.8
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 05-10-2014 a las 19:11:11
-- Versión del servidor: 5.6.20
-- Versión de PHP: 5.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Base de datos: `cusquena`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cusquena_user`
--

CREATE TABLE IF NOT EXISTS `cusquena_user` (
`id` int(9) NOT NULL,
  `names` varchar(80) NOT NULL,
  `lastname1` varchar(80) NOT NULL,
  `lastname2` varchar(80) NOT NULL,
  `birthdate` date NOT NULL,
  `dni` varchar(8) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cellphone` int(9) NOT NULL,
  `notifications` tinyint(1) NOT NULL,
  `fb_id` varchar(20) DEFAULT NULL,
  `fb_data` text,
  `invited_friends` varchar(255) DEFAULT NULL,
  `board_name` varchar(30) DEFAULT NULL,
  `shared_picture` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cusquena_user`
--
ALTER TABLE `cusquena_user`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `dni` (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cusquena_user`
--
ALTER TABLE `cusquena_user`
MODIFY `id` int(9) NOT NULL AUTO_INCREMENT;