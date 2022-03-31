package api_caller.pandascore;

import api_caller.pandascore.UpcomingMatch;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import db.models.Match;
import db.models.Team;

import java.awt.*;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.*;
import java.util.List;

/**
 * Handles API calls for getting upcoming matches from PandaScore.
 */
public class PandaScoreCaller {
    private static final String PROPERTY_URL_UPCOMING = "url.upcoming";
    private static final String PROPERTY_URL_PAST = "url.past";
    private static final String PROPERTY_URL_TEAMS = "url.teams";
    private static final String PROPERTY_BEARER_TOKEN = "token";
    private static final String FILE_NAME = "pandascore.config";
    private static final String PROPERTY_LCS_ID = "lcs_id";
    private static final String LCS = "LCS";

    /**
     * Gets the upcoming matches for the current date from PandaScore.
     * @param serie The serie's name
     * @return List of UpcomingMatches
     */
    public List<UpcomingMatch> getUpcomingMatches(String serie) throws IOException, ParseException {
        Properties properties = this.getProperties();
        ObjectMapper mapper = new ObjectMapper();
        List<UpcomingMatch> upcomingMatches = new ArrayList<UpcomingMatch>();
        int page = 1;
        boolean continueRequest = true;
        String filterSeries = serie.equalsIgnoreCase(LCS)
                ? "filter[league_id]=" + properties.getProperty(PROPERTY_LCS_ID)
                : "";

        while (continueRequest) {
            // Setup url connection
            URL url = new URL("https://" + properties.getProperty(PROPERTY_URL_UPCOMING)
                    + "?" + filterSeries + "&filter[not_started]=true" + "&page=" + page);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // setup request
            connection.setRequestProperty("Authorization", "Bearer " + properties.getProperty(PROPERTY_BEARER_TOKEN));
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestMethod("GET");

            // Verify HTTP response
            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                // Read JSON from connection's InputStream using JsonNode and BufferedReader
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                JsonNode jsonNode = mapper.readTree(in.readLine());

                // Check if json is not empty
                if (jsonNode.get(0) != null) {
                    upcomingMatches.addAll(generateUpComingMatches(jsonNode)); // return list of upcoming matches;
                } else {
                    continueRequest = false;
                }

                page++;
            } else {
                continueRequest = false;
            }
        }
        return upcomingMatches;
    }

    /**
     * Creates a List of UpcomingMatches object using the JsonNode based from PandaScore's response.
     * @param jsonArray the JsonNode, which is expected to be a JSON array
     * @return list of upcoming matches
     * @throws ParseException failed to parse the match date in one of the matches
     */
    private List<UpcomingMatch> generateUpComingMatches(JsonNode jsonArray) throws ParseException {
        List<UpcomingMatch> upcomingMatches = new ArrayList<UpcomingMatch>();
        JsonNode matchData;
        int i = 0;
        while ((matchData = jsonArray.get(i)) != null) {
            try {
                // Get match date
                String strDate = matchData.get("scheduled_at").asText();
                Date date = getDate(strDate);

                // Get teams in the match
                String team1 = matchData.get("opponents").get(0).get("opponent").get("acronym").asText();
                String team2 = matchData.get("opponents").get(1).get("opponent").get("acronym").asText();

                // Get PandaScore match id
                int id = matchData.get("id").asInt();

                // Add match to list
                upcomingMatches.add(new UpcomingMatch(date, team1, team2, id));
            } catch(NullPointerException e) {
                System.out.println("Skipped: " + matchData);
            }
            i++;
        }
        return upcomingMatches;
    }

    /**
     * Returns list of teams from PandaScore.
     * @return List of teams
     * @throws IOException
     */
    public List<Team> getTeams() throws IOException {
        int page = 1;
        Properties properties = this.getProperties();
        ObjectMapper mapper = new ObjectMapper();

        boolean continueRequest = true;
        List<Team> teams = new ArrayList<Team>();
        while (continueRequest) {
            // Setup url connection
            URL url = new URL("https://" + properties.getProperty(PROPERTY_URL_TEAMS) + "?page=" + page);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // setup request
            connection.setRequestProperty("Authorization", "Bearer " + properties.getProperty(PROPERTY_BEARER_TOKEN));
            connection.setRequestProperty("Content-Type","application/json");
            connection.setRequestMethod("GET");

            if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
                // Read JSON from connection's InputStream using JsonNode and BufferedReader
                BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                JsonNode jsonNode = mapper.readTree(in.readLine());

                // Check if json is not empty
                if (jsonNode.get(0) != null) {
                    teams.addAll(generateTeams(jsonNode, ""));
                } else {
                    continueRequest = false;
                }
            } else {
                continueRequest = false;
            }
            page++;
        }
        return teams;
    }

    /**
     * Returns a list of teams for specified country from PandaScore.
     * @param cc country's code
     * @return List of Teams
     */
    public List<Team> getTeams(String cc) throws IOException, ParseException {
        Properties properties = this.getProperties();
        ObjectMapper mapper = new ObjectMapper();

        // Setup url connection
        URL url = new URL("https://" + properties.getProperty(PROPERTY_URL_TEAMS) + "?filter[location]=" + cc);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // setup request
        connection.setRequestProperty("Authorization", "Bearer " + properties.getProperty(PROPERTY_BEARER_TOKEN));
        connection.setRequestProperty("Content-Type","application/json");
        connection.setRequestMethod("GET");

        // Verify HTTP response
        if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            // Read JSON from connection's InputStream using JsonNode and BufferedReader
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            JsonNode jsonNode = mapper.readTree(in.readLine());

            return generateTeams(jsonNode, cc);
        } else {
            throw new RuntimeException("API Request from PandaScore failed: " + connection.getResponseCode());
        }
    }
    /**
     * Creates a List of Team object using the JsonNode based from PandaScore's response.
     * @param jsonArray json array
     * @param cc country's code
     * @return List of Teams
     * @throws ParseException failed to parse the match date in one of the matches
     */
    private List<Team> generateTeams(JsonNode jsonArray, String cc) {
        List<Team> teams = new ArrayList<Team>();
        JsonNode teamData;
        int i = 0;
        while ((teamData = jsonArray.get(i)) != null) {
            try {
                // Only get team that matches the country, or any if cc is empty
                if (teamData.get("location").asText().equals(cc) || cc.isEmpty()) {
                    teams.add(new Team(
                            0,
                            teamData.get("name").asText(),
                            teamData.get("image_url").asText(),
                            teamData.get("acronym").asText(),
                            0,
                            0
                    ));
                }
            } catch (NullPointerException e) {
                System.out.println("Skipped:" + teamData);
            }
            i++;
        }
        return teams;
    }

    /**
     * Updates the Match object based on the PandaScore's API.
     * @param m Match to updated
     * @throws IOException
     */
    public boolean updateMatch(Match m) throws IOException {
        Properties properties = this.getProperties();
        ObjectMapper mapper = new ObjectMapper();

        // Setup url connection
        URL url = new URL("https://" + properties.getProperty(PROPERTY_URL_PAST) + "?filter[id]=" + m.getPandaScoreId());
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();

        // setup request
        connection.setRequestProperty("Authorization", "Bearer " + properties.getProperty(PROPERTY_BEARER_TOKEN));
        connection.setRequestProperty("Content-Type","application/json");
        connection.setRequestMethod("GET");

        // Verify HTTP response
        if (connection.getResponseCode() == HttpURLConnection.HTTP_OK) {
            // Read JSON from connection's InputStream using JsonNode and BufferedReader
            BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            JsonNode jsonNode = mapper.readTree(in.readLine());

            if (jsonNode.get(0) == null) {
                return false;
            } else {
                updateMatch(jsonNode.get(0), m);
                return true;
            }
        } else {
            return false;
        }
    }

    /**
     * Updates Match object values based on json from PandaScore API response.
     * @param json json
     * @param m Match object to be updated
     */
    private void updateMatch(JsonNode json, Match m) {
        m.setInProgress(false);
        m.setGameLength(json.get("games").get(0).get("length").asInt());

        // Get team 1 id and abbreviation
        String team1Abbreviations = json.get("opponents").get(0).get("opponent").get("acronym").asText();
        int team1Id = json.get("opponents").get(0).get("opponent").get("id").asInt();

        // Get team 2 abbreviation
        String team2Abbreviations = json.get("opponents").get(1).get("opponent").get("acronym").asText();

        // Set winner abbreviation based on if team 1 matches winner id or not
        int winnerId = json.get("winner_id").asInt();
        String winnerAbbreviation = team1Id == winnerId ?
                team1Abbreviations : team2Abbreviations;

        // If team 1's abbreviation matches with winner's, set team 1 as winner.
        // Otherwise, set team 2 as winner.
        if (winnerAbbreviation.equals(m.getTeam1().getAbbreviation())) {
            m.setWinner(m.getTeam1());
        } else {
            m.setWinner(m.getTeam2());
        }

    }

    /**
     * Returns the string date into a Date Object
     * @param strDate date in string
     * @return date in Date object
     */
    private Date getDate(String strDate) throws ParseException {
        TemporalAccessor ta = DateTimeFormatter.ISO_INSTANT.parse(strDate);
        Instant i = Instant.from(ta);
        return Date.from(i);
    }

    /**
     * Returns the Properties needed to call PandaScore API from the config file
     * for PandaScore.
     * @return Properties - contains url, and bearer token.
     */
    private Properties getProperties() throws IOException {
        FileInputStream file = new FileInputStream(FILE_NAME);
        Properties properties = new Properties();
        properties.load(file);

        return properties;
    }
}
