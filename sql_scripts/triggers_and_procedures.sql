/**
This script creates procdures and triggers for LoLBets database.
ONLY RUN THIS AFTER POPULATING THE DATABASE
*/

USE lolbets;
DROP PROCEDURE IF EXISTS createUpdateUserBets;
DROP PROCEDURE IF EXISTS distributeCoins;
DROP PROCEDURE IF EXISTS distributeWinsLosses;
DROP PROCEDURE IF EXISTS insert_bet_when_new_match;
DROP PROCEDURE IF EXISTS subtract_coins_for_user;

DROP TRIGGER IF EXISTS update_user_coins_new_bet;
DROP TRIGGER IF EXISTS update_user_coins_existing_bet;
DROP TRIGGER IF EXISTS update_user_coins_delete_bet;
DROP TRIGGER IF EXISTS create_bet_new_match;
DROP TRIGGER IF EXISTS update_win_losses;
DROP TRIGGER IF EXISTS update_coins_after_match;

DELIMITER $$
CREATE PROCEDURE `createUpdateUserBets`(IN matchid INT, IN userid INT, IN creatorid INT, IN categoryid INT)
BEGIN
	DECLARE betid INT default 0;
    DECLARE amountCoins INT default 0;
    
    SELECT bet_id INTO betid FROM bets WHERE match_id = matchid;
    SELECT coins INTO amountCoins FROM users WHERE user_id = userid;
    
    IF (betid > 0) THEN
		IF (amountCoins > 0) THEN
			
            INSERT INTO bets (bet_id, creator_id, category_id, minimum_coins, maximum_coins, 
								match_id, bet_locked)
			VALUES (betid, creatorid, categoryid, 0, 999, matchid, 0);
		END IF;
	END IF;
 
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `distributeCoins`(IN winnerid INT, IN matchid INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE userid INT;
    DECLARE betparticipantid INT;
    DECLARE betid INT;
    DECLARE amount INT;
    DECLARE usercoins INT;
    DECLARE teambettedon INT;
    DECLARE categoryId INT;
    DECLARE betparticipant_betid INT;
    DECLARE winCondition INT;
    DECLARE winCondition2 INT;
    DECLARE winConditionChosen INT;
    DECLARE gameLength INT;
    DECLARE bets CURSOR FOR
		SELECT bet_id, category_id, win_condition, win_condition2 FROM bets WHERE match_id = matchid;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    IF (winnerid IS NOT NULL) THEN
        OPEN bets;
        bets_loop: LOOP
			/*Get bet id, category id, win condition, and win condition 2*/
			FETCH bets INTO betId, categoryId, winCondition, winCondition2;
            IF done THEN
				LEAVE bets_loop;
			END IF;
            
            /*Start loop on betters*/
            BLOCK2: 
            BEGIN
				DECLARE done2 INT DEFAULT FALSE;
				DECLARE betters CURSOR FOR
					SELECT user_id, bet_participant_id, win_condition_chosen FROM bet_participants 
					WHERE bet_id = betId;
				DECLARE CONTINUE HANDLER FOR NOT FOUND SET done2 = TRUE;
				OPEN betters;
				betters_loop: LOOP
					/*Get user id, bet participant id, win condition chosen*/
					FETCH betters INTO userid, betparticipantid, winConditionChosen;
					IF done2 THEN
						LEAVE betters_loop;
					END IF;
					/*Get bet amount, coins of user, match duration*/
					SELECT amount_bet INTO amount FROM bet_participants WHERE bet_participant_id = betparticipantid;
					SELECT coins INTO usercoins FROM users WHERE user_id = userid;
                    SELECT game_length INTO gameLength FROM matches WHERE match_id = matchId;
					/*Check if category where the win condition is the match winner*/
					IF (categoryId = 1) THEN
						SELECT team_betted_on INTO teambettedon FROM bet_participants WHERE bet_participant_id = betparticipantid;
						IF (teambettedon = winnerid) THEN
							UPDATE users SET coins = usercoins + (amount*2) WHERE user_id = userid;
						END IF;
					END IF;
					/*Check if category where win condition is match lasting before a specified time*/
					IF (categoryId = 2) THEN	
						IF (gameLength <= winCondition AND winConditionChosen) THEN
							UPDATE users SET coins = usercoins + amount WHERE user_id = userid;
						END IF;
					/*Check if category where win condition is match lasting after a specified time*/
					ELSEIF (categoryId = 3) THEN
						IF (gameLength >= winCondition AND winConditionChosen) THEN
							UPDATE users SET coins = usercoins + amount WHERE user_id = userid;
						END IF;
					/*Check if category where win condition is match lasting between two specified times*/
					ELSEIF (categoryId = 4) THEN
						IF (gameLength >= winCondition AND gameLength <= winCondition2 AND winConditionChosen) THEN
							UPDATE users SET coins = usercoins + amount WHERE user_id = userid;
						END IF;
					END IF; 
				END LOOP;
			END BLOCK2;
		END LOOP;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `distributeWinsLosses`(IN winnerid INT, IN matchid INT)
BEGIN
	DECLARE teamWinner INT;
	DECLARE teamLoss INT;
    DECLARE team1 INT;
    DECLARE team2 INT;
    DECLARE numberWin INT;
    DECLARE numberLoss INT;
	
    IF (winnerid IS NOT NULL) THEN
		SELECT team1_id INTO team1 FROM matches WHERE match_id = matchid;
		SELECT team2_id INTO team2 FROM matches WHERE match_id = matchid;
		
		IF (team1 = winnerid) THEN
			SET teamWinner = team1;
		ELSE
			SET teamWinner = team2;
		END IF;
		
		IF (team2 != winnerid) THEN
			SET teamLoss = team2;
		ELSE
			SET teamLoss = team1;
		END IF;
		
		SELECT wins INTO numberWin FROM teams WHERE team_id = teamWinner;
		SELECT losses INTO numberLoss FROM teams WHERE team_id = teamLoss;
		
		UPDATE teams SET wins = numberWin + 1 WHERE team_id = teamWinner;
		UPDATE teams SET losses = numberLoss + 1 WHERE team_id = teamLoss;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `insert_bet_when_new_match`(IN match_id_input INT)
BEGIN
	IF match_id_input > 0 THEN
		INSERT INTO bets (creator_id, category_id, minimum_coins, maximum_coins, match_id, bet_locked) values (null, 1, 1, 999, match_id_input, 0);
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE subtract_coins_for_user (IN user_id_input INT, IN subtract_amount INT, IN bet_id_input INT)
BEGIN
	DECLARE user_max_coins INT;
    DECLARE categoryId INT;
	select coins into user_max_coins from users where user_id = user_id_input;
    select category_id into categoryid from bets where bet_id = bet_id_input;
	IF (subtract_amount <= user_max_coins AND categoryId = 1) THEN
		update users set coins = user_max_coins-subtract_amount where user_id = user_id_input;
	END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER update_user_coins_new_bet AFTER INSERT ON bet_participants
FOR EACH ROW
BEGIN
 		CALL subtract_coins_for_user (NEW.user_id, NEW.amount_bet, NEW.bet_id);
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER update_user_coins_existing_bet AFTER UPDATE ON bet_participants
FOR EACH ROW
BEGIN
 		IF (NEW.amount_bet >= OLD.amount_bet) THEN
 			CALL subtract_coins_for_user (NEW.user_id, NEW.amount_bet-OLD.amount_bet, NEW.bet_id);
 		ELSE
 			CALL subtract_coins_for_user (NEW.user_id, -(OLD.amount_bet-NEW.amount_bet), NEW.bet_id);
 		END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER update_user_coins_delete_bet AFTER DELETE ON bet_participants
FOR EACH ROW
BEGIN
 		CALL subtract_coins_for_user(OLD.user_id, -(OLD.amount_bet), OLD.bet_id);
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER create_bet_new_match AFTER INSERT ON matches
FOR EACH ROW
BEGIN
 		CALL insert_bet_when_new_match(NEW.match_id);
END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER update_win_losses AFTER UPDATE ON matches
FOR EACH ROW
BEGIN
     CALL distributeWinsLosses (NEW.winner_id, NEW.match_id);
 END$$
DELIMITER ;

DELIMITER $$
CREATE TRIGGER update_coins_after_match AFTER UPDATE ON matches
FOR EACH ROW
BEGIN
 	CALL distributeCoins(NEW.winner_id, NEW.match_id);
 END$$
DELIMITER ;


