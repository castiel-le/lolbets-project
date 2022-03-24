import db.DBManager;
import db.models.Match;
import db.fileio.CSVReader;
import db.daos.MatchDAO;
import java.io.IOException;
import java.text.ParseException;
import java.util.*;

public class App {
    private static final String FILE_NAME = "db.config";
    private static final String PROPERTY_URL = "db.url";
    private static final String PROPERTY_TABLE = "db.table";
    private static final String PROPERTY_USERNAME  = "db.user";
    private static final String PROPERTY_PASSWORD = "db.pass";

    public static void main(String[] args) throws IOException, ParseException {
        // SETUP DB CONNECTION
        DBManager dbManager = DBManager.getInstance();
        PandaDBHandler pandaDBHandler = new PandaDBHandler();
        MatchDAO matchDAO = new MatchDAO(DBManager.getInstance().getConnection());

        int input = 0;

        // GET USER INPUT
        System.out.println("1 for populate teams table (recommendation: 1-time use)");
        System.out.println("2 for populate upcoming matches");
        System.out.println("3 for update in-progress matches");
        System.out.println("4 for remove teams that have no match records(recommendation: 1-time use)");
        System.out.println("5 for populate match table from csv file 2021");
        System.out.println("6 for populate match table from csv file 2022");
        System.out.println("7 for populate match table from csv file 2020");
        System.out.println("8 for populate match table from csv file 2019");
        System.out.println("Enter: ");
        Scanner reader = new Scanner(System.in);

        // Read input from user
        try {
            input = reader.nextInt();
        } catch (InputMismatchException e) {
                input = 0;
        }

        switch(input) {
            case 1:
                pandaDBHandler.addTeams();
                break;
            case 2:
                pandaDBHandler.addUpcomingMatches();
                break;
            case 3:
                pandaDBHandler.updateInProgressMatches();
                break;
            case 4:
                pandaDBHandler.removeUnrecordedTeams();
                break;
            case 5:
                String filename2021 = "2021_LoL_esports_match_data_from_OraclesElixir_20220216.csv";
                CSVReader csv1 = new CSVReader(filename2021);
                ArrayList<Match> matchList2021 = csv1.populateWithMatchHistory();

                for (int i =0; i< matchList2021.size();i++){

                    matchDAO.add(matchList2021.get(i), true);
                }
                break;
            case 6:
                String filename2022 = "2022_LoL_esports_match_data_from_OraclesElixir_20220216.csv";
                CSVReader csv2 = new CSVReader(filename2022);
                ArrayList<Match> matchList2022 = csv2.populateWithMatchHistory();


                for (int i =0; i< matchList2022.size();i++){
                    matchDAO.add(matchList2022.get(i), true);
                }
                break;
            case 7:
                String filename2020 = "2020_LoL_esports_match_data_from_OraclesElixir_20220216.csv";
                CSVReader csv4 = new CSVReader(filename2020);
                ArrayList<Match> matchList2020 = csv4.populateWithMatchHistory();

                for (int i =0; i< matchList2020.size();i++){
                    matchDAO.add(matchList2020.get(i), true);
                }
                break;
            case 8:
                String filename2019 = "2019_LoL_esports_match_data_from_OraclesElixir_20220216.csv";
                CSVReader csv3 = new CSVReader(filename2019);
                ArrayList<Match> matchList2019 = csv3.populateWithMatchHistory();

                for (int i =0; i< matchList2019.size();i++){
                    matchDAO.add(matchList2019.get(i), true);
                }
                break;

            default:
                System.out.println("None from the option selected");
        }
        dbManager.closeConnection();
    }

}
