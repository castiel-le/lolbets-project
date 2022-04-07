package db;

import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

/**
 * Used to connect to MySQL database based from the
 * db config file.
 */
public class DBManager {
    private static final String FILE_NAME = "db.config";
    private static final String PROPERTY_URL = "db.url";
    private static final String PROPERTY_TABLE = "db.table";
    private static final String PROPERTY_USERNAME  = "db.user";
    private static final String PROPERTY_PASSWORD = "db.pass";
    private static DBManager instance = new DBManager();
    private static Connection connection;

    /**
     * Constructor is set to private to prevent instantiation.
     */
    private DBManager(){}

    /**
     * Returns the DBManager instance. Initializes DBManager if it is
     * not already instantiated.
     * @return DBManager object
     */
    public static DBManager getInstance() {
        if (instance == null) {
            instance = new DBManager();
        }
        return instance;
    }

    /**
     * Returns the Connection object for performing db actions. If
     * the Connection object is not yet instantiated, it will attempt
     * to connect to the database.
     * @return Connection object
     * @throws IOException thrown when failed to read db.config
     */
    public Connection getConnection() throws IOException {
        if (connection == null) {
            FileInputStream file = null;
            try {
                // Get credentials
                file = new FileInputStream(FILE_NAME);
                Properties properties = new Properties();
                properties.load(file);

                // Connect to to database
                Class.forName("com.mysql.cj.jdbc.Driver");
                connection = DriverManager.getConnection(
                        "jdbc:mysql://" + properties.getProperty(PROPERTY_URL) + "/"
                                + properties.getProperty(PROPERTY_TABLE),
                        properties.getProperty(PROPERTY_USERNAME),
                        properties.getProperty(PROPERTY_PASSWORD));

                connection.setAutoCommit(false);
                System.out.println("Connected to MySQL database on the Azure server");
            } catch (Exception e) {
                System.out.println("Failed to connect: " + e);
            } finally {
                if (file != null) {
                    file.close();
                }
            }
        }
        return connection;
    }

    /**
     * Closes the connection to the database from the Connection
     * object.
     */
    public void closeConnection() {
        try {
            if (connection != null) {
                connection.close();
                System.out.println("Connection closed");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
