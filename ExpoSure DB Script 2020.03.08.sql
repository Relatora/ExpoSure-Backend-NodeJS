-- MySQL Script generated by MySQL Workbench
-- Sun Mar  1 00:41:43 2020
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ExpoSure
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ExpoSure
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ExpoSure` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ExpoSure` ;

-- -----------------------------------------------------
-- Table `ExpoSure`.`Categories`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Categories` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ExpoSure`.`Businesses`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Businesses` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Businesses` (
  `business_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `contact_name` VARCHAR(45) NOT NULL,
  `contact_phone` VARCHAR(20) NOT NULL,
  `contact_email` VARCHAR(45) NOT NULL,
  `Categories_category_id` INT NOT NULL,
  PRIMARY KEY (`business_id`),
  INDEX `fk_Businesses_Categories1_idx` (`Categories_category_id` ASC) VISIBLE,
  CONSTRAINT `fk_Businesses_Categories1`
    FOREIGN KEY (`Categories_category_id`)
    REFERENCES `ExpoSure`.`Categories` (`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ExpoSure`.`Venues`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Venues` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Venues` (
  `venue_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `address` VARCHAR(100) NOT NULL,
  `contact_name` VARCHAR(45) NOT NULL,
  `contact_phone` VARCHAR(20) NOT NULL,
  `contact_email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`venue_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ExpoSure`.`Expo_Events`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Expo_Events` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Expo_Events` (
  `event_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `location` VARCHAR(100) NOT NULL,
  `contact_name` VARCHAR(45) NOT NULL,
  `contact_phone` VARCHAR(20) NOT NULL,
  `contact_email` VARCHAR(45) NOT NULL,
  `photo` VARCHAR(500) NULL DEFAULT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`event_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `ExpoSure`.`Products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Products` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(300) NOT NULL,
  `dimentions` VARCHAR(75) NOT NULL,
  `price` DOUBLE(9,2) NOT NULL,
  `QR_code` BLOB DEFAULT NULL,
  `Businesses_business_id` INT NOT NULL,
  PRIMARY KEY (`product_id`),
  INDEX `fk_Business_Products1_idx` (`Businesses_business_id` ASC) VISIBLE,
  CONSTRAINT `fk_Business_Products1`
    FOREIGN KEY (`Businesses_business_id`)
    REFERENCES `ExpoSure`.`Businesses` (`business_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `ExpoSure`.`Visitors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Visitors` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Visitors` (
  `visitor_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`visitor_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ExpoSure`.`Favorites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Favorites` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Favorites` (
  `Products_product_id` INT NOT NULL,
  `Visitors_visitor_id` INT NOT NULL,
  `Expo_Events_event_id` INT NOT NULL,
  `note` VARCHAR(200) NULL DEFAULT NULL,
  PRIMARY KEY (`Products_product_id`, `Visitors_visitor_id`, `Expo_Events_event_id`),
  INDEX `fk_Favorites_Products1_idx` (`Products_product_id` ASC) VISIBLE,
  INDEX `fk_Favorites_Visitors1_idx` (`Visitors_visitor_id` ASC) VISIBLE,
  INDEX `fk_Favorites_Expo_Events1_idx` (`Expo_Events_event_id` ASC) VISIBLE,
  CONSTRAINT `fk_Favorites_Products1`
    FOREIGN KEY (`Products_product_id`)
    REFERENCES `ExpoSure`.`Products` (`product_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Favorites_Visitors1`
    FOREIGN KEY (`Visitors_visitor_id`)
    REFERENCES `ExpoSure`.`Visitors` (`visitor_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Favorites_Expo_Events1`
    FOREIGN KEY (`Expo_Events_event_id`)
    REFERENCES `ExpoSure`.`Expo_Events` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


-- -----------------------------------------------------
-- Table `ExpoSure`.`Event_Details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `ExpoSure`.`Event_Details` ;

CREATE TABLE IF NOT EXISTS `ExpoSure`.`Event_Details` (
  `Businesses_business_id` INT NOT NULL,
  `Venues_venue_id` INT NOT NULL,
  `Expo_Events_event_id` INT NOT NULL,
  `booth_code` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Venues_venue_id`, `Businesses_business_id`, `Expo_Events_event_id`),
  INDEX `fk_Event_Details_Businesses_idx` (`Businesses_business_id` ASC) VISIBLE,
  INDEX `fk_Event_Details_Venues1_idx` (`Venues_venue_id` ASC) VISIBLE,
  INDEX `fk_Event_Details_Expo_Events1_idx` (`Expo_Events_event_id` ASC) VISIBLE,
  CONSTRAINT `fk_Event_Details_Businesses`
    FOREIGN KEY (`Businesses_business_id`)
    REFERENCES `ExpoSure`.`Businesses` (`business_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Event_Details_Venues1`
    FOREIGN KEY (`Venues_venue_id`)
    REFERENCES `ExpoSure`.`Venues` (`venue_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Event_Details_Expo_Events1`
    FOREIGN KEY (`Expo_Events_event_id`)
    REFERENCES `ExpoSure`.`Expo_Events` (`event_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;



-- ------------------------------
-- INSERTS
-- ------------------------------

-- Venues
insert into ExpoSure.Venues (venue_id, name, address, contact_name, contact_phone, contact_email) values (1, 'Four Seasons Hotel', '76882 Canary Drive', 'Shermy Tonepohl', '+46 (675) 285-7846', 'stonepohl0@slashdot.org');
insert into ExpoSure.Venues (venue_id, name, address, contact_name, contact_phone, contact_email) values (2, 'Toronto Conference Center', '814 Russell Park', 'Akim Kohler', '+238 (517) 153-7903', 'akohler1@google.com.br');
insert into ExpoSure.Venues (venue_id, name, address, contact_name, contact_phone, contact_email) values (3, 'Vancouver Dome', '70 Algoma Park', 'Barbara Domeney', '+55 (382) 601-3607', 'bdomeney2@ibm.com');
insert into ExpoSure.Venues (venue_id, name, address, contact_name, contact_phone, contact_email) values (4, 'Lambton College Conference Center', '4 Cascade Pass', 'Ricky Hylton', '+972 (268) 618-2838', 'rhylton3@constantcontact.com');
insert into ExpoSure.Venues (venue_id, name, address, contact_name, contact_phone, contact_email) values (5, 'The Needle', '25 Swallow Hill', 'Laurence Dumbellow', '+52 (831) 781-0541', 'ldumbellow4@163.com');

-- Expo_Events
insert into ExpoSure.Expo_Events (event_id, name, location, contact_name, contact_phone, contact_email, date, photo) values (1, 'Data Connectors Toronto Cybersecurity Conference', '6 Prairieview Junction', 'Brantley March', '504(666)608-7746', 'bmarch0@google.cn', '2019/10/18 14:00:00', 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
insert into ExpoSure.Expo_Events (event_id, name, location, contact_name, contact_phone, contact_email, date, photo) values (2, 'Digital Talent Acquisition Summit (DTA)', '98 Bellgrove Hill', 'Constancy Newall', '62(904)847-1968', 'cnewall1@storify.com', '2020/12/12 14:08:00', 'https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80');
insert into ExpoSure.Expo_Events (event_id, name, location, contact_name, contact_phone, contact_email, date, photo) values (3, 'The World Leading AI Summit', '61820 Jackson Circle', 'Papagena Stacey', '7(519)212-4580', 'pstacey2@ucoz.ru', '2020/01/16 08:30:00', 'https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
insert into ExpoSure.Expo_Events (event_id, name, location, contact_name, contact_phone, contact_email, date, photo) values (4, 'International Conference on IT & Computer Science', '4515 Crescent Oaks Plaza', 'Kristofor Pickavance', '33(584)302-6609', 'kpickavance3@i2i.jp', '2020/01/28 11:00:00', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');
insert into ExpoSure.Expo_Events (event_id, name, location, contact_name, contact_phone, contact_email, date, photo) values (5, 'International Conference on Science, Engineering & Technology (ICSET)', '03 Cody Way', 'Kayle Comellini', '63(438)399-1556', 'kcomellini4@abc.net.au', '2019/05/30 10:00:00', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80');

-- Categories
insert into ExpoSure.Categories (Category_id, description) values (1, 'Artificial Intellignece');
insert into ExpoSure.Categories (Category_id, description) values (2, 'Space');
insert into ExpoSure.Categories (Category_id, description) values (3, 'Cyber Security');
insert into ExpoSure.Categories (Category_id, description) values (4, 'Machine Learning');
insert into ExpoSure.Categories (Category_id, description) values (5, 'Education');

-- ------------------------------------------------------------------------------
-- ------------------------------
-- VIEWS
-- ------------------------------

-- ------------------------------
-- favorite_view
-- ------------------------------
CREATE OR REPLACE VIEW `favorite_view` AS
SELECT fv.Products_product_id AS product_id, fv.Visitors_visitor_id AS visitor_id, fv.Expo_Events_event_id AS event_id,
 fv.note AS fav_note, ee.name AS eve_name, ee.location AS eve_location, ee.contact_name AS eve_contact_name,
 ee.contact_phone AS eve_contact_phone, ee.contact_email AS eve_contact_email,
 ee.photo AS eve_photo, ee.date AS eve_date, vs.first_name As vis_first_name, vs.last_name AS vis_last_name,
 pr.name AS pro_name, pr.description AS pro_description, pr.dimentions AS pro_dimentions,
 pr.price AS pro_price, pr.QR_code AS pro_QR_code, pr.Businesses_business_id AS business_id,
 bs.name AS bus_name
FROM Favorites fv
JOIN Expo_Events ee ON ee.event_id = fv.Expo_Events_event_id 
JOIN Visitors vs ON vs.visitor_id = fv.Visitors_visitor_id
JOIN Products pr ON pr.product_id = fv.Products_product_id
JOIN Businesses bs ON pr.Businesses_business_id = bs.business_id
ORDER BY Visitors_visitor_id AND Expo_Events_event_id;


-- ------------------------------
-- event_view
-- ------------------------------
CREATE OR REPLACE VIEW `event_view` AS
SELECT ed.Expo_Events_event_id AS event_id, ed.Businesses_business_id AS business_id,
ed.Venues_venue_id as venue_id, ed.booth_code AS booth_code, vn.name AS ven_name,
vn.address AS ven_address, vn.contact_name AS ven_contact_name, vn.contact_phone AS ven_contact_phone,
vn.contact_email AS ven_contact_email, ee.name AS eve_name, ee.location AS eve_location, ee.contact_name AS eve_contact_name,
 ee.contact_phone AS eve_contact_phone, ee.contact_email AS eve_contact_email,
ee.photo AS eve_photo, ee.date AS eve_date, bs.name AS bus_name, bs.address AS bus_address,
bs.contact_name AS bus_contact_name, bs.contact_phone AS bus_contact_phone, bs.contact_email AS bus_contact_email,
ca.category_id AS category_id, ca.description AS cat_description-- 
FROM Event_Details ed
JOIN Venues vn ON vn.venue_id = ed.Venues_venue_id
JOIN Expo_Events ee ON ee.event_id = ed.Expo_Events_event_id
JOIN Businesses bs ON bs.business_id = ed.Businesses_business_id
JOIN Categories ca ON category_id = bs.Categories_category_id
ORDER BY Venues_venue_id and Expo_Events_event_id ;
