import com.amazonaws.services.lambda.runtime.Context;
import db.DBManager;

import java.io.IOException;
import java.text.ParseException;

/**
 * Handles AWS Lambda's request
 */
public class LambdaMethodHandler {

    /**
     * Performs an action for performing transactions between PandaScore
     * and MySQL
     * @param input type of service expected
     * @param context used to log
     * @return result
     */
    public String handleRequest(String input, Context context) {
        try {
            DBManager.getInstance().getConnection();
            PandaDBHandler pandaDBHandler = new PandaDBHandler();
            context.getLogger().log("Input: " + input);

            switch (Integer.parseInt(input)) {
                case 2:
                    pandaDBHandler.addUpcomingMatches();
                    break;
                case 3:
                    pandaDBHandler.updateInProgressMatches();
                    break;
                default:
                    return "None from the option selected";
            }
            return "Success";
        } catch (IOException | ParseException e) {
            return "Failed to connect to db";
        }
    }
}
