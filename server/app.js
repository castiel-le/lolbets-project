const express = require("express");
const app = express();
const router = require("./routes/api");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const dbFetch = require("./db/dbFunctions");


const passport = require("passport");

//establish session for Google authentication
app.set("trust proxy", 1)
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "production" ? true : false
    }
}));

app.use(passport.authenticate("session"));


app.use(express.json())
app.use("/api", router);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build"));
});

app.use("/userinfo", async (req, res) => {
    await updateUser(req);
    if (req.user !== undefined) {
        const user = req.user;
        if (user.banned || user.timeout) {
            req.logout();
        }
        res.json(user);
    } else {
        res.sendStatus(401);
    }
});

/**
 * updates the req.user object of passport js for the new coins value on the db
 * @param {Request} req request object from fetch request
 * @returns only returns if user is undefined ( do not continue if user is undefined )
 */
async function updateUser(req) {
    if (req.user === undefined) {
        return;
    }
    const user = await dbFetch.getUserById(req.user.id);
    req.user.coins = user.coins;
    req.user.banned = user.dataValues.banned;
    req.user.timeout = user.dataValues.timeout;
}

//Router to redirect back
app.use("/oauth2/redirect/google", passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

//configure app to use bodyparser, which lets the app process POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// directory for react components
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

// all the unknown requests are redirected to the react SPA
app.use(function (req, res, next) {
    res.sendFile(path.join(path.resolve(__dirname, "../frontend/build"), "index.html"));
});
module.exports = app;