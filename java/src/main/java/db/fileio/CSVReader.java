/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package db.fileio;

import db.DBManager;
import db.daos.TeamDAO;
import db.models.Match;
import db.models.Team;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.text.DateFormat;
import java.util.List;
import java.time.format.DateTimeFormatter;

/**
 * Used to read and scrape the history of matches from the csv file.
 * @author Marian Ruth Lina
 */
public class CSVReader {
    
    public ArrayList<String> matchesList;
    public String[] csvContent;
    public ArrayList<String> scrapedMatches;
    
    public CSVReader(String filename) throws IOException { 
        
        csvContent = readCsvFile(filename);
        matchesList = getMatches(csvContent);
        scrapedMatches = scrapeMatchDataForDB(matchesList);
    }

    /**
     * This method reads all the data line by line from the csv file.
     * @param filename
     * @return String[] dataList, all data from the csv
     * @throws IOException
     */
    private String[] readCsvFile(String filename) throws IOException {
        
        Path filepath = Paths.get(filename);

        int i = 0;
        List<String> lines = Files.readAllLines(filepath);
        String[] dataList = new String[lines.size() - 1];

        for (int j = 1; j < lines.size(); j++) {

                dataList[i] = lines.get(j);
                i++;
               
        }
        
        return dataList;

    }

    /**
     * This method scrapes the data of all the LCS league.
     * @param csvContent all data from the csv file line by line
     * @return ArrayList<String> matches, contains all the scraped matches only from LCS league.
     */
    private ArrayList<String> getMatches(String[] csvContent) {
        
        ArrayList<String> matches = new ArrayList<>();
     
        for (int i = 0; i < csvContent.length; i++) {
            
            String[] splitLines = csvContent[i].split(",");
            
            if (splitLines[12].equals("team") && splitLines[3].equals("LCS")) {
                
                matches.add(csvContent[i]);
         
            }
        }
        
        return matches;
    }

    /**
     * This method scrapes the data from the csv column 7 (date),15 (teamname),
     * 23(gamelength) and 24 (result) only.
     * @param matchesList all the scraped data from LCS league only.
     * @return ArrayList<String> matchData , all scraped data from the said columns separated by comma.
     */
    private ArrayList<String> scrapeMatchDataForDB(ArrayList<String> matchesList) {
              
        ArrayList<String> matchData = new ArrayList<>();
        
        for (int i = 0; i < matchesList.size(); i++) {
            
            String[] matchListLines = matchesList.get(i).split(",");
            String scrapedData;
            
            //takes data from column 7,15,23,24 of the csv file separated by comma.
            scrapedData = matchListLines[7] + "," + matchListLines[15] + "," + matchListLines[23] + "," + matchListLines[24];
            
            matchData.add(scrapedData);
       
        }
              
        return matchData;
        
    }

    /**
     * This method searches the database for Team which teamnames are abbreviation of their teamname.
     * This method creates a team object which are searched from database using the teamnames abbreviation.
     * @param teamname
     * @return Team
     * @throws IOException
     */
    private Team getTeamByAbbreviation(String teamname) throws IOException {

        TeamDAO tdao = new TeamDAO(DBManager.getInstance().getConnection());
        Team team = tdao.selectByAbbreviation(teamname);

        return team;

    }

    /**
     * This method converts the date from the csv file to a Date object.
     * @param stringDate
     * @return Date
     * @throws ParseException
     */
    public Date convertStringToDate(String stringDate) throws ParseException {

        Date theDate=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(stringDate);
        
        return theDate;

    }

    /**
     * This class is used to populate the matches with past match history.
     * This method creates a Match object to be added in the ArrayList<Match>.
     * @return ArrayList<Match>
     * @throws IOException
     * @throws ParseException
     */
    public ArrayList<Match> populateWithMatchHistory() throws IOException, ParseException {
        
        ArrayList<String> scrapedData = scrapedMatches;
        
        ArrayList<Match> matchHistoryData = new ArrayList<>();
        
        TeamDAO tdao = new TeamDAO(DBManager.getInstance().getConnection());
        for (int i = 0; i < scrapedData.size(); i+=2) {
            
            Team winner;
            String[] splitDataTeam1 = scrapedData.get(i).split(",");
            Team team1 = tdao.selectByTeamName(splitDataTeam1[1]);

            if (team1 == null) {
                team1 = getTeamByAbbreviation(splitDataTeam1[1]);
            }
            Date date = convertStringToDate(splitDataTeam1[0]);
            
            String[] splitDataTeam2 = scrapedData.get(i+1).split(",");
            Team team2 = tdao.selectByTeamName(splitDataTeam2[1]);

            if (team2 == null) {
                team2 = getTeamByAbbreviation(splitDataTeam2[1]);
            }
            if (splitDataTeam1[3].equals("1")) {
                
                winner = team1;
            }
            else {
                
                winner = team2;
            }
            
            Match match = new Match(0, team1, team2, winner, date, false, Integer.parseInt(splitDataTeam1[2]),0 );
            
            matchHistoryData.add(match);
            
          
        }
        
        return matchHistoryData;
    }
    
    
}

