package db.models;

/**
 * Represents a record in the Team table on the database.
 */
public class Team {
    private int teamId;
    private String teamName;
    private String logo;
    private String abbreviation;
    private int wins;
    private int losses;

    /**
     * Creates a new Team object using the information in the arguments.
     * @param teamId team id
     * @param teamName team name
     * @param logo team logo
     * @param abbreviation team shortened name
     * @param wins team win count
     * @param losses team lose count
     * @throws IllegalArgumentException if one of the Stream arguments is null, or win/lose is negative
     */
    public Team (int teamId, String teamName, String logo, String abbreviation, int wins, int losses) {
        // Validate String arguments
        validateStringArgument(teamName);
        validateStringArgument(logo);
        validateStringArgument(abbreviation);

        // Validate wins and losses
        validateWinLoseCount(wins);
        validateWinLoseCount(losses);

        // Populate the fields
        this.teamId = teamId;
        this.teamName = teamName;
        this.logo = logo;
        this.abbreviation = abbreviation;
        this.wins = wins;
        this.losses = losses;
    }

    /**
     * Returns the team id
     * @return team id
     */
    public int getTeamId() {
        return teamId;
    }

    /**
     * Sets new team id
     * @param teamId new team id
     */
    public void setTeamId(int teamId) {
        this.teamId = teamId;
    }

    /**
     * Returns the team's name
     * @return team name
     */
    public String getTeamName() {
        return teamName;
    }

    /**
     * Sets new team name
     * @param teamName new team name
     * @throws IllegalArgumentException if new team name is null
     */
    public void setTeamName(String teamName) {
        validateStringArgument(teamName);
        this.teamName = teamName;
    }

    /**
     * Returns team's logo
     * @return team logo
     */
    public String getLogo() {
        return logo;
    }

    /**
     * Sets new team logo
     * @param logo new tea logo
     * @throws IllegalArgumentException if new team logo is null
     */
    public void setLogo(String logo) {
        validateStringArgument(logo);
        this.logo = logo;
    }

    /**
     * Returns the team's abbreviation
     * @return team's abbreviation
     */
    public String getAbbreviation() {
        return abbreviation;
    }

    /**
     * Sets new team's abbreviation
     * @param abbreviation new team's abbreviation
     * @throws IllegalArgumentException if new team abbreviation is null
     */
    public void setAbbreviation(String abbreviation) {
        validateStringArgument(abbreviation);
        this.abbreviation = abbreviation;
    }

    /**
     * Returns the team's win count
     * @return team's win count
     */
    public int getWins() {
        return wins;
    }

    /**
     * Sets the team's new win count
     * @param wins new win count
     * @throws IllegalArgumentException if win count is negative
     */
    public void setWins(int wins) {
        validateWinLoseCount(wins);
        this.wins = wins;
    }

    /**
     * Returns the team's lose count
     * @return team's lose count
     */
    public int getLosses() {
        return losses;
    }

    /**
     * Sets the team's new lose count
     * @param losses new lose count
     * @throws IllegalArgumentException if lose count is negative
     */
    public void setLosses(int losses) {
        validateWinLoseCount(losses);
        this.losses = losses;
    }

    /**
     * Determines if the given win/lose count valid
     * @param count the win/lose count to be validated
     * @throws IllegalArgumentException if win/lose count is negative
     */
    private void validateWinLoseCount(int count) {
        if (count < 0) {
            throw new IllegalArgumentException("Win/Lose count cannot be negative");
        }
    }

    /**
     * Determines if the String for team name/logo/abbreviation is valid.
     * @param s the string to be validated
     * @throws IllegalArgumentException if String is invalid
     */
    private void validateStringArgument(String s) {
        if (s == null) {
            throw new IllegalArgumentException("String argument cannot be null");
        }
    }

    @Override
    public boolean equals(Object o) {
        // Validate if Object is a Team object
        if (!(o instanceof Team)) {
            return false;
        }

        // Validate if Team is an instance of this object
        if (o == this) {
            return true;
        }

        // Compare fields and return the result
        Team b = (Team) o;
        return this.getTeamId() == b.getTeamId()
                && this.getTeamName().equals(b.getTeamName())
                && this.getLogo().equals(b.getLogo())
                && this.getAbbreviation().equals(b.getAbbreviation())
                && this.getWins() == b.getWins()
                && this.getLosses() == b.getLosses();
    }
}
