package db.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test cases for Match class
 */
class MatchTest {
    private Match match;
    private Team t1;
    private Team t2;

    /**
     * Initializes the Team objects
     */
    MatchTest() {
        t1 = new Team(1, "AbC", "logo", "AC", 24, 3);
        t2 = new Team(2, "ZxC", "logo", "ZC", 2, 12);
    }

    /**
     * Initializes the match field
     */
    @BeforeEach
    void setUp() {
        match = new Match(1, t1, t2, t1, new Date(), false, 12345, 1);
    }

    /**
     * Tests constructor's validation for team1
     */
    @Test
    void testConstructorInvalidTeam1() {
        try {
            match = new Match(1, null, t2, t1, new Date(), false, 12345, 1);
            fail("IllegalArgumentException not thrown when team1 is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for team2
     */
    @Test
    void testConstructorInvalidTeam2() {
        try {
            match = new Match(1, t1, null, t1, new Date(), false, 12345, 1);
            fail("IllegalArgumentException not thrown when team2 is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for null winner
     */
    @Test
    void testConstructorIgnoreNullWinner() {
        try {
            match = new Match(1, t1, t2, null, new Date(), false, 12345, 1);
            // SUCCESS
        } catch (IllegalArgumentException e) {
            fail("IllegalArgumentException not thrown when winner is null");
        }
    }

    /**
     * Tests constructor's validation for wrong winner
     */
    @Test
    void testConstructorWrongWinner() {
        Team t3 = new Team(3, "A", "b", "c", 0, 0);
        try {
            match = new Match(1, t1, t2, t3, new Date(), false, 12345, 1);
            fail("IllegalArgumentException not thrown when winner is not from the two teams");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for match start time
     */
    @Test
    void testConstructorGameInvalidMatchStartTime() {
        try {
            match = new Match(1, t1, t2, t1, null, false, 12345, 1);
            fail("IllegalArgumentException not thrown when matchStartTime is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for game length
     */
    @Test
    void testConstructorGameInvalidGameLength() {
        try {
            match = new Match(1, t1, t2, t1, new Date(), false, -1, 1);
            fail("IllegalArgumentException not thrown when game length is negative");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setTeam1()'s validation for invalid team
     */
    @Test
    void testSetTeam1InvalidValue() {
        try {
            match.setTeam1(null);
            fail("IllegalArgumentException not thrown when team1 is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setTeam2()'s validation for invalid team
     */
    @Test
    void testSetTeam2InvalidValue() {
        try {
            match.setTeam2(null);
            fail("IllegalArgumentException not thrown when new value is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setWinner()'s validation for null
     */
    @Test
    void testSetWinnerIgnoreNull() {
        try {
            match.setWinner(null);
            // SUCCESS
        } catch (IllegalArgumentException e) {
            fail("IllegalArgumentException thrown when new value is null, which is valid");
        }
    }

    /**
     * Tests setWinner()'s validation for wrong team
     */
    @Test
    void testSetWinnerWrongTeam() {
        Team t3 = new Team(3, "A", "b", "c", 0, 0);
        try {
            match.setWinner(t3);
            fail("IllegalArgumentException not thrown when new value is a different team");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setMatchStartTime()'s validation
     */
    @Test
    void testSetMatchStartTime() {
        try {
            match.setMatchStartTime(null);
            fail("IllegalArgumentException not thrown when new value is a different team");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setGameLength()'s validation
     */
    @Test
    void testSetGameLength() {
        try {
            match.setGameLength(-1);
            fail("IllegalArgumentException not thrown when new value is a different team");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }
}