-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: carsystem
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cars`
--

DROP TABLE IF EXISTS `cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cars` (
  `id` int NOT NULL,
  `licencePlate` varchar(255) NOT NULL,
  `viacleType` int NOT NULL,
  `fourOnFour` tinyint(1) NOT NULL,
  `engineCapacity` int DEFAULT NULL,
  `manufactoryYear` int NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `deliveredToEmployee` int DEFAULT NULL,
  `treatmentDate` date NOT NULL,
  `editDate` date NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `licencePlate` (`licencePlate`),
  KEY `viacleType` (`viacleType`),
  KEY `deliveredToEmployee` (`deliveredToEmployee`),
  CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`viacleType`) REFERENCES `cartype` (`typeNum`),
  CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`deliveredToEmployee`) REFERENCES `employee` (`employeeNum`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cars`
--

LOCK TABLES `cars` WRITE;
/*!40000 ALTER TABLE `cars` DISABLE KEYS */;
INSERT INTO `cars` VALUES (2,'99-923-23',4,1,1600,2011,NULL,1,'2021-01-14','2021-02-21'),(6,'98-913-70',5,0,2000,2017,NULL,NULL,'2021-01-12','2021-01-11'),(7,'28-123-99',3,0,2500,2018,NULL,2,'2021-01-16','2021-01-11'),(13,'99-923-21',2,0,805,1964,NULL,2,'2021-01-13','2021-01-12'),(22,'90-451-88',2,0,2500,2018,NULL,2,'2021-01-13','2021-01-12'),(26,'22-312-10',2,0,800,1960,NULL,2,'2021-01-12','2021-01-12'),(28,'95-917-61',5,0,1800,2010,NULL,4,'2021-01-13','2021-01-12'),(30,'45-618-22',5,0,3500,2015,NULL,3,'2021-01-13','2021-01-12'),(31,'31-478-22',2,1,2500,2010,NULL,NULL,'2021-01-13','2021-01-12'),(33,'99-262-88',2,0,2300,2020,NULL,1,'2021-01-27','2021-01-12'),(35,'43-212-11',2,0,3000,2003,'nice viacle',NULL,'2021-01-13','2021-01-12'),(38,'37-123-32',2,0,800,2007,NULL,NULL,'2021-01-13','2021-01-12'),(39,'55-432-12',2,0,2000,1999,NULL,2,'2021-01-13','2021-01-12'),(40,'23-999-99',2,0,2300,2003,NULL,1,'2021-01-21','2021-01-12');
/*!40000 ALTER TABLE `cars` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-12 21:04:10
