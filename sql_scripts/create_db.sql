/**
Script to create a clean database for LoLBets
*/
DROP SCHEMA IF EXISTS lolbets;
CREATE SCHEMA lolbets;
USE lolbets;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(99) NOT NULL,
  `password_id` int DEFAULT NULL,
  `email` varchar(99) NOT NULL,
  `date_created` date NOT NULL,
  `profile_pic` varchar(99) DEFAULT NULL,
  `coins` int NOT NULL DEFAULT (1000),
  `flagged` tinyint(1) DEFAULT (false),
  `banned` tinyint(1) DEFAULT (false),
  `user_role` varchar(20) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
);

CREATE TABLE `teams` (
  `team_id` int NOT NULL AUTO_INCREMENT,
  `team_name` varchar(50) NOT NULL,
  `logo` text,
  `abbreviation` char(10) NOT NULL,
  `wins` int NOT NULL,
  `losses` int NOT NULL,
  PRIMARY KEY (`team_id`),
  UNIQUE KEY `team_name` (`team_name`)
);

CREATE TABLE `matches` (
  `match_id` int NOT NULL AUTO_INCREMENT,
  `team1_id` int NOT NULL,
  `team2_id` int NOT NULL,
  `winner_id` int DEFAULT (NULL),
  `match_start_time` datetime NOT NULL,
  `in_progress` tinyint(1) DEFAULT (false),
  `game_length` int DEFAULT (NULL),
  `pandascore_id` int DEFAULT NULL,
  PRIMARY KEY (`match_id`),
  UNIQUE KEY `pandascore_id` (`pandascore_id`),
  KEY `team1_id` (`team1_id`),
  KEY `team2_id` (`team2_id`),
  KEY `winner_id` (`winner_id`),
  CONSTRAINT `matches_ibfk_1` FOREIGN KEY (`team1_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE,
  CONSTRAINT `matches_ibfk_2` FOREIGN KEY (`team2_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE,
  CONSTRAINT `matches_ibfk_3` FOREIGN KEY (`winner_id`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE
);

CREATE TABLE `badges` (
  `badge_id` int NOT NULL AUTO_INCREMENT,
  `badge_name` text NOT NULL,
  `badge_image` text NOT NULL,
  PRIMARY KEY (`badge_id`)
);

CREATE TABLE `banners` (
  `banner_id` int NOT NULL AUTO_INCREMENT,
  `banner_name` text NOT NULL,
  `banner_image` text NOT NULL,
  PRIMARY KEY (`banner_id`)
); 

CREATE TABLE `bans` (
  `ban_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `start_date` date NOT NULL,
  `reason` text NOT NULL,
  PRIMARY KEY (`ban_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `bans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `federated_credentials` (
  `federated_credentials_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `provider` varchar(64) NOT NULL,
  `profile_id` varchar(21) NOT NULL,
  PRIMARY KEY (`federated_credentials_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `federated_credentials_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(99) NOT NULL,
  `category_description` varchar(99) NOT NULL,
  PRIMARY KEY (`category_id`)
);

CREATE TABLE `bets` (
  `bet_id` int NOT NULL AUTO_INCREMENT,
  `creator_id` int NULL,
  `category_id` int NOT NULL DEFAULT (1),
  `minimum_coins` int NOT NULL,
  `maximum_coins` int NOT NULL,
  `match_id` int NOT NULL,
  `bet_locked` tinyint(1) DEFAULT (false),
  `win_condition` int DEFAULT NULL,
  `win_condition2` int DEFAULT NULL,
  PRIMARY KEY (`bet_id`),
  KEY `creator_id` (`creator_id`),
  KEY `category_id` (`category_id`),
  KEY `match_id` (`match_id`),
  CONSTRAINT `bets_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `bets_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE,
  CONSTRAINT `bets_ibfk_3` FOREIGN KEY (`match_id`) REFERENCES `matches` (`match_id`) ON DELETE CASCADE
);

CREATE TABLE `bet_participants` (
  `bet_participant_id` int NOT NULL AUTO_INCREMENT,
  `bet_id` int NOT NULL,
  `user_id` int NOT NULL,
  `team_betted_on` int DEFAULT NULL,
  `amount_bet` int NOT NULL,
  `creation_date` datetime NOT NULL,
  `win_condition_chosen` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`bet_participant_id`),
  KEY `bet_id` (`bet_id`),
  KEY `team_betted_on` (`team_betted_on`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bet_participants_ibfk_1` FOREIGN KEY (`bet_id`) REFERENCES `bets` (`bet_id`) ON DELETE CASCADE,
  CONSTRAINT `bet_participants_ibfk_2` FOREIGN KEY (`team_betted_on`) REFERENCES `teams` (`team_id`) ON DELETE CASCADE,
  CONSTRAINT `bet_participants_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `friend_list` (
  `user_id` int NOT NULL,
  `friend_id` int NOT NULL,
  `confirmed` tinyint(1) DEFAULT (false),
  KEY `user_id` (`user_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `friend_list_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `friend_list_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
);

CREATE TABLE `user_badges` (
  `user_badge_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `badge_id` int DEFAULT NULL,
  PRIMARY KEY (`user_badge_id`),
  KEY `user_id` (`user_id`),
  KEY `badge_id` (`badge_id`),
  CONSTRAINT `user_badges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_badges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`badge_id`) ON DELETE CASCADE
);

CREATE TABLE `timeouts` (
  `timeouts_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `reason` text NOT NULL,
  PRIMARY KEY (`timeouts_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `timeouts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
);

CREATE TABLE `user_banners` (
  `user_banner_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `banner_id` int NOT NULL,
  PRIMARY KEY (`user_banner_id`),
  KEY `user_id` (`user_id`),
  KEY `banner_id` (`banner_id`),
  CONSTRAINT `user_banners_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `user_banners_ibfk_2` FOREIGN KEY (`banner_id`) REFERENCES `banners` (`banner_id`) ON DELETE CASCADE
);

INSERT INTO users (user_id,username, email, date_created) VALUES (1,"Bob the Bob","bob@mail.com", CURDATE());
INSERT INTO users (user_id,username, email, date_created) VALUES (2,"superbet","super@mail.com", CURDATE());
INSERT INTO users (user_id,username, email, date_created) VALUES (3,"John Long","john@mail.com", CURDATE());
INSERT INTO users (user_id,username, email, date_created) VALUES (4,"megaman","megaman@mail.com", CURDATE());
INSERT INTO users (user_id,username, email, date_created) VALUES (5,"abc","abc@mail.com", CURDATE());
INSERT INTO users (user_id,username, email, date_created) VALUES (6,"gamergaminggame","gamer@mail.com", CURDATE());

INSERT INTO  categories VALUES (1, "Match Bet", "Bet determined by the winner of the match");
INSERT INTO categories VALUES (2, "Match Before Duration Bet", "Bet determined by the match duration lasting before a specified time");
INSERT INTO categories VALUES (3, "Match After Duration Bet", "Bet determined by the match duration lasting after a specified time");
INSERT INTO categories VALUES (4, "Match Between Durations Bet", "Bet determined by the match duration lasting between two specified times");