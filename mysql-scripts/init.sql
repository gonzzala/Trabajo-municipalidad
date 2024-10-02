CREATE DATABASE IF NOT EXISTS reclamosDB;
USE reclamosDB;

-- MariaDB dump 10.19 Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost Database: reclamosDB
-- ------------------------------------------------------
-- Server version 10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partidos`
--

DROP TABLE IF EXISTS `partidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `partidos` (
  `IdPartido` int(11) NOT NULL AUTO_INCREMENT,
  `NombreP` varchar(15) NOT NULL,
  PRIMARY KEY (`IdPartido`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Dumping data for table `partidos`
LOCK TABLES `partidos` WRITE;
/*!40000 ALTER TABLE `partidos` DISABLE KEYS */;
INSERT INTO `partidos` VALUES (1,'Azul'),(2,'Cacharí'),(3,'Chillar');
/*!40000 ALTER TABLE `partidos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `areas`
--

DROP TABLE IF EXISTS `areas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `areas` (
  `IdArea` smallint(6) NOT NULL AUTO_INCREMENT,
  `NombreA` varchar(50) NOT NULL,
  PRIMARY KEY (`IdArea`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Dumping data for table `areas`
LOCK TABLES `areas` WRITE;
/*!40000 ALTER TABLE `areas` DISABLE KEYS */;
INSERT INTO `areas` VALUES (1,'Obras Públicas'),(2,'Servicios Públicos'),(3,'Control Ciudadano'), (4,'Gobierno'), (5,'Medioambiente'), (6,'Todas');
/*!40000 ALTER TABLE `areas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `IdAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `IdArea` smallint(6) NOT NULL,
  `Nivel` int(11) NOT NULL,
  `Nombre` varchar(20) DEFAULT NULL,
  `Mail` varchar(40) DEFAULT NULL,
  `contraseña` varchar(255) NOT NULL,
  PRIMARY KEY (`IdAdmin`),
  KEY `ciudadano_ibfk_8` (`IdArea`),
  CONSTRAINT `ciudadano_ibfk_8` FOREIGN KEY (`IdArea`) REFERENCES `areas` (`IdArea`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Dumping data for table `admins`
LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,6,1,'Morales Santiago','santiagodmorales@gmail.com','$2a$10$vGhIfR9mXjCDiciWBcfX/.3VP8pRd1clhCmowFp0ASdOQiGNzyPsW');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plazovencimiento`
--

DROP TABLE IF EXISTS `plazovencimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plazovencimiento` (
  `IdPlazo` int(11) NOT NULL AUTO_INCREMENT,
  `Dias` int(11) NOT NULL,
  PRIMARY KEY (`IdPlazo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Dumping data for table `plazovencimiento`
LOCK TABLES `plazovencimiento` WRITE;
/*!40000 ALTER TABLE `plazovencimiento` DISABLE KEYS */;
INSERT INTO `plazovencimiento` VALUES (1,30);
/*!40000 ALTER TABLE `plazovencimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ciudadanos`
--

DROP TABLE IF EXISTS `ciudadanos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ciudadanos` (
  `IdCiudadano` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(20) NOT NULL,
  `Apellido` varchar(20) NOT NULL,
  `DNI` bigint(20) NOT NULL,
  `Direccion` varchar(50) NOT NULL,
  `Mail` varchar(50) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `IdPartido` int(11) NOT NULL,
  `Enable` tinyint(1) NOT NULL,
  `Comentarios` varchar(100) DEFAULT NULL,
  `RecoveryToken` varchar(255) DEFAULT NULL,
  `RecoveryTokenExpiry` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`IdCiudadano`),
  UNIQUE KEY `DNI` (`DNI`),
  UNIQUE KEY `Mail` (`Mail`),
  KEY `ciudadano_ibfk_1` (`IdPartido`),
  CONSTRAINT `ciudadanos_ibfk_1` FOREIGN KEY (`IdPartido`) REFERENCES `partidos` (`IdPartido`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ciudadanos`
--

LOCK TABLES `ciudadanos` WRITE;
/*!40000 ALTER TABLE `ciudadanos` DISABLE KEYS */;
INSERT INTO `ciudadanos` VALUES (1,'Reclamos','Administrador',99999999,'Municipalidad de Azul','reclamosmunicipalidaddeazul@gmail.com','reclamosapp2023',1,0,NULL,NULL,NULL);
/*!40000 ALTER TABLE `ciudadanos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estados`
--

DROP TABLE IF EXISTS `estados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados` (
  `IdEstado` int(1) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(15) NOT NULL,
  PRIMARY KEY (`IdEstado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estados`
--

LOCK TABLES `estados` WRITE;
/*!40000 ALTER TABLE `estados` DISABLE KEYS */;
INSERT INTO `estados` VALUES (1,'Pendiente'),(2,'En progreso'),(3,'Resuelto'),(4,'Vencido');
/*!40000 ALTER TABLE `estados` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `reclamos`
--

DROP TABLE IF EXISTS `reclamos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reclamos` (
  `IdReclamo` int(11) NOT NULL AUTO_INCREMENT,
  `TipoDeSituacion` varchar(50) NOT NULL,
  `Ubicacion` varchar(100) NOT NULL,
  `Comentario` varchar(250) NOT NULL,
  `IdCiudadano` int(11) NOT NULL,
  `IdArea` smallint(6) NOT NULL,
  `IdEstado` int(1) NOT NULL,
  `FechaReclamo` timestamp NOT NULL DEFAULT current_timestamp(),
  `FechaVencimiento` date DEFAULT NULL,
  PRIMARY KEY (`IdReclamo`),
  KEY `reclamo_ibfk_2` (`IdCiudadano`),
  KEY `reclamo_ibfk_3` (`IdArea`),
  KEY `reclamo_ibfk_4` (`IdEstado`),
  CONSTRAINT `reclamos_ibfk_2` FOREIGN KEY (`IdCiudadano`) REFERENCES `ciudadanos` (`IdCiudadano`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_3` FOREIGN KEY (`IdArea`) REFERENCES `areas` (`IdArea`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reclamos_ibfk_4` FOREIGN KEY (`IdEstado`) REFERENCES `estados` (`IdEstado`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reclamos`
--

LOCK TABLES `reclamos` WRITE;
/*!40000 ALTER TABLE `reclamos` DISABLE KEYS */;
INSERT INTO `reclamos` VALUES (1,'Tipo 2','Ubicacion 2','Comentario Prueba Fecha',2,2,2,'2023-11-15 18:54:18','2023-12-15');
/*!40000 ALTER TABLE `reclamos` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_unicode_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;

CREATE TRIGGER setFechaVencimiento

BEFORE INSERT ON reclamos

FOR EACH ROW

BEGIN

  DECLARE plazo INT;

  -- Obtenemos el valor de dias desde la tabla plazovencimiento

  SELECT dias INTO plazo FROM plazovencimiento LIMIT 1;

  -- Calculamos la fecha de vencimiento y la almacenamos en NEW.FechaVencimiento

  SET NEW.FechaVencimiento = DATE_ADD(CURDATE(), INTERVAL plazo DAY);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15 22:32:12

