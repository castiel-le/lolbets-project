const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const router = express.Router({mergeParams:true});
const dbFetch = require("../db/dbFunctions")

//Route to get only the fields necessary for logging in, most likely be changed later
router.get("/login", async (req, res) => {
    return res.json({
        "user_id":1,
        "username":"Bob",
        "password_id":1
    });
});

//Route to get authentication from Google
router.get("/login/federated/google", passport.authenticate("google"));

//Strategy for Google authentication
passport.use(new GoogleStrategy({
    clientID: process.env["GOOGLE_CLIENT_ID"],
    clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
    callbackURL: "/oauth2/redirect/google",
    scope: ["profile", "email"]
}, async function(issuer, profile, cb) {
    try {
        const row = await dbFetch.isUserExist(issuer, profile.id);
        if (row) {
            const user = await dbFetch.getUserById(row.dataValues.user_id);
            // If record exist, return user
            // Otherwise, return false to callback
            if (user) {
                // Check if user is banned or have an ongoing timeout
                if (user.dataValues.banned || user.dataValues.timeout) {
                    cb(null, false);
                } else {
                    cb(null, user.toJSON());
                } 
            } else {
                cb(null, false);
            }
        } else {
            // Create new User record
            const user = await dbFetch.createUser(profile.displayName, profile.emails[0].value, profile.picture);
            const jsonUser = user.toJSON();

            // Create new federated_credential record
            await dbFetch.createFederatedCredentials(issuer, profile.id, jsonUser.user_id);
            cb(null, jsonUser);
        }
    } catch (e) {
        console.log(e);
        cb(e);
    }
}));

//configure Passport to manage login session
passport.serializeUser(function(user, done){
    process.nextTick(function(){
        done(null, {id: user.user_id, role: user.user_role});
    });
});

passport.deserializeUser(function(user, done){
    process.nextTick(function(){
        return done(null, user);
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

// allows a user to join a bet
// allows a user to edit their current bet
// test: localhost:3001/api/bets/join?bet=2&user=1&team=891&amount=432
router.put("/bets/join", async (req, res) => {
    // if (!req.user) {
    //     res.sendStatus(403);
    // }
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
        res.status(404).send(exception.message);
        console.error(exception.message);
    }
});

// Deletes a users bet
// test: localhost:3001/api/bets/delete?bet=2&user=1
router.delete("/bets/delete", async (req, res) => {
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
        res.status(404).send(exception.message);
        console.error(exception.message);
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
        } else if (req.query.afterthis && req.query.beforethis){
            res.json(await dbFetch.getMatchesBetween(parseInt(req.query.afterthis), parseInt(req.query.beforethis)));
        } else if (Object.keys(req.query).length === 0){
            res.json(await dbFetch.getMatches());
        } else {
            res.sendStatus(404);
        }
    } catch(e){
        res.sendStatus(404);
    }
});


//Route to get badges
router.get("/badges", async (req, res) => {
    try {
        res.json(await dbFetch.getBadges());
    } catch(e){
        res.sendStatus(404);
    }
});

//Route to get teams
router.get("/teams", async (req, res) => {
    try {
        res.json(await dbFetch.getTeams());
    } catch(e){
        res.sendStatus(404);
    }
});

//Route to get a specific team
router.get("/teams/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getTeamById(req.params.id));
    } catch(e) {
        res.sendStatus(404);
    }
});

//Route to get top 5 users
router.get("/user/top5", async (req, res) => {
    try {
        res.json(await dbFetch.getTop5Users());
    } catch(e){
        res.sendStatus(404);
    }
});

//Route to get non top 5 users
router.get("/user/rest", async (req, res) => {
    try {
        if (req.query.page){
            res.json(await dbFetch.getRemainingUsers(req.query.page));
        } else if (req.query.count){
            res.json(await dbFetch.getNumOfUsers());
        } else {
            res.sendStatus(404);
        }
    } catch(e) {
        res.sendStatus(404);
    }
})

router.get("/user/search", async (req, res) => {
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

//Route to get all users
router.get("/user/all", async (req, res) => {
    try {
        res.json(await dbFetch.getUsers());
    } catch(e) {
        res.sendStatus(404);
    }
})

//Route to get a user by id
router.get("/user/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getUserById(req.params.id)); 
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
})

// route to get the users current coin count by id
router.get("/user/coins/:id", async (req, res) => {
    try {
        res.json({coins: await dbFetch.getUserCoins(req.params.id)})
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});

// gets all the bets a user has placed
router.get("/allbets/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getAllBetsForUser(req.params.id));
    } catch(e) {
        console.log(e)
        res.sendStatus(404);
    }
});

router.get("/teams/history/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getMatchHistory(req.params.id, req.query.page));
    } catch(e){
        res.sendStatus(404);
    }
})

router.get("/user/history/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getUserBetsById(req.params.id, req.query.page, req.query.limit));
    } catch (e) {
        console.log(e)
        res.sendStatus(404);
    }
})

router.get("/bans", async (req, res) => {
    try {
        res.json(await dbFetch.getAllBans());
    } catch(e) {
        res.sendStatus(404);
    }
})

router.get("/timeouts", async (req, res) => {
    try {
        res.json(await dbFetch.getAllTimeouts());
    } catch(e) {
        res.sendStatus(404);
    }
})
module.exports = [
    router,
]