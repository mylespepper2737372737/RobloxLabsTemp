CREATE SCHEMA `RobloxCounters` ;
CREATE TABLE `RobloxCounters`.`counter2` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `CounterName` text NOT NULL,
  `CounterCount` bigint NOT NULL,
    PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
