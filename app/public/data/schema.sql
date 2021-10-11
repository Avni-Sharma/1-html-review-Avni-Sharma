CREATE DATABASE IF NOT EXISTS msisdb;
USE msisdb;


DROP TABLE IF EXISTS Book;
CREATE TABLE `Book` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `Title` VARCHAR(200) NULL,
  `Author` VARCHAR(100) NULL,
  `Year_Published` VARCHAR(4) NULL,
  `Publisher` VARCHAR(100) NULL,
  `Page_Count` INT NULL,
  `MSRP` DOUBLE NULL,
  PRIMARY KEY (`id`));


INSERT INTO Book ( Title, Author, Year_Published,Publisher,Page_Count, MSRP ) VALUES 
('Fundamentals of Wavelets','Goswami, Jaideva',1960,'Wiley',244,100),
('Data Smart','Foreman, John',1978,'Wiley',267,103),
('God Created the Integers','Hawking, Stephen',1950,'Penguin',197,75),
('Data Scientists at Work','Sebastian Gutierrez',1947,'Apress',230,65 ),
('Silverview','John le Carré',1999,'Oreilly',221,45);

