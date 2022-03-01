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
    try {
        if (req.query.after){
            //console.log(req.query.after);
            //res.json({"date": parseInt(req.query.after)});
            res.json(await dbFetch.getMatchesAfter(parseInt(req.query.after), parseInt(req.query.page)));
        }
        else if (req.query.afterthis && req.query.beforethis){
            res.json(await dbFetch.getMatchesBetween(parseInt(req.query.afterthis), parseInt(req.query.beforethis)));
        }
        else if (Object.keys(req.query).length === 0){
            res.json(await dbFetch.getMatches());
        }
        else {
            res.sendStatus(404);
        }
    }
    catch(e){
        res.sendStatus(404);
    }
});


//Route to get badges
router.get("/badges", async (req, res) => {
    try {
        res.json(await dbFetch.getBadges());
    }
    catch(e){
        res.sendStatus(404);
    }
});

//Route to get teams
router.get("/teams", async (req, res) => {
    try {
        res.json(await dbFetch.getTeams());
    }
    catch(e){
        res.sendStatus(404);
    }
});

//Route to get a specific team
router.get("/teams/:id", async (req, res) => {
    try {
        res.json((await dbFetch.getTeamById(req.params.id)));
    }
    catch(e) {
        res.sendStatus(404);
    }
});

//Route to get top 5 users
router.get("/user/top5", async (req, res) => {
    try {
        res.json(await dbFetch.getTop5Users());
    }
    catch(e){
        res.sendStatus(404);
    }
});

//Route to get non top 5 users
router.get("/user/rest", async (req, res) => {
    try {
        if (req.query.page){
            res.json(await dbFetch.getRemainingUsers(req.query.page));
        }
        else if (req.query.count){
            res.json(await dbFetch.getNumOfUsers());
        }
        else {
            res.sendStatus(404);
        }
    }
    catch(e) {
        res.sendStatus(404);
    }
})

//Route to get all users
router.get("/user/all", async (req, res) => {
    try {
        res.json(await dbFetch.getUsers());
    }
    catch(e) {
        res.sendStatus(404);
    }
})

//Route to get a user by id
router.get("/user/:id", async (req, res) => {
    try {
        res.json((await dbFetch.getUserById(req.params.id))[0]); 
    }
    catch(e) {
        res.sendStatus(404);
    }
})

router.get("/teams/history/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getMatchHistory(req.params.id, req.query.page));
    }
    catch(e){
        res.sendStatus(404);
    }
})
module.exports = [
    router,
]