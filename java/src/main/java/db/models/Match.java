package db.models;

import java.util.Date;

/**
 * Represents a record in Match table from the database.
 */
public class Match {
    private int matchId;
    private Team team1;
    private Team team2;
    private Team winner;
    private Date matchStartTime;
    private boolean inProgress;
    private int gameLength;
    private int pandaScoreId;

    /**
     * Creates a new Match object using the information from the arguments.
     * @param matchId match id
     * @param team1 team 1 playing in this match
     * @param team2 team 2 playing in this watch
     * @param winner which team won
     * @param matchStartTime start time of match
     * @param inProgress is the match in progress?
     * @param gameLength length of the game in seconds
     * @throws IllegalArgumentException if one of the arguments is invalid
     */
    public Match(int matchId, Team team1, Team team2, Team winner, Date matchStartTime,
                 boolean inProgress, int gameLength, int pandaScoreId) {
        // Verify arguments
        validateGameLength(gameLength);
        validateMatchStartTime(matchStartTime);
        validateTeam(team1);
        validateTeam(team2);

        // Populate the fields
        this.matchId = matchId;
        this.team1 = team1;
        this.team2 = team2;

        this.matchStartTime = matchStartTime;
        this.inProgress = inProgress;
        this.gameLength = gameLength;
        this.pandaScoreId = pandaScoreId;

        // Validate winner
        validateWinner(winner);
        this.winner = winner;
    }

    /**
     * Returns the match id
     * @return match id
     */
    public int getMatchId() {
        return matchId;
    }

    /**
     * Sets the new match id
     * @param matchId new match id
     */
    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }

    /**
     * Returns the team 1 playing in this match
     * @return team 1
     */
    public Team getTeam1() {
        return team1;
    }

    /**
     * Sets the new team 1 playing in this match
     * @param team1 new team 1
     * @throws IllegalArgumentException if team object is null
     */
    public void setTeam1(Team team1) {
        validateTeam(team1);
        this.team1 = team1;
    }

    /**
     * Returns the team 2 playing in this match
     * @return team 2
     */
    public Team getTeam2() {
        return team2;
    }

    /**
     * Sets the new team 2 playing in this match
     * @param team2 new team 2
     * @throws IllegalArgumentException if team object is null
     */
    public void setTeam2(Team team2) {
        validateTeam(team2);
        this.team2 = team2;
    }

    /**
     * Returns the pandaScoreId  in this match
     * @return pandaScoreId
     */
    public int getPandaScoreId() {
        return pandaScoreId;
    }

    /**
     * Sets the new team 2 playing in this match
     * @param pandaScoreId new pandaScoreId
     * @throws IllegalArgumentException if team object is null
     */
    public void setPandaScoreId(int pandaScoreId) {
        this.pandaScoreId = pandaScoreId;
    }

    /**
     * Returns the team that won this match
     * @return team winner
     */
    public Team getWinner() {
        return winner;
    }

    /**
     * Sets the new team winner of this match
     * @param winner new team winner.
     * @throws IllegalArgumentException if winner is not from the two teams
     */
    public void setWinner(Team winner) {
        validateWinner(winner);
        this.winner = winner;
    }

    /**
     * Returns the match's start time
     * @return match start time
     */
    public Date getMatchStartTime() {
        return matchStartTime;
    }

    /**
     * Sets the new match's start time
     * @param matchStartTime new match's start time
     * @throws IllegalArgumentException if the Date for match start time is invalid
     */
    public void setMatchStartTime(Date matchStartTime) {
        validateMatchStartTime(matchStartTime);
        this.matchStartTime = matchStartTime;
    }

    /**
     * Returns true if the match is in progress. Otherwise, false.
     * @return boolean - true if in process, false if not
     */
    public boolean isInProgress() {
        return inProgress;
    }

    /**
     * Sets the new state if the match is in progress or not
     * @param inProgress new state of match in progress
     */
    public void setInProgress(boolean inProgress) {
        this.inProgress = inProgress;
    }

    /**
     * Returns the game's length in seconds
     * @return game's length
     */
    public int getGameLength() {
        return gameLength;
    }

    /**
     * Sets the new game's length
     * @param gameLength new game length
     * @throws IllegalArgumentException if game length is invalid
     */
    public void setGameLength(int gameLength) {
        validateGameLength(gameLength);
        this.gameLength = gameLength;
    }

    /**
     * Verifies if the given game length is valid by checking if it is not a negative value.
     * @param gameLength the game length to be checked.
     * @throws IllegalArgumentException if game length is negative
     */
    private void validateGameLength(int gameLength) {
        if (gameLength < 0) {
            throw  new IllegalArgumentException("Game length cannot be negative");
        }
    }

    /**
     * Determines if winner is valid by checking if it is from
     * the two teams in this match
     * @param winner Team winner to be validated
     * @throws IllegalArgumentException if team winner is not from the two teams
     */
    private void validateWinner(Team winner) {
        if (winner != null) {
            if (!(winner.equals(this.team1) || winner.equals(this.team2))) {
                throw new IllegalArgumentException("Winner must be from the two teams in this match");
            }
        }
    }

    /**
     * Determines if Date object for match start time is valid.
     * @param matchStartTime Date object to be verified
     * @throws IllegalArgumentException if Date object is invalid
     */
    private void validateMatchStartTime(Date matchStartTime) {
        if (matchStartTime == null) {
            throw new IllegalArgumentException("Match start time cannot be null");
        }
    }

    /**
     * Determines if Team object is valid
     * @param team team to be validated
     * @throws IllegalArgumentException if team is invalid
     */
    private void validateTeam(Team team) {
        if (team == null) {
            throw new IllegalArgumentException("Team Object cannot be null");
        }
    }
}
