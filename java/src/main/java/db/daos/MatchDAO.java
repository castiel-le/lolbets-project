package db.daos;

import db.DBManager;
import db.fileio.CSVReader;
import db.models.Match;
import db.models.Team;

import java.io.IOException;
import java.sql.*;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

/**
 * Data access object for the Matches table
 */
public class MatchDAO extends DAO {
    /**
     * Initializes connection field used for
     * interacting to the database
     *
     * @param con Connection Object for db
     */
    public MatchDAO(Connection con) {
        super(con);
    }

    /**
     * Insert Match into the database's Match table
     * @param m Match to be inserted
     * @param isPandaScoreNull if true: ignore pandaScoreId in Match object, if false: use pandaScoreId in Match object
     * @return true if successful, false if failed
     */
    public boolean add(Match m, boolean isPandaScoreNull) {
        String query = "INSERT INTO matches (team1_id, team2_id, winner_id, " +
                "match_start_time, in_progress, game_length, pandascore_id) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?)";

        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(query);

            // Add values to statement
            ps.setInt(1, m.getTeam1().getTeamId());
            ps.setInt(2, m.getTeam2().getTeamId());
            ps.setBoolean(5, m.isInProgress());
            ps.setInt(6, m.getGameLength());

            if (isPandaScoreNull) {
                ps.setNull(7, Types.NULL);
            } else {
                ps.setInt(7, m.getPandaScoreId());
            }

            // Set date using TimeStamp
            Long time = new java.sql.Date(m.getMatchStartTime().getTime()).getTime();
            ps.setTimestamp(4, new Timestamp(time));

            // Set null in statement if winner is null. Otherwise, set winner's team id.
            if (m.getWinner() == null) {
                ps.setNull(3, Types.NULL);
            } else {
                ps.setInt(3, m.getWinner().getTeamId());
            }

            // Execute query
            ps.executeUpdate();
            return true;
        } catch (SQLException  throwables) {
//            throwables.printStackTrace();
            rollback();
            return false;
        } finally {
            closeAndCommit(ps);
        }
    }

    /**
     * Update record of given Match from the database using the information on
     * this Match's values
     * @param m match to be updated
     * @return true if successful, false if failed
     */
    public boolean update(Match m) {
        String query = "UPDATE matches SET "
                + "team1_id = ?,"
                + "team2_id = ?,"
                + "winner_id = ?,"
                + "match_start_time = ?,"
                + "in_progress = ?,"
                + "game_length = ? "
                + "WHERE match_id = ?";

        PreparedStatement ps = null;
        try {
            ps = con.prepareStatement(query);

            // Add values to statement
            ps.setInt(1, m.getTeam1().getTeamId());
            ps.setInt(2, m.getTeam2().getTeamId());
            ps.setBoolean(5, m.isInProgress());
            ps.setInt(6, m.getGameLength());
            ps.setInt(7, m.getMatchId());

            // Set date using TimeStamp
            Long time = new java.sql.Date(m.getMatchStartTime().getTime()).getTime();
            ps.setTimestamp(4, new Timestamp(time));

            // Set null in statement if winner is null. Otherwise, set winner's team id.
            if (m.getWinner() == null) {
                ps.setNull(3, Types.NULL);
            } else {
                ps.setInt(3, m.getWinner().getTeamId());
            }

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
     * Returns the matches that are still in-progress
     * @return List of matches in-progress
     */
    public List<Match> selectInProgressMatches() {
        String query = "SELECT * FROM matches WHERE in_progress = 1";

        PreparedStatement ps = null;
        ResultSet rs = null;
        List<Match> matches = new ArrayList<Match>();
        try {
            ps = con.prepareStatement(query);

            // Execute query
            rs = ps.executeQuery();

            while (rs.next()) {
                matches.add(createMatch(rs));
            }
        } catch (SQLException | IOException throwables) {
//            throwables.printStackTrace();
            rollback();
        } finally {
            closeAndCommit(rs, ps);
        }
        return matches;
    }

    /**
     * Create Match object using the values from ResultSet
     * @param rs
     * @return Match object
     * @throws IOException
     * @throws SQLException
     */
    private Match createMatch(ResultSet rs) throws IOException, SQLException {
        TeamDAO tdao = new TeamDAO(DBManager.getInstance().getConnection());
        Team t1 = tdao.selectByTeamId(rs.getInt("team1_id"));
        Team t2 = tdao.selectByTeamId(rs.getInt("team2_id"));
        Team winner = tdao.selectByTeamId(rs.getInt("winner_id"));
        return new Match(rs.getInt("match_id"),
                t1, t2, winner, new java.util.Date(rs.getTimestamp("match_start_time").getTime()),
                rs.getBoolean("in_progress"), rs.getInt("game_length"),
                rs.getInt("pandascore_id"));
    }
      
}
