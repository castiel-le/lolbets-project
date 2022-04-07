package api_caller.pandascore;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test cases for UpcomingMatch class
 */
class UpcomingMatchTest {
    /**
     * Test constructor's validation for null Date
     */
    @Test
    void testConstructorNullDate() {
        try {
            new UpcomingMatch(null, "A", "B", 1);
            fail("UpcomingMatch constructor did not throw IllegalArgumentException for null Date");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Test constructor's validation for null team 1 abbreviation
     */
    @Test
    void testConstructorNullTeam1Abbreviation() {
        try {
            new UpcomingMatch(null, null, "B", 1);
            fail("UpcomingMatch constructor did not throw IllegalArgumentException for null team1Abbreviation");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Test constructor's validation for null team 2 abbreviation
     */
    @Test
    void testConstructorNullTeam2Abbreviation() {
        try {
            new UpcomingMatch(null, "A", null, 1);
            fail("UpcomingMatch constructor did not throw IllegalArgumentException for null team2Abbreviation");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }
}