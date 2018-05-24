-- --------------------------------------------------------
-- Host:                         drnserver.duckdns.org
-- Server version:               5.7.21-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             9.5.0.5196
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for recdatabase
CREATE DATABASE IF NOT EXISTS `recdatabase` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `recdatabase`;

-- Dumping structure for table recdatabase.adminusers
CREATE TABLE IF NOT EXISTS `adminusers` (
  `UID` longtext,
  `username` longtext,
  `epassword` longtext,
  `authLevel` longtext,
  `firstname` longtext,
  `lastname` longtext,
  `active` longtext,
  `logintime` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.classcategories
CREATE TABLE IF NOT EXISTS `classcategories` (
  `categoryID` longtext,
  `categoryName` longtext,
  `hexColor` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `classID` longtext,
  `className` longtext,
  `classLocation` longtext,
  `instructorID` longtext,
  `categoryID` longtext,
  `reservedSlots` longtext,
  `availableSlots` longtext,
  `beginDate` longtext,
  `endDate` longtext,
  `beginHour` longtext,
  `beginMin` longtext,
  `endHour` longtext,
  `endMin` longtext,
  `dayOfWeek` longtext,
  `classDescription` longtext,
  `classImageURL` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.emailreserved
CREATE TABLE IF NOT EXISTS `emailreserved` (
  `classID` longtext,
  `email` longtext,
  `slotNumber` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.events
CREATE TABLE IF NOT EXISTS `events` (
  `eventID` longtext,
  `classID` longtext,
  `eventDay` longtext,
  `usedSlots` longtext,
  `maxSlots` longtext,
  `active` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.externalusers
CREATE TABLE IF NOT EXISTS `externalusers` (
  `UID` longtext,
  `email` longtext,
  `firstName` longtext,
  `lastName` longtext,
  `ePin` longtext,
  `balance` longtext,
  `creationTime` longtext,
  `resetPin` longtext,
  `active` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.instructors
CREATE TABLE IF NOT EXISTS `instructors` (
  `instructorID` longtext,
  `firstname` longtext,
  `lastname` longtext,
  `photoURL` longtext,
  `bio` longtext,
  `creationTime` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.mailqueue
CREATE TABLE IF NOT EXISTS `mailqueue` (
  `eventID` longtext,
  `timestamp` longtext,
  `subject` longtext,
  `message` longtext,
  `active` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.modules
CREATE TABLE IF NOT EXISTS `modules` (
  `moduleID` longtext,
  `name` longtext,
  `icon` longtext,
  `route` longtext,
  `minAccessLevel` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Dumping data for table recdatabase.modules: ~7 rows (approximately)
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` (`moduleID`, `name`, `icon`, `route`, `minAccessLevel`) VALUES
	('0', 'Dashboard', 'fa-home', '/', '100'),
	('1', 'Manage Users', 'fa-user', '/users', '2'),
	('5', 'Current Week', 'fa-calendar-o', '/schedule', '2'),
	('2', 'Manage Instructors', 'fa-male', '/instructors', '2'),
	('3', 'Manage Classes', 'fa-pencil-square-o', '/classes', '2'),
	('4', 'Class Categories', 'fa-cube', '/classcategories', '2'),
	('6', 'Reviews Summary', 'fa-star', '/reviews', '2');
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.registeredevents
CREATE TABLE IF NOT EXISTS `registeredevents` (
  `UID` longtext,
  `eventID` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
-- Dumping structure for table recdatabase.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `reviewID` longtext NOT NULL,
  `instructorID` longtext,
  `classID` longtext,
  `reviewText` longtext,
  `starRating` double DEFAULT NULL,
  `timeStamp` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
