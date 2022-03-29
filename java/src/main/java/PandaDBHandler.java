import api_caller.pandascore.PandaScoreCaller;
import api_caller.pandascore.UpcomingMatch;
import db.DBManager;
import db.daos.MatchDAO;
import db.daos.TeamDAO;
import db.models.Match;
import db.models.Team;

import java.io.IOException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

/**
 * Handles transactions between PandaScore API and MySQL database.
 */
public class PandaDBHandler {
    /**
     * Removes teams with no match history.
     * @throws IOException
     */
    public static void removeUnrecordedTeams() throws IOException {
        new TeamDAO(DBManager.getInstance().getConnection()).removeUnrecordedTeams();
    }

    /**
     * Updates in-progress matches from db based on PandaScore.
     * @throws IOException
     */
    public void updateInProgressMatches() throws IOException {
        System.out.println("Updating in-progress matches...");
        MatchDAO mdao = new MatchDAO(DBManager.getInstance().getConnection());
        PandaScoreCaller caller = new PandaScoreCaller();

        List<Match> matches = mdao.selectInProgressMatches();
        for (int i = 0; i < matches.size(); i++) {
            Match m = matches.get(i);
            String matchDescription = m.getMatchId() + " "
                    + m.getTeam1().getAbbreviation() + " vs "
                    + m.getTeam2().getAbbreviation() + " "
                    + m.getMatchStartTime();
            boolean result = caller.updateMatch(m);

            if (result) {
                mdao.update(m);
                System.out.println("\tUpdated " + matchDescription);
            } else {
                System.out.println("\tNo updates " + matchDescription);
            }
        }
        System.out.println("Updated in-progress matches.");
    }

    /**
     * Gets upcoming matches from PandaScore and add it to db.
     * @throws IOException
     * @throws ParseException
     */
    public void addUpcomingMatches() throws IOException, ParseException {
        System.out.println("Adding upcoming matches...");
        PandaScoreCaller caller = new PandaScoreCaller();
        MatchDAO mdao = new MatchDAO(DBManager.getInstance().getConnection());

        List<UpcomingMatch> upcomingMatches = caller.getUpcomingMatches("LCS");
        for (int i = 0; i < upcomingMatches.size(); i++) {
            UpcomingMatch um = upcomingMatches.get(i);
            String matchDescription = um.getPandaScoreId() + " " + um.getTeam1Abbreviation() + " vs "
                    + um.getTeam2Abbreviation() + " " + um.getDate();
            try {
                boolean result = mdao.add(createNewMatch(um), false);
                if (result) {
                    System.out.println("\tAdded " + matchDescription);
                } else {
                    System.out.println("\tFailed " + matchDescription);
                }
            } catch (IllegalArgumentException e) {
                System.out.println("\tInvalid " + matchDescription);
                continue;
            }
        }
        System.out.println("Matches added.");
    }

    /**
     * Adds teams taken from PandaScore and add it to db
     * @throws IOException
     * @throws ParseException
     */
    public void addTeams() throws IOException, ParseException {
        PandaScoreCaller caller = new PandaScoreCaller();

        System.out.println("Adding teams...");
//        addTeamsToDB(caller.getTeams("US"));
//        addTeamsToDB(caller.getTeams("NL"));
        addTeamsToDB(caller.getTeams());
        System.out.println("Teams added.");
    }

    /**
     * Adds teams from the list into the database
     * @param teams list of teams to be added
     */
    private void addTeamsToDB(List<Team> teams) throws IOException {
        TeamDAO tdao = new TeamDAO(DBManager.getInstance().getConnection());
        for(int i = 0; i < teams.size(); i++) {
            Team t = teams.get(i);
            boolean result = tdao.add(t);
            if (result) {
                System.out.println("\tAdded " + t.getTeamName());
            } else {
                System.out.println("\tFAILED " + t.getTeamName());
            }

        }
    }

    /**
     * Creates a new Match objecting using the information from UpcomingMatch values
     * @param um upcoming match
     * @return Match object for upcoming match
     */
    private Match createNewMatch(UpcomingMatch um) throws IOException {
        TeamDAO tdao = new TeamDAO(DBManager.getInstance().getConnection());
        Team t1 = tdao.selectByAbbreviation(um.getTeam1Abbreviation());
        Team t2 = tdao.selectByAbbreviation(um.getTeam2Abbreviation());
        return new Match(0, t1, t2, null, um.getDate(), true, 0, um.getPandaScoreId());
    }
}
