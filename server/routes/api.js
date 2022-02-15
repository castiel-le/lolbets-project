const express = require("express");
const router = express.Router({mergeParams:true});
const dbFetch = require("../db/dbFunctions")

router.get("/helloworld", async (req, res) => {
    res.json({"message":"Hello There"});
});

//Route to get only the fields necessary for logging in, most likely be changed later
router.get("/login", async (req, res) => {
    return res.json({
        "user_id":1,
        "username":"Bob",
        "password_id":1
    });
});

//Route to get all bets (fake data for now)
router.get("/bets", async (req, res) => {
    try {
        return res.json([{
            "bet_id":1,
            "creator_id":1,
            "category_id":1,
            "win_condition_id":1,
            "minimum_coins":10,
            "maximum_coins":100,
            "match_id":1,
            "bet_locked":false
        }, {
            "bet_id":2,
            "creator_id":1,
            "category_id":1,
            "win_condition_id":1,
            "minimum_coins":100,
            "maximum_coins":1000,
            "match_id":2,
            "bet_locked":false
        }]);
    } catch(error){
        return res.json({"Error":error})
    }
});

//Route to create a user when they signup, non functional yet
router.post("/signup", async (req, res) => {
    try {
        res.send(req.body);
        console.log("successfully sent!");
        console.log(req.body);
    } catch(e){
        console.log("error occurred");
    }
});


//Route to get match information
router.get("/matches", async (req, res) => {
    /*res.json({
        "match_id": 9,
        "team1_id": 181,
        "team2_id": 183,
        "winner_id": 183,
        "match_start_time": 1644037200,
        "in_progress": false,
        "game_length": 2932,
        "pandascore_id": 620600
        });*/
    res.json(await dbFetch.getMatches());
});


//Route to get badges
router.get("/badges", async (req, res) => {
    res.json(await dbFetch.getBadges());
});

//Route to get teams
router.get("/teams", async (req, res) => {
    res.json(await dbFetch.getTeams());
});

//Route to get a specific team
router.get("/teams/:id", async (req, res) => {
    res.json((await dbFetch.getTeamById(req.params.id))[0]);
});

//Route to get all users
router.get("/user", async (req, res) => {
    res.json(await dbFetch.getUsers());
});

//Route to get a user by id
router.get("/user/:id", async (req, res) => {
    res.json((await dbFetch.getUserById(req.params.id))[0]);
})

router.get("/teams/history/:id", async (req, res) => {
    res.json(await dbFetch.getMatchHistory(req.params.id));
})
module.exports = [
    router,
]