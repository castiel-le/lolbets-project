const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

/**
 * @swagger
 * /api/bans:
 *  put:
 *   requestBody:
 *     description: Information for new ban record
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         user_id:
 *          type: number
 *          description: user's id
 *          example: 38
 *         start_date:
 *          type: string
 *          description: ban's start date
 *          example: 2022-04-06
 *         reason:
 *          type: string
 *          description: ban's reason
 *          example: Spamming
 *   summary: Creates a ban.
 *   description: Creates a new ban record.
 *   responses:
 *    200:
 *     description: Successfully created a ban
 *    404:
 *     description: Missing or invalid body, user not found, or user is already banned
 */
router.put("/", async (req, res) => {
    try {
        // Check if body exists
        if (!req.body) {
            res.sendStatus(404);
        }

        // Check if body has user_id, start_date, and reason
        if (req.body.user_id && req.body.start_date && req.body.reason) {
            const response = await dbFetch.createBan(req.body.user_id,
                req.body.start_date, req.body.reason);
            
            // if response is not null, send 200.
            // otherwise, send 404.
            res.sendStatus(response ? 200 : 404);
        } else {
            res.sendStatus(404);
        }
    } catch(e) {
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/bans:
 *  delete:
 *   requestBody:
 *     description: Information of ban to be deleted
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         ban_id:
 *          type: number
 *          description: ban's id
 *          example: 100
 *   summary: Deletes a ban.
 *   description: Deletes an existing ban record.
 *   responses:
 *    200:
 *     description: Successfully deleted existing ban
 *    404:
 *     description: Missing or invalid body, user not found, or ban record not found
 */
router.delete("/", async (req, res) => {
    try {
        // Check if body exists
        if (!req.body) {
            res.sendStatus(404);
        }

        // Check if body has ban_id
        if (req.body.ban_id) {
            const response = await dbFetch.deleteBan(req.body.ban_id);
            
            // if response is not null, send 200.
            // otherwise, send 404.
            res.sendStatus(response ? 200 : 404);
        } else {
            res.sendStatus(404);
        }
    } catch(e) {
        res.sendStatus(404);
    }
})

module.exports = router;