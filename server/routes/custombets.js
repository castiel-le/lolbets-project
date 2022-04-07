const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

/**
 * @swagger
 * /api/custombets/{id}:  
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: user's id
 *      example: 35
 *   summary: Retrieves a specific user's custom bets
 *   description: Retrieves a specific user's custom bets history as an array.
 *   responses:
 *    200:
 *     description: Array of custom bet object
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          betInfo:
 *           type: object
 *           properties:
 *            bet_participant_id:
 *             type: number
 *             description: bet participant id 
 *             example: 20
 *            bet_id:
 *             type: number 
 *             description: bet id 
 *             example: 11
 *            user_id:
 *             type: number
 *             description: user id of bet 
 *             example: 1
 *            team_betted_on:
 *             type: string
 *             description: team id betted on
 *             example: null
 *            amount_bet:
 *             type: number
 *             description: user's amount bet  
 *             example: 10
 *            creation_date:
 *             type: string
 *             description: bet creation date
 *             example: 2022-04-01T18:35:53.000Z
 *          matchInfo:
 *           type: object
 *           properties:
 *            match_id:
 *             type: number
 *             description: match's id of the bet 
 *             example: 1953
 *            team1_id:
 *             type: object
 *             properties:
 *              team_id:
 *               type: number
 *               description: team 1's id
 *               example: 772
 *              team_name:
 *               type: string
 *               description: team name 
 *               example: 100 Thieves
 *              logo:
 *               type: string 
 *               description: URL of team 1's logo
 *               example: https://cdn.pandascore.co/images/team/image/1537/100_thieves_alternatelogo_square.png
 *              abbreviation:
 *               type: string
 *               description: team 1's abbreviation/acronym  
 *               example: 100
 *              wins:
 *               type: number 
 *               description: team 1's total number of wins in matches 
 *               example: 96
 *              losses:
 *               type: number 
 *               description: team 1's total number of losses in matches 
 *               example: 91
 *              winrate:
 *               type: number
 *               description: team 1's calculated winrate  
 *               example: 50.79
 *            team2_id:
 *             type: object
 *             properties:
 *              team_id:
 *               type: number
 *               description: team 2's id
 *               example: 819
 *              team_name:
 *               type: string
 *               description: team name 
 *               example: Cloud 0
 *              logo:
 *               type: string 
 *               description: URL of team 2's logo
 *               example: https://cdn.pandascore.co/images/team/image/1097/cloud9-gnd9b0gn.png
 *              abbreviation:
 *               type: string
 *               description: team 2's abbreviation/acronym  
 *               example: C9
 *              wins:
 *               type: number 
 *               description: team 2's total number of wins in matches 
 *               example: 148
 *              losses:
 *               type: number 
 *               description: team 2's total number of losses in matches 
 *               example: 75
 *              winrate:
 *               type: number
 *               description: team 2's calculated winrate  
 *               example: 66.37
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
 *          payout:
 *           type: number
 *           description: amount of coins obtained if bet wins
 *           example: 132
 *          win_condition:
 *           type: array
 *           description: win condition of bet in seconds
 *           example: [30, null]
 *          category:
 *           type: number
 *           description: bet's category id
 *           example: 2
 *    404: 
 *     description: No query specified, or no user found using the specified id.
 */
router.get("/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getCustomBetInfoByUserID(req.params.id));
    } catch (e){
        res.sendStatus(404);
    }
});

/**
 * @swagger
 * /api/custombets:
 *  delete:
 *   requestBody:
 *     description: Information of custom bet to be deleted
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         bet_id:
 *          type: number
 *          description: custom bet's id
 *          example: 100
 *   summary: Deletes an existing custom bet.
 *   description: Deletes an existing custom bet record.
 *   responses:
 *    200:
 *     description: Successfully deleted a custom bet
 *    404:
 *     description: Missing or invalid body, or bet not found
 */
router.delete("/", async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(404);
        }

        if (req.body.bet_id) {
            const response = await dbFetch.destroyExistingCustomBet(req.body.bet_id);
            res.sendStatus(response ? 200 : 404);
        } else {
            res.sendStatus(404);
        }
    } catch (e){
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/custombets:
 *  put:
 *   requestBody:
 *     description: Information of custom bet to be deleted
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         creator_id:
 *          type: number
 *          description: custom bet creator's user id
 *          example: 27
 *         category_id:
 *          type: number
 *          description: custom bet category's category id
 *          example: 2
 *         match_id:
 *          type: number
 *          description: custom bet category's category id
 *          example: 1511
 *         win_conditions:
 *          type: array
 *          description: custom bet's win conditions
 *          example: [1234, null]
 *   summary: Creates a new custom bet.
 *   description: Creates a new custom bet record.
 *   responses:
 *    200:
 *     description: Successfully created a custom bet
 *    404:
 *     description: Missing or invalid body, or category/user/match not found
 */
router.put("/", async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(404);
        }
        if (req.body.creator_id && req.body.category_id && req.body.match_id && req.body.win_conditions) {
            const response = await dbFetch.createCustomBet(
                req.body.creator_id, 
                req.body.category_id, 
                req.body.match_id, 
                req.body.win_conditions
            );
            response.ok ? res.sendStatus(200) : res.sendStatus(404);
        }
    } catch(e){
        res.sendStatus(404);
    }
})

module.exports = router;