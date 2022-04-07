const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

/**
 * @swagger
 * /api/user/search:  
 *  get:
 *   parameters:
 *   - name: keyword
 *     in: query
 *     required: true
 *     schema:
 *      type: string
 *      description: keyword to search for users
 *      example: lol
 *   summary: Retrieves users that matches the keyword
 *   description: Retrieves the users matching the keyword as an array.
 *   responses:
 *    200:
 *     description: An array of users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          user_id:
 *           type: int
 *           description: user's user id
 *           example: 1
 *          username:
 *           type: string
 *           description: user's username
 *           example: bobthebob
 *          email:
 *           type: string
 *           description: user's email
 *           example: sample@mail.com
 *          date_created:
 *           type: string
 *           description: user's date creation
 *           example: 2022-02-28
 *          profile_pic:
 *           type: string
 *           descrption: URL of user's profile picture
 *           example: https://their.profile.picture.com/location
 *          coins:
 *           type: int
 *           descrption: user's total coins
 *           example: 1000
 *          user_role:
 *           type: string
 *           descrption: user's role type
 *           example: user
 *          rank:
 *           type: int
 *           descrption: user's rank in the leaderboards
 *           example: 21
 *          wins:
 *           type: number
 *           descrption: user's total wins in bets
 *           example: 21
 *          losses:
 *           type: number
 *           descrption: user's total losses in bets
 *           example: 13
 *    404: 
 *     description: No query specified
 */
router.get("/search", async (req, res) => {
    try {
        if (req.query.keyword){
            let matched = await dbFetch.searchUsersByKeyword(req.query.keyword);
            if (matched.length > 0) {
                res.json(matched);
            } else {
                res.json([]);
            }
        } else {
            res.sendStatus(404);
        }
    } catch (e){
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/user/top5:
 *  get:
 *   summary: Retrieves top 5 users ranked by coins.
 *   description: Retrieves the five users that have the most coins compared to other users as an array.
 *   responses:
 *    200:
 *     description: An array of 5 users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          user_id:
 *           type: number
 *           description: user's user id
 *           example: 1
 *          username:
 *           type: string
 *           description: user's username
 *           example: bobthebob
 *          email:
 *           type: string
 *           description: user's email
 *           example: sample@mail.com
 *          date_created:
 *           type: string
 *           description: user's date creation
 *           example: 2022-02-28
 *          profile_pic:
 *           type: string
 *           descrption: URL of user's profile picture
 *           example: https://their.profile.picture.com/location
 *          coins:
 *           type: number
 *           descrption: user's total coins
 *           example: 1000
 *          user_role:
 *           type: string
 *           descrption: user's role type
 *           example: user
 *          wins:
 *           type: number
 *           descrption: user's total wins in bets
 *           example: 21
 *          losses:
 *           type: number
 *           descrption: user's total losses in bets
 *           example: 13
 *    404:
 *     description: No existing users, so there would be no top 5 users 
 */
router.get("/top5", async (req, res) => {
    try {
        res.json(await dbFetch.getTop5Users());
    } catch(e){
        res.sendStatus(404);
    }
});

/**
 * @swagger
 * /api/user/rest:
 *  get:
 *   parameters:
 *   - name: page
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: pagination page number
 *      example: 1 
 *   summary: Retrieves users ranked by coins.
 *   description: Retrieves the users sorted by coins excluded top 5 as an array.
 *   responses:
 *    200:
 *     description: An array of users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          user_id:
 *           type: number
 *           description: user's user id
 *           example: 1
 *          username:
 *           type: string
 *           description: user's username
 *           example: bobthebob
 *          email:
 *           type: string
 *           description: user's email
 *           example: sample@mail.com
 *          date_created:
 *           type: string
 *           description: user's date creation
 *           example: 2022-02-28
 *          profile_pic:
 *           type: string
 *           descrption: URL of user's profile picture
 *           example: https://their.profile.picture.com/location
 *          coins:
 *           type: number
 *           descrption: user's total coins
 *           example: 1000
 *          user_role:
 *           type: string
 *           descrption: user's role type
 *           example: user
 *          wins:
 *           type: number
 *           descrption: user's total wins in bets
 *           example: 21
 *          losses:
 *           type: number
 *           descrption: user's total losses in bets
 *           example: 13
 *    404:
 *     description: No existing users, so there would be no top 5 users 
 */
router.get("/rest", async (req, res) => {
    try {
        if (req.query.page){
            res.json(await dbFetch.getRemainingUsers(req.query.page));
        } else if (req.query.count){
            res.json(await dbFetch.getNumOfUsers());
        } else {
            res.sendStatus(404, "second not found");
        }
    } catch(e) {
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/user/history/{id}:  
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: user's id
 *      example: 23
 *   - name: page
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: pagination page number
 *      example: 1
 *   - name: limit
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: number of rows retrieved
 *      example: 5
 *   summary: Retrieves a specific user's bet history
 *   description: Retrieves a specific user's bet history sorted by date as an array.
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
 *             description: team 1 id of bet's match  
 *             example: 819
 *            team2_id:
 *             type: number
 *             description: team 2 id of bet's match  
 *             example: 772
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
 *     description: No query specified, or no user found using the specified id.
 */
router.get("/history/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getUserBetsById(req.params.id, req.query.page, req.query.limit));
    } catch (e) {
        res.sendStatus(404);
    }
})


/**
 * @swagger
 * /api/user/all:
 *  get:
 *   summary: Retrieves all users.
 *   description: Retrieves all existing users an array.
 *   responses:
 *    200:
 *     description: An array of users
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         types: object
 *         properties:
 *          user_id:
 *           type: number
 *           description: user's user id
 *           example: 1
 *          username:
 *           type: string
 *           description: user's username
 *           example: bobthebob
 *          email:
 *           type: string
 *           description: user's email
 *           example: sample@mail.com
 *          date_created:
 *           type: string
 *           description: user's date creation
 *           example: 2022-02-28
 *          profile_pic:
 *           type: string
 *           descrption: URL of user's profile picture
 *           example: https://their.profile.picture.com/location
 *          coins:
 *           type: number
 *           descrption: user's total coins
 *           example: 1000
 *          user_role:
 *           type: string
 *           descrption: user's role type
 *           example: user
 *    404:
 *     description: No existing users, so there would be no top 5 users 
 */
router.get("/all", async (req, res) => {
    try {
        res.json(await dbFetch.getUsers());
    } catch(e) {
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/user/{id}:  
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: user's id
 *      example: 1
 *   summary: Retrieves a specific user by id.
 *   description: Retrieves a specific user using their user id as an object.
 *   responses:
 *    200:
 *     description: User object
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         user_id:
 *          type: int
 *          description: user's user id
 *          example: 1
 *         username:
 *          type: string
 *          description: user's username
 *          example: bobthebob
 *         email:
 *          type: string
 *          description: user's email
 *          example: sample@mail.com
 *         date_created:
 *          type: string
 *          description: user's date creation
 *          example: 2022-02-28
 *         profile_pic:
 *          type: string
 *          descrption: URL of user's profile picture
 *          example: https://their.profile.picture.com/location
 *         coins:
 *          type: int
 *          descrption: user's total coins
 *          example: 1000
 *         user_role:
 *          type: string
 *          descrption: user's role type
 *          example: user
 *         bets_placed:
 *          type: int
 *          descrption: user's total bets placed
 *          example: 21
 *         rank:
 *          type: int
 *          descrption: user's rank in the leaderboard
 *          example: 13
 *         banned:
 *          type: object
 *          properties:
 *           ban_id:
 *            type: number 
 *            description: ban id
 *            example: 8
 *           user_id:
 *            type: number
 *            description: ban's user id
 *            example: 1
 *           start_date:
 *            type: string
 *            description: ban's start date
 *            example: 2022-04-04
 *           reason:
 *            type: string 
 *            description: ban's reason
 *            example: Use of illegal plugin.
 *         timeout:
 *          type: object
 *          properties:
 *           ban_id:
 *            type: number 
 *            description: ban id
 *            example: 17
 *           user_id:
 *            type: number
 *            description: timeout's user id
 *            example: 1
 *           start_date:
 *            type: string
 *            description: timeout's start date
 *            example: 2022-04-04
 *           end_date:
 *            type: string
 *            description: timeout's end date
 *            example: 2022-04-04
 *           reason:
 *            type: string 
 *            description: timeout's reason
 *            example: Spamming.
 *    404: 
 *     description: No query specified, or no user found using the specified id.
 */
router.get("/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getUserById(req.params.id)); 
    } catch(e) {
        res.sendStatus(404);
    }
})


module.exports = router;

