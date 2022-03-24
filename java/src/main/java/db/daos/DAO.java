package db.daos;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DAO {
    protected Connection con;

    /**
     * Initializes connection field used for
     * interacting to the database
     * @param con Connection Object for db
     */
    public DAO(Connection con) {
        this.con = con;
    }

    /**
     * This method is used to close a ResultSet and a PreparedStatement from the
     * database connection. It  will commit any changes.
     * @param rs ResultSet object
     * @param ps PreparedStatement object
     */
    public void closeAndCommit(ResultSet rs, PreparedStatement ps) {
        try {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
            if (con != null) {
                con.commit();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * This method is used to close a PreparedStatement from the
     * database connection. It  will commit any changes.
     * @param ps PreparedStatement object
     */
    public void closeAndCommit(PreparedStatement ps) {
        try {
            if (ps != null) {
                ps.close();
            }
            if (con != null) {
                con.commit();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    /**
     * This method will rollback the database to the previous commit. It
     * is recommended to use this method whenever there is an SQLException
     * from UPDATE/DELETE/ALTER statements.
     */
    public void rollback() {
        try {
            if (con != null) {
                con.rollback();
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }
}
