package db.models;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Test cases for Team class
 */
class TeamTest {
    private Team team;

    /**
     * Initializes the team field with a valid Team object.
     */
    @BeforeEach
    void setUp() {
        team = new Team(1, "AbC", "logo", "AC", 24, 3);
    }

    /**
     * Tests constructor's validation for team name argument
     */
    @Test
    void testConstructorInvalidTeamName() {
        try {
            new Team(1, null, "logo", "AC", 24, 3);
            fail("Team object constructor did not throw IllegalArgumentException when team name is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for logo argument
     */
    @Test
    void testConstructorInvalidLogo() {
        try {
            new Team(1, "AbC", null, "AC", 24, 3);
            fail("Team object constructor did not throw IllegalArgumentException when logo is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for abbreviation argument
     */
    @Test
    void testConstructorInvalidAbbreviation() {
        try {
            new Team(1, "AbC", "logo", null, 24, 3);
            fail("Team object constructor did not throw IllegalArgumentException when abbreviation is null");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for wins argument
     */
    @Test
    void testConstructorInvalidWins() {
        try {
            new Team(1, "AbC", "logo", "AC", -1, 3);
            fail("Team object constructor did not throw IllegalArgumentException when wins is negative");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for losses argument
     */
    @Test
    void testConstructorInvalidLosses() {
        try {
            new Team(1, "AbC", "logo", "AC", 24, -1);
            fail("Team object constructor did not throw IllegalArgumentException when losses is negative");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests constructor's validation for when wins and losses are set to 0
     */
    @Test
    void testConstructorZeroWinLose() {
        try {
            new Team(1, "AbC", "logo", "AC", 0, 0);
            // SUCCESS
        } catch (IllegalArgumentException e) {
            fail("Team object constructor threw IllegalArgumentException when wins and losses are 0, which should be valid");
        }
    }

    /**
     * Tests setTeamName()'s validation with invalid value
     */
    @Test
    void testSetTeamNameInvalidValue() {
        try {
            team.setTeamName(null);
            fail("setTeamName() failed to validate argument");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setLogo()'s validation with invalid value
     */
    @Test
    void testSetLogoInvalidValue() {
        try {
            team.setLogo(null);
            fail("setLogo() failed to validate argument");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setAbbreviation()'s validation with invalid value
     */
    @Test
    void testSetAbbreviationInvalidValue() {
        try {
            team.setAbbreviation(null);
            fail("setAbbreviation() failed to validate argument");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setWins()'s validation with invalid value
     */
    @Test
    void testSetWinsInvalidValue() {
        try {
            team.setWins(-1);
            fail("setWins() failed to validate argument");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setLosses()'s validation with invalid value
     */
    @Test
    void testSetLosses() {
        try {
            team.setLosses(-1);
            fail("setLosses() failed to validate argument");
        } catch (IllegalArgumentException e) {
            // SUCCESS
        }
    }

    /**
     * Tests setWins()'s validation with 0 as argument
     */
    @Test
    void testSetWinsZeroValue() {
        try {
            team.setWins(0);
            // SUCCESS
        } catch (IllegalArgumentException e) {
            fail("setLosses() threw IllegalArgumentException when argument is 0, which is valid.");

        }
    }

    /**
     * Tests setLosses()'s validation with 0 as argument
     */
    @Test
    void testSetLossesZeroValue() {
        try {
            team.setLosses(0);
            // SUCCESS
        } catch (IllegalArgumentException e) {
            fail("setLosses() threw IllegalArgumentException when argument is 0, which is valid.");
        }
    }

    /**
     * Test equals() with non-Team type object
     */
    @Test
    void testEqualsInvalidObject() {
        assertFalse(team.equals(new Object()));
    }

    /**
     * Test equals() with the same object
     */
    @Test
    void testEqualsSameObject() {
        assertTrue(team.equals(team));
    }

    /**
     * Test equals() with a different Team object with the same fields
     */
    @Test
    void testEqualsSameFields() {
        Team team2 = new Team(1, "AbC", "logo", "AC", 24, 3);
        assertTrue(team.equals(team2));
    }

    /**
     * Test equals() with a different Team object that is not equal
     */
    @Test
    void testEqualsDifferentFields() {
        Team team2 = new Team(2, "AC", "logo", "AC", 24, 3);
        assertFalse(team.equals(team2));
    }
}