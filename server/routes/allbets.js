const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

/**
 * @swagger
 * /api/allbets/matchdata/{id}:  
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: user's id
 *      example: 23
 *   summary: Retrieves a specific user's bets with match data
 *   description: Retrieves a specific user's bets history with match and team data as an array.
 *   responses:
 *    200:
 *     description: Array of bet object
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          bet_participant_id:
 *           type: number
 *           description: bet participant id 
 *           example: 20
 *          bet_id:
 *           type: number 
 *           description: bet id 
 *           example: 11
 *          user_id:
 *           type: number
 *           description: user id of bet 
 *           example: 1
 *          team_betted_on:
 *           type: object
 *           properties:
 *            team_id:
 *             type: number
 *             description: team id
 *             example: 772
 *            team_name:
 *             type: string
 *             description: team name 
 *             example: 100 Thieves
 *            logo:
 *             type: string 
 *             description: URL of team's logo
 *             example: https://cdn.pandascore.co/images/team/image/1537/100_thieves_alternatelogo_square.png
 *            abbreviation:
 *             type: string
 *             description: team's abbreviation/acronym  
 *             example: 100
 *            wins:
 *             type: number 
 *             description: team's total number of wins in matches 
 *             example: 96
 *            losses:
 *             type: number 
 *             description: team's total number of losses in matches 
 *             example: 91
 *            winrate:
 *             type: number
 *             description: team's calculated winrate  
 *             example: 50.79
 *          amount_bet:
 *           type: number
 *           description: user's amount bet  
 *           example: 10
 *          creation_date:
 *           type: string
 *           description: bet creation date
 *           example: 2022-04-01T18:35:53.000Z
 *          match:
 *           type: object
 *           properties:
 *            match_id:
 *             type: number
 *             description: match's id of the bet 
 *             example: 1953
 *            team1_id:
 *             type: number
 *             description: team 1's id
 *             example: 772
 *            team2_id:
 *             type: number
 *             description: team 2's id
 *             example: 819
 *            winner_id:
 *             type: number
 *             description: team id of bet's match  
 *             example: 772
 *            match_start_time:
 *             type: string
 *             description: start time of bet's match 
 *             example: 2022-04-02T16:30:00.000Z
 *            in_progress:
 *             type: boolean
 *             description: true of false if match is in progress
 *             example: false
 *            game_length:
 *             type: number
 *             description: game length in seconds of bet's match 
 *             example: 1576
 *            pandascore_id:
 *             type: number
 *             description: PandaScore id of bet's match 
 *             example: 627378
 *    404:
 *     description: No user found using the specified id.
 */
router.get("/matchdata/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getAllBetsForUserWithMatchData(req.params.id));
    } catch(e){
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/allbets/{id}:  
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: user's id
 *      example: 23
 *   summary: Retrieves a specific user's bets
 *   description: Retrieves a specific user's bets history as an array.
 *   responses:
 *    200:
 *     description: Array of bet object
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          bet_participant_id:
 *           type: number
 *           description: bet participant id 
 *           example: 20
 *          bet_id:
 *           type: number 
 *           description: bet id 
 *           example: 11
 *          user_id:
 *           type: number
 *           description: user id of bet 
 *           example: 1
 *          team_betted_on:
 *           type: string
 *           description: team id betted on
 *           example: null
 *          amount_bet:
 *           type: number
 *           description: user's amount bet  
 *           example: 10
 *          creation_date:
 *           type: string
 *           description: bet creation date
 *           example: 2022-04-01T18:35:53.000Z
 *    404:
 *     description: No user found using the specified id.
 */
router.get("/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getAllBetsForUser(req.params.id));
    } catch(e) {
        res.sendStatus(404);
    }
});

module.exports = router;