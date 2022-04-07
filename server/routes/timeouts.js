const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

/**
 * @swagger
 * /api/timeouts:
 *  put:
 *   requestBody:
 *     description: Information for new timeout record
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
 *          description: timeout's start date
 *          example: 2022-04-06
 *         end_date:
 *          type: string
 *          description: ban's start date
 *          example: 2022-05-06
 *         reason:
 *          type: string
 *          description: timeout's reason
 *          example: Spamming
 *   summary: Creates a timeout.
 *   description: Creates a new timeout record.
 *   responses:
 *    200:
 *     description: Successfully created a timeout
 *    404:
 *     description: Missing or invalid body, or user not found
 */
router.put("/", async (req, res) => {
    try {
        // Check if body exists
        if (!req.body) {
            res.sendStatus(404);
        }

        // Check if body has user_id, start_date, end_date, and reason
        if (req.body.user_id && req.body.start_date && req.body.end_date && req.body.reason) {
            const response = await dbFetch.createTimeout(req.body.user_id,
                req.body.start_date, req.body.end_date, req.body.reason);
            
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
 * /api/timeouts:
 *  delete:
 *   requestBody:
 *     description: Information about timeout to be deleted
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         timeout_id:
 *          type: number
 *          description: user's id
 *          example: 100
 *   summary: Deletes a timeout.
 *   description: Deletes a timeout record.
 *   responses:
 *    200:
 *     description: Successfully deleted timeout
 *    404:
 *     description: Missing or invalid body, or user/timeout not found
 */
router.delete("/", async (req, res) => {
    try {
        // Check if body exists
        if (!req.body) {
            res.sendStatus(404);
        }

        // Check if body has timeout_id
        if (req.body.timeout_id) {
            const response = await dbFetch.deleteTimeout(req.body.timeout_id);
            
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