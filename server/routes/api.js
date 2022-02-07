const express = require("express");
const router = express.Router();

router.get("/helloworld", async (req, res) => {
    res.json({"message":"Hello There"});
});

//Route to get only the fields necessary for logging in, most likely be changed later
router.get("/login", async (req,res) => {
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
    }
    catch(error){
        return res.json({"Error":error})
    }
});

//Route to create a user when they signup, non functional yet
router.post("/signup", async (req, res) => {
    try {
        res.send(req.body);
        console.log("successfully sent!");
        console.log(req.body);
    }
    catch(e){
        console.log("error occurred");
    }
});


//Route to get match information
router.get("/matches", async (req, res) => {
    res.json({
        "match_id": 9,
        "team1_id": 181,
        "team2_id": 183,
        "winner_id": 183,
        "match_start_time": 1644037200,
        "in_progress": false,
        "game_length": 2932,
        "pandascore_id": 620600
        });
})

module.exports = [
    router,
]