package api_caller.pandascore;

import java.util.Date;

/**
 * Represents an upcoming match based from PandaScore.
 */
public class UpcomingMatch {
    private Date date;
    private String team1Abbreviation;
    private String team2Abbreviation;
    private int pandaScoreId;

    /**
     * Represents an upcoming match based from PandaScore.
     * @param date match date/time
     * @param team1Abbreviation team 1's abbreviation
     * @param team2Abbreviation team 2's abbreviation
     * @throws IllegalArgumentException thrown when one of the argument is null
     */
    public UpcomingMatch(Date date, String team1Abbreviation, String team2Abbreviation, int pandaScoreId) {
        if (team1Abbreviation == null || team2Abbreviation == null || date == null) {
            throw new IllegalArgumentException("Arguments cannot be null");
        }

        this.date = date;
        this.team1Abbreviation = team1Abbreviation;
        this.team2Abbreviation = team2Abbreviation;
        this.pandaScoreId = pandaScoreId;
    }

    /**
     * Returns the date/time of this match.
     * @return match date/time
     */
    public Date getDate() {
        return date;
    }

    /**
     * Returns the team 1 of this match.
     * @return Team 1 abbreviation
     */
    public String getTeam1Abbreviation() {
        return team1Abbreviation;
    }

    /**
     * Returns the team 2 of this match.
     * @return Team 2 abbreviation
     */
    public String getTeam2Abbreviation() {
        return team2Abbreviation;
    }

    /**
     * Returns the match's PandaScore id
     * @return PandaScore id
     */
    public int getPandaScoreId() {
        return pandaScoreId;
    }

}
