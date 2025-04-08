-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema cadu
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cadu
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cadu` DEFAULT CHARACTER SET utf8 ;
USE `cadu` ;

-- -----------------------------------------------------
-- Table `cadu`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cadu`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(200) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(200) NOT NULL,
  `endereco` VARCHAR(200) NOT NULL,
  `cpf` CHAR(11) NOT NULL,
  `telefone` VARCHAR(18) NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
