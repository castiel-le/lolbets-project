package db.daos;

import db.models.Team;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Data access object for the Team table
 */
public class TeamDAO extends DAO {
    /**
     * Initializes connection field used for
     * interacting to the database
     *
     * @param con Connection Object for db
     */
    public TeamDAO(Connection con) {
        super(con);
    }

    /**
     * Insert Team into the database's Team table
     * @param t Team to be inserted
     * @return true if successful, false if failed
     */
    public boolean add(Team t) {
        String query = "INSERT INTO teams (team_name, logo, abbreviation, wins, losses) "
                + "VALUES (?, ?, ?, ?, ?)";

        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(query);

            // Add values to statement
            ps.setString(1, t.getTeamName());
            ps.setString(2, t.getLogo());
            ps.setString(3, t.getAbbreviation());
            ps.setInt(4, t.getWins());
            ps.setInt(5, t.getLosses());

            // Execute query
            ps.executeUpdate();
            return true;
        } catch (SQLException throwables) {
//            throwables.printStackTrace();
            rollback();
            return false;
        } finally {
            closeAndCommit(ps);
        }
    }

    /**
     * Update record of given Team from the database using the information on
     * this Team's values
     * @param t team to be updated
     * @return true if successful, false if failed
     */
    public boolean update(Team t) {
        String query = "UPDATE teams SET "
                + "team_name = ?,"
                + "logo = ?,"
                + "abbreviation = ?,"
                + "wins = ?,"
                + "losses = ? "
                + "WHERE team_id = ?";

        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(query);

            // Add values to statement
            ps.setString(1, t.getTeamName());
            ps.setString(2, t.getLogo());
            ps.setString(3, t.getAbbreviation());
            ps.setInt(4, t.getWins());
            ps.setInt(5, t.getLosses());
            ps.setInt(6, t.getTeamId());

            // Execute query
            ps.executeUpdate();
            return true;
        } catch (SQLException throwables) {
//            throwables.printStackTrace();
            rollback();
            return false;
        } finally {
            closeAndCommit(ps);
        }
    }

    /**
     * Finds a record of Team in the database that matches
     * the team named in the argument
     * @param teamName name of team to retrieve from db
     * @return Team's info in Team object. Null if no record found.
     */
    public Team selectByTeamName(String teamName) {
        String query = "SELECT * FROM teams WHERE LOWER(team_name) = LOWER(?)";

        PreparedStatement ps = null;
        ResultSet rs = null;
        Team t = null;
        try {
            ps = con.prepareStatement(query);

            // Add values to statement
            ps.setString(1, teamName);

            // Execute query
            rs = ps.executeQuery();

            while (rs.next()) {
                t = new Team(
                        rs.getInt("team_id"),
                        rs.getString("team_name"),
                        rs.getString("logo"),
                        rs.getString("abbreviation"),
                        rs.getInt("wins"),
                        rs.getInt("losses")
                        );
            }
        } catch (SQLException throwables) {
//            throwables.printStackTrace();
            rollback();
        } finally {
            closeAndCommit(rs, ps);
        }
        return t;
    }

    /**
     * Finds a record of Team in the database that matches
     * the team named in the argument
     * @param abbreviation  abbreviation of team to retrieve from db
     * @return Team's info in Team object. Null if no record found.
     */
    public Team selectByAbbreviation(String abbreviation) {
        String query = "SELECT * FROM teams WHERE LOWER(abbreviation) = LOWER(?)";

        PreparedStatement ps = null;
        ResultSet rs = null;
        Team t = null;
        try {
            ps = con.prepareStatement(query);

            // Add values to statement
            ps.setString(1, abbreviation);

            // Execute query
            rs = ps.executeQuery();

            while (rs.next()) {
                t = new Team(
                        rs.getInt("team_id"),
                        rs.getString("team_name"),
                        rs.getString("logo"),
                        rs.getString("abbreviation"),
                        rs.getInt("wins"),
                        rs.getInt("losses")
                );
            }
        } catch (SQLException throwables) {
//            throwables.printStackTrace();
            rollback();
        } finally {
            closeAndCommit(rs, ps);
        }
        return t;
    }

    /**
     * Finds the team with the given team id in db.
     * @param teamId team id to be retrieved
     */
    public Team selectByTeamId(int teamId) {
        String query = "SELECT * FROM teams WHERE team_id = ?";

        PreparedStatement ps = null;
        ResultSet rs = null;
        Team t = null;
        try {
            ps = con.prepareStatement(query);

            // Add values to statement
            ps.setInt(1, teamId);

            // Execute query
            rs = ps.executeQuery();

            while (rs.next()) {
                t = new Team(
                        rs.getInt("team_id"),
                        rs.getString("team_name"),
                        rs.getString("logo"),
                        rs.getString("abbreviation"),
                        rs.getInt("wins"),
                        rs.getInt("losses")
                );
            }
        } catch (SQLException throwables) {
//            throwables.printStackTrace();
            rollback();
        } finally {
            closeAndCommit(rs, ps);
        }
        return t;
    }

    /**
     * Removes Team records where they have no match history in the database.
     */
    public void removeUnrecordedTeams() {
        String query = "DELETE FROM teams WHERE team_id IN " +
                "(SELECT team_id FROM (SELECT team_id FROM teams LEFT OUTER JOIN matches " +
                "ON team_id = team1_id OR team_id = team2_id WHERE match_id IS NULL) temp)";

        PreparedStatement ps = null;

        try {
            ps = con.prepareStatement(query);

            // Execute query
             ps.executeUpdate();
        } catch (SQLException throwables) {
//            throwables.printStackTrace();
            rollback();
        } finally {
            closeAndCommit(ps);
         }
    }
}
