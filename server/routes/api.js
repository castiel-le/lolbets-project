const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const router = express.Router();
const dbFetch = require("../db/dbFunctions")

// Load subroutes
router.use("/login", require("./googleauth"));
router.use("/user", require("./user"));
router.use("/bets", require("./bets"));
router.use("/teams", require("./teams"));
router.use("/allbets", require("./allbets"));
router.use("/custombets", require("./custombets"));
router.use("/bans", require("./bans"));
router.use("/timeouts", require("./timeouts"));
router.use("/follow", require("./follow"));


//Route to get match information
router.get("/matches", async (req, res) => {
    try {
        if (req.query.after){
            res.json(await dbFetch.getMatchesAfter(parseInt(req.query.after), parseInt(req.query.page)));
        } else if (req.query.afterthis && req.query.beforethis){
            res.json(await dbFetch.getMatchesBetween(parseInt(req.query.afterthis), parseInt(req.query.beforethis)));
        } else {
            res.sendStatus(404);
        }
    } catch(e){
        res.sendStatus(404);
    }
});

/**
 * @swagger
 * /api/categories:
 *  get:
 *   summary: Retrieves all the categories.
 *   description: Retrieves all categories and its info as an array.
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
 *          category_id:
 *           type: number
 *           description: category's id
 *           example: 2
 *          category_name:
 *           type: string
 *           description: category name 
 *           example:  Match Before
 *          category_description:
 *           type: string
 *           description: category description 
 *           example:  Bet determined by the match duration lasting before a specified time
 *    404:
 *     description: No categories found. 
 */
router.get("/categories", async (req, res) => {
    try {
        res.json(await dbFetch.getCategories());
    } catch(e) {
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/payout:
 *  get:
 *   parameters:
 *   - name: time1
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: time 1 (in seconds) for between, or time (in seconds) used for before or after
 *      example: 1800
 *   - name: time2
 *     in: query
 *     required: false
 *     schema:
 *      type: number
 *      description: time 2 (in seconds) for between
 *   - name: amount
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: base amount
 *      example: 100
 *   summary: Retrieves payout expected based on time.
 *   description: Retrieves payout expected based on chances of time specified is in scope.
 *   responses:
 *    200:
 *     description: Object
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         before:
 *          type: number
 *          description: payout expected for chances of time in scope before
 *          example: 171
 *         after:
 *          type: number
 *          description: payout expected for chances of time in scope after
 *          example:  129
 *         between:
 *          type: number
 *          description: payout expected for chances of  time 1 and time 2 in scope
 *          example:  100
 *    404:
 *     description: Missing or invalid query.
 */
router.get("/payout", async (req, res) => {
    if (!req.query.time1 || !req.query.amount) {
        res.sendStatus(404);
    }
    try {
        res.json(await dbFetch.getPayoutPercentageCustomBet(req.query.time1, req.query.amount, req.query.time2));
    } catch (e){
        res.sendStatus(404);
    }
})

module.exports = [
    router,
]
