CREATE DATABASE userDB;

CREATE TABLE `users` (
  `userID` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `fname` VARCHAR(50) NULL,
  `lname` VARCHAR(25) NULL,
  `gender` VARCHAR(6) NULL,
  `phoneNum` VARCHAR(12) NULL,
  `dob` DATE NULL,
  `cardName` VARCHAR(50) NULL,
  `cardNum` VARCHAR(20) NULL,
  `mExp` INT(2) NULL,
  `yExp` INT(4) NULL,
  `cvv` VARCHAR(5) NULL,
  `balance` DECIMAL(20,2) DEFAULT 0.00,
  PRIMARY KEY (`userID`),
  UNIQUE KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `transactionCopy` (
  `transactionID` VARCHAR(25) NOT NULL,
  `userID` INT(11) NOT NULL,
  `symbol` VARCHAR(10) NOT NULL,
  `transactionType` ENUM('buy', 'sell', 'deposit', 'withdraw') NOT NULL,
  `quantity` DECIMAL(11,2) NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `transactionDate` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (`transactionID`),
  FOREIGN KEY (`userID`) REFERENCES `users`(`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
