DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ResetAutoIncrementForTesting`()
BEGIN
ALTER TABLE `test` 
AUTO_INCREMENT = 1 ;
END$$
DELIMITER ;
