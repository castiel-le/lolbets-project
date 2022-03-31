const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const router = express.Router({mergeParams:true});
const dbFetch = require("../db/dbFunctions")

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
        done(null, {id: user.user_id, role: user.user_role, coins: user.coins});
    });
});

passport.deserializeUser(function(user, done){
    process.nextTick(function(){
        return done(null, user);
    });
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
        console.log(e);
        res.sendStatus(404);
    }
});

//Route to get non top 5 users
router.get("/user/nontop5", async (req, res) => {
    try {
        if (req.query.page){
            res.json(await dbFetch.getRemainingUsers(req.query.page));
        } else if (req.query.count){
            res.json(await dbFetch.getNumOfUsers());
        } else {
            res.sendStatus(404, "second not found");
        }
    } catch(e) {
        console.log(e);
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

// gets all the bets a user has placed
router.get("/allbets/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getAllBetsForUser(req.params.id));
    } catch(e) {
        console.log(e)
        res.sendStatus(404);
    }
});

router.get("/allbets/matchdata/:id", async (req, res) => {
    try {
        res.json(await dbFetch.getAllBetsForUserWithMatchData(req.params.id));
    } catch(e){
        res.sendStatus(404);
    }
})

//get all custom bets for a user with match data
router.get("/custombets/:id", async (res, req) => {
    try {
        res.json(await dbFetch.getAllCustomBetsForUserWithMatchData(req.params.id));
    } catch (e){
        res.sendStatus(404);
    }
});

//create a new custom bet or edit existing bet
router.put("/custombets", async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(404);
        }
        if (req.body.creator_id && req.body.category_id && req.body.match_id && req.body.win_conditions) {
            const response = await dbFetch.createCustomBet(
                req.body.creator_id, 
                req.body.category_id, 
                req.body.match_id, 
                req.body.win_conditions
            );
            response.ok ? res.sendStatus(200) : res.sendStatus(404);
        }
    } catch(e){
        res.sendStatus(404);
    }
})

//delete existing custom bet
router.delete("/custombets", async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(404);
        }

        if (req.body.bet_id) {
            const response = await dbFetch.destroyExistingCustomBet(req.body.bet_id);
            res.sendStatus(response ? 200 : 404);
        } else {
            res.sendStatus(404);
        }
    } catch (e){
        res.sendStatus(404);
    }
})

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

router.put("/bans", async (req, res) => {
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

router.put("/timeouts", async (req, res) => {
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

router.delete("/timeouts", async (req, res) => {
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

router.delete("/bans", async (req, res) => {
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

router.get("/categories", async (req, res) => {
    try {
        res.json(await dbFetch.getCategories());
    } catch(e) {
        res.sendStatus(404);
    }
})

router.get("/payout", async (req, res) => {
    if (!req.query.time1 || !req.query.amount) {
        res.sendStatus(404);
    }
    try {
        res.json(await dbFetch.getPayoutPercentageCustomBet(req.query.time1, req.query.amount, req.query.time2));
    } catch (e){
        console.log(e);
        res.sendStatus(404);
    }
})

module.exports = [
    router,
]
