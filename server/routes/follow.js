const express = require("express");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");


/**
 * @swagger
 * /api/follow/check:
 *  get:
 *   parameters:
 *   - name: follower_id
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: follower's user id
 *      example: 1
 *   - name: following_id
 *     in: query
 *     required: true
 *     schema:
 *      type: number
 *      description: follower's following user id
 *      example: 2
 *   summary: Checks if user is following a specific user.
 *   description: Checks if user is following a specific user and returns a boolean.
 *   responses:
 *    200:
 *     description: Object
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         result:
 *          type: boolean
 *          description: True of follower is following the specified user
 *          example: true
 *    404:
 *     description: Missing/invalid query, or user not found.
 */
router.get("/check", async (req, res) => {
    try {
        if (req.query.follower_id && req.query.following_id) {
            res.json(await dbFetch.checkIfFollowing(req.query.follower_id, req.query.following_id));
        } else {
            res.sendStatus(404);
        }
    } catch(e){
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/follow/{id}:  
 *  get:
 *   parameters:
 *   - name: id
 *     in: path
 *     required: true
 *     schema:
 *      type: number
 *      description: user id
 *      example: 23
 *   summary: Retrieves user's following.
 *   description: Retrieves user's following users as an array.
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
 *          follow_id:
 *           type: int
 *           description: follow_id
 *           example: 1
 *          follower_id:
 *           type: int
 *           description: user who is following
 *           example: 2
 *          following_id:
 *           type: int
 *           description: user who is being followed
 *           example: 3
 *          user:
 *           type: object
 *           properties:
 *            user_id:
 *             type: int
 *             description: user's user id
 *             example: 1
 *            username:
 *             type: string
 *             description: user's username
 *             example: bobthebob
 *            email:
 *             type: string
 *             description: user's email
 *             example: sample@mail.com
 *            date_created:
 *             type: string
 *             description: user's date creation
 *             example: 2022-02-28
 *            profile_pic:
 *             type: string
 *             descrption: URL of user's profile picture
 *             example: https://their.profile.picture.com/location
 *            coins:
 *             type: int
 *             descrption: user's total coins
 *             example: 1000
 *            user_role:
 *             type: string
 *             descrption: user's role type
 *             example: user
 *            banned:
 *             type: object
 *             properties:
 *              ban_id:
 *               type: number 
 *               description: ban id
 *               example: 8
 *              user_id:
 *               type: number
 *               description: ban's user id
 *               example: 1
 *              start_date:
 *               type: string
 *               description: ban's start date
 *               example: 2022-04-04
 *              reason:
 *               type: string 
 *               description: ban's reason
 *               example: Use of illegal plugin.
 *            timeout:
 *             type: object
 *             properties:
 *              ban_id:
 *               type: number 
 *               description: ban id
 *               example: 17
 *              user_id:
 *               type: number
 *               description: timeout's user id
 *               example: 1
 *              start_date:
 *               type: string
 *               description: timeout's start date
 *               example: 2022-04-04
 *              end_date:
 *               type: string
 *               description: timeout's end date
 *               example: 2022-04-04
 *              reason:
 *               type: string 
 *               description: timeout's reason
 *               example: Spamming.
 *    404: 
 *     description: No query specified, or one of the query parameters is invalid
 */
router.get("/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getAllFollowing(req.params.id));
    } catch(e){
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/follow:
 *  put:
 *   requestBody:
 *     description: Information of ban to be deleted
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         follower_id:
 *          type: number
 *          description: user who is following's id
 *          example: 1
 *         following_id:
 *          type: number
 *          description: user who is being followed's id
 *          example: 2
 *   summary: Creates a new follow.
 *   description: Creates a new follow record.
 *   responses:
 *    200:
 *     description: Successfully created follow
 *    404:
 *     description: Missing or invalid body, or user not found
 */
router.put("/", async (req, res) => {
    try {
        if (!req.body){
            res.sendStatus(404);
        }
        if (req.body.follower_id && req.body.following_id){
            const response = await dbFetch.followUser(req.body.follower_id, req.body.following_id);
            res.sendStatus(response ? 200 : 404);
        }
    } catch(e) {
        res.sendStatus(404);
    }
})

/**
 * @swagger
 * /api/follow:
 *  delete:
 *   requestBody:
 *     description: Information of ban to be deleted
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         follower_id:
 *          type: number
 *          description: user who is following's id
 *          example: 1
 *         following_id:
 *          type: number
 *          description: user who is being followed's id
 *          example: 2
 *   summary: Deletes a follow.
 *   description: Deletes an existing follow record.
 *   responses:
 *    200:
 *     description: Successfully deleted follow
 *    404:
 *     description: Missing or invalid body, or user(s) not found
 */
router.delete("/", async (req, res) => {
    try {
        if (!req.body){
            res.sendStatus(404);
        }
        if (req.body.follower_id && req.body.following_id){
            const response = await dbFetch.unfollowUser(req.body.follower_id, req.body.following_id);
            res.sendStatus(response ? 200 : 404);
        }
    } catch(e) {
        res.sendStatus(404);
    }
})


module.exports = router;