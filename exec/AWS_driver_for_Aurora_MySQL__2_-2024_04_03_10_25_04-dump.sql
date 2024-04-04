-- MySQL dump 10.13  Distrib 8.1.0, for macos13 (arm64)
--
-- Host: j10a107.p.ssafy.io    Database: daumnal
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `background_music`
--

DROP TABLE IF EXISTS `background_music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `background_music` (
                                    `id` bigint NOT NULL AUTO_INCREMENT,
                                    `created_at` varchar(255) NOT NULL,
                                    `title` varchar(255) NOT NULL,
                                    `updated_at` varchar(255) NOT NULL,
                                    `youtube_id` varchar(255) NOT NULL,
                                    `category` enum('MUSIC','EFFECT') NOT NULL,
                                    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `diary`
--

DROP TABLE IF EXISTS `diary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diary` (
                         `emotion_id` bigint NOT NULL,
                         `id` bigint NOT NULL AUTO_INCREMENT,
                         `member_id` bigint NOT NULL,
                         `music_id` bigint DEFAULT NULL,
                         `content` text,
                         `created_at` varchar(255) NOT NULL,
                         `hash_tag` varchar(255) DEFAULT NULL,
                         `lyrics_line_number` varchar(255) DEFAULT NULL,
                         `photo_url` text,
                         `title` varchar(255) DEFAULT NULL,
                         `updated_at` varchar(255) NOT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `UK_4en5atou62nlw43qp3xss6p21` (`emotion_id`),
                         KEY `FKbyluyva0mxnf5jitf297oxlxd` (`member_id`),
                         CONSTRAINT `FKbyluyva0mxnf5jitf297oxlxd` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE,
                         CONSTRAINT `FKrdkgdwq9wkm91rjn9dbb44edi` FOREIGN KEY (`emotion_id`) REFERENCES `emotion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=256 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `emotion`
--

DROP TABLE IF EXISTS `emotion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emotion` (
                           `angry` int DEFAULT NULL,
                           `disgust` int DEFAULT NULL,
                           `fear` int DEFAULT NULL,
                           `happiness` int DEFAULT NULL,
                           `neutral` int DEFAULT NULL,
                           `sadness` int DEFAULT NULL,
                           `surprise` int DEFAULT NULL,
                           `id` bigint NOT NULL AUTO_INCREMENT,
                           `created_at` varchar(255) NOT NULL,
                           `updated_at` varchar(255) NOT NULL,
                           PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=906 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
                          `status` tinyint NOT NULL DEFAULT '1',
                          `background_music_id` bigint NOT NULL DEFAULT '1',
                          `id` bigint NOT NULL AUTO_INCREMENT,
                          `social_id` bigint NOT NULL,
                          `created_at` varchar(255) NOT NULL,
                          `nickname` varchar(255) DEFAULT NULL,
                          `updated_at` varchar(255) NOT NULL,
                          `social_provider` enum('KAKAO','NAVER') NOT NULL,
                          PRIMARY KEY (`id`),
                          CONSTRAINT `member_chk_1` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `music`
--

DROP TABLE IF EXISTS `music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `music` (
                         `emotion_id` bigint NOT NULL,
                         `id` bigint NOT NULL AUTO_INCREMENT,
                         `cover_url` varchar(3000) DEFAULT 'https://daumnal.s3.ap-northeast-2.amazonaws.com/musicCover/basic_cover.jpg',
                         `created_at` varchar(255) NOT NULL,
                         `lyrics` text NOT NULL,
                         `singer_name` varchar(255) NOT NULL,
                         `title` varchar(255) NOT NULL,
                         `updated_at` varchar(255) NOT NULL,
                         `youtube_id` varchar(255) NOT NULL,
                         `category` enum('SPRING','SUMMER','FALL','WINTER') DEFAULT NULL,
                         PRIMARY KEY (`id`),
                         UNIQUE KEY `UK_354h0015p51w6dy54kq4j22m` (`emotion_id`),
                         CONSTRAINT `FKnm42vebn5e2as1rj6uekxflaj` FOREIGN KEY (`emotion_id`) REFERENCES `emotion` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=436 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
                            `id` bigint NOT NULL AUTO_INCREMENT,
                            `member_id` bigint NOT NULL,
                            `cover_url` varchar(255) DEFAULT 'https://daumnal.s3.ap-northeast-2.amazonaws.com/PLAYLIST_COVER_PATH/playlist_default.png',
                            `created_at` varchar(255) NOT NULL,
                            `name` varchar(255) DEFAULT NULL,
                            `updated_at` varchar(255) NOT NULL,
                            PRIMARY KEY (`id`),
                            KEY `FK6hbs7umbi3am8pojtkwx7dik4` (`member_id`),
                            CONSTRAINT `FK6hbs7umbi3am8pojtkwx7dik4` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Table structure for table `playlist_music`
--

DROP TABLE IF EXISTS `playlist_music`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist_music` (
                                  `music_id` bigint NOT NULL,
                                  `playlist_id` bigint NOT NULL,
                                  PRIMARY KEY (`music_id`,`playlist_id`),
                                  KEY `FKq9o07ljjk03aeeqt0q9lwhndk` (`playlist_id`),
                                  CONSTRAINT `FK5g0xtl5e89uycye0jo1ll65sq` FOREIGN KEY (`music_id`) REFERENCES `music` (`id`) ON DELETE CASCADE,
                                  CONSTRAINT `FKq9o07ljjk03aeeqt0q9lwhndk` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-03 19:39:02
