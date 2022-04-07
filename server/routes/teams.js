const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

/**
 * @swagger
 * /api/teams:
 *  get:
 *   summary: Retrieves all the teams.
 *   description: Retrieves all teams and its info as an array.
 *   responses:
 *    200:
 *     description: Array of team object
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          team_id:
 *           type: number
 *           description: team's id
 *           example: 772
 *          team_name:
 *           type: string
 *           description: teamame 
 *           example: 100 Thieves
 *          logo:
 *           type: string 
 *           description: URL of team's logo
 *           example: https://cdn.pandascore.co/images/team/image/1537/100_thieves_alternatelogo_square.png
 *          abbreviation:
 *           type: string
 *           description: team's abbreviation/acronym  
 *           example: 100
 *          wins:
 *           type: number 
 *           description: team's total number of wins in matches 
 *           example: 96
 *          losses:
 *           type: number 
 *           description: team's total number of losses in matches 
 *           example: 91
 *    404: 
 *     description: No team found using the specified id.
 */
router.get("/", async (req, res) => {
    try {
        res.json(await dbFetch.getTeams());
    } catch(e){
        res.sendStatus(404);
    }
});

/**
 * @swagger
 * /api/teams/history/{id}:
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: team's id
 *      example: 772
 *   - name: page
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: pagination page number
 *      example: 1
 *   summary: Retrieves a specific team's match history
 *   description: Retrieves a specific team's match history sorted by date as an array. Only returns 15 rows per page.
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
 *          match_id:
 *           type: number
 *           description: match id
 *           example: 1953
 *          team1_id:
 *           type: object
 *           properties:
 *            team_id:
 *             type: number
 *             description: team 1's id
 *             example: 772
 *            team_name:
 *             type: string
 *             description: team name 
 *             example: 100 Thieves
 *            logo:
 *             type: string 
 *             description: URL of team 1's logo
 *             example: https://cdn.pandascore.co/images/team/image/1537/100_thieves_alternatelogo_square.png
 *            abbreviation:
 *             type: string
 *             description: team 1's abbreviation/acronym  
 *             example: 100
 *            wins:
 *             type: number 
 *             description: team 1's total number of wins in matches 
 *             example: 96
 *            losses:
 *             type: number 
 *             description: team 1's total number of losses in matches 
 *             example: 91
 *            winrate:
 *             type: number
 *             description: team 1's calculated winrate  
 *             example: 50.79
 *          team2_id:
 *           type: object
 *           properties:
 *            team_id:
 *             type: number
 *             description: team 2's id
 *             example: 819
 *            team_name:
 *             type: string
 *             description: team name 
 *             example: Cloud 0
 *            logo:
 *             type: string 
 *             description: URL of team 2's logo
 *             example: https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png
 *            abbreviation:
 *             type: string
 *             description: team 2's abbreviation/acronym  
 *             example: C9
 *            wins:
 *             type: number 
 *             description: team 2's total number of wins in matches 
 *             example: 148
 *            losses:
 *             type: number 
 *             description: team 2's total number of losses in matches 
 *             example: 75
 *            winrate:
 *             type: number
 *             description: team 2's calculated winrate  
 *             example: 66.37
 *          winner_id:
 *           type: number
 *           description: team id of bet's match  
 *           example: 772
 *          match_start_time:
 *           type: string
 *           description: start time of bet's match 
 *           example: 2022-04-02T16:30:00.000Z
 *          in_progress:
 *           type: boolean
 *           description: true of false if match is in progress
 *           example: false
 *          game_length:
 *           type: number
 *           description: game length in seconds of bet's match 
 *           example: 1576
 *          pandascore_id:
 *           type: number
 *           description: PandaScore id of bet's match 
 *           example: 627378
 *    404: 
 *     description: No query specified, or no team found using the specified id.
 */
router.get("/history/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getMatchHistory(req.params.id, req.query.page));
    } catch(e){
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/teams/{id}:
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: team's id
 *      example: 772
 *   summary: Retrieves a specific team's info
 *   description: Retrieves a specific team's info as an object
 *   responses:
 *    200:
 *     description: Team object
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         team_id:
 *          type: number
 *          description: team's id
 *          example: 772
 *         team_name:
 *          type: string
 *          description: teamame 
 *          example: 100 Thieves
 *         logo:
 *          type: string 
 *          description: URL of team's logo
 *          example: https://cdn.pandascore.co/images/team/image/1537/100_thieves_alternatelogo_square.png
 *         abbreviation:
 *          type: string
 *          description: team's abbreviation/acronym  
 *          example: 100
 *         wins:
 *          type: number 
 *          description: team's total number of wins in matches 
 *          example: 96
 *         losses:
 *          type: number 
 *          description: team's total number of losses in matches 
 *          example: 91
 *         winrate:
 *          type: number
 *          description: team's calculated winrate  
 *          example: 50.79
 *    404: 
 *     description: No team found using the specified id.
 */
router.get("/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getTeamById(req.params.id));
    } catch(e) {
        res.sendStatus(404);
    }
});

module.exports = router;