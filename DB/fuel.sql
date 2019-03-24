-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema fuel
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `fuel` ;

-- -----------------------------------------------------
-- Schema fuel
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `fuel` DEFAULT CHARACTER SET utf8 ;
USE `fuel` ;

-- -----------------------------------------------------
-- Table `fillup`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `fillup` ;

CREATE TABLE IF NOT EXISTS `fillup` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `time_stamp` DATETIME NULL,
  `odometer` INT NULL,
  `price_per_gallon` DOUBLE NULL,
  `gallons` DOUBLE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS fueluser;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'fueluser' IDENTIFIED BY 'fuelpass';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'fueluser';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `fillup`
-- -----------------------------------------------------
START TRANSACTION;
USE `fuel`;
INSERT INTO `fillup` (`id`, `time_stamp`, `odometer`, `price_per_gallon`, `gallons`) VALUES (1, '2019-03-01 19:25:00', 17500, 2.26, 8.3);
INSERT INTO `fillup` (`id`, `time_stamp`, `odometer`, `price_per_gallon`, `gallons`) VALUES (2, '2019-03-03 20:30:00', 17850, 2.34, 8.6);
INSERT INTO `fillup` (`id`, `time_stamp`, `odometer`, `price_per_gallon`, `gallons`) VALUES (3, '2019-03-06 08:34:00', 18206, 2.49, 9.0);
INSERT INTO `fillup` (`id`, `time_stamp`, `odometer`, `price_per_gallon`, `gallons`) VALUES (4, '2019-03-09 17:45:00', 18563, 2.55, 7.4);
INSERT INTO `fillup` (`id`, `time_stamp`, `odometer`, `price_per_gallon`, `gallons`) VALUES (DEFAULT, NULL, NULL, NULL, 8.4);

COMMIT;

