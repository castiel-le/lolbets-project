const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

/**
 * @swagger
 * /api/bets/join:
 *  put:
 *    parameters:
 *    - name: bet
 *      in: query
 *      required: true
 *      schema:
 *       type: number
 *       description: bet id
 *       example: 169
 *    - name: user
 *      in: query
 *      required: true
 *      schema:
 *       type: number
 *       description: user id
 *       example: 27
 *    - name: team
 *      in: query
 *      required: true
 *      schema:
 *       type: number
 *       description: team id of team betted on
 *       example: 772
 *    - name: amount
 *      in: query
 *      required: true
 *      schema:
 *       type: number
 *       description: amount of coins betted
 *       example: 5
 *    summary: Updates or creates a bet participant.
 *    description: Updates or creates a bet participant record.
 *    responses:
 *     200:
 *      description: Successfully created or updated bet participant
 *     404:
 *      description: Missing one of the queries, no bet/user/team found, or match betting on is finished.
 */
router.put("/join", async (req, res) => {
    try{
        let response = await dbFetch.updateOrCreateBetParticipant(
            req.query.bet, 
            req.query.user, 
            req.query.team, 
            req.query.amount
        );
        if (response.ok) {
            res.status(200).send(response.item);
        } else {
            res.sendStatus(404);
        }
    } catch (exception) {
        res.sendStatus(404);
    }
});

/**
 * @swagger
 * /api/bets/delete:
 *  delete:
 *    parameters:
 *    - name: bet
 *      in: query
 *      required: true
 *      schema:
 *       type: number
 *       description: bet id
 *       example: 169
 *    - name: user
 *      in: query
 *      required: true
 *      schema:
 *       type: number
 *       description: user id
 *       example: 27
 *    summary: Updates or creates a bet participant.
 *    description: Updates or creates a bet participant record.
 *    responses:
 *     200:
 *      description: Successfully deleted bet participant
 *     404:
 *      description: Missing one of the queries or no bet/user found.
 */

router.delete("/delete", async (req, res) => {
// if (!req.user) {
    //     res.sendStatus(403);
    // }
    try{
        let response = await dbFetch.destroyBetParticipant(
            req.query.bet, 
            req.query.user
        );
        if (response.ok) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (exception) {
        res.sendStatus(404);
        console.error(exception.message);
    }
});

module.exports = router;