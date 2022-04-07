const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const router = express.Router();
const dbFetch = require("../db/dbFunctions");

//Route to get authentication from Google
router.get("/federated/google", passport.authenticate("google"));

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
                cb(null, user.toJSON());
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
        cb(e);
    }
}));

//configure Passport to manage login session
passport.serializeUser(function(user, done){
    process.nextTick(function(){
        done(null, {id: user.user_id, role: user.user_role, coins: user.coins, banned: user.banned, timeout: user.timeout});
    });
});

passport.deserializeUser(function(user, done){
    process.nextTick(function(){
        return done(null, user);
    });
});

module.exports = router;