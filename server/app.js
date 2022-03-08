const express = require("express");
const app = express();
const router = require("./routes/api");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");


const passport = require("passport");

//establish session for Google authentication
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.authenticate("session"));

// all api calls to db is in /murals
app.use("/api", router);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build"));
});

app.use("/userinfo", (req, res) =>{
    res.json(req.user);
});

app.use("/logout", (req, res)=>{
    req.logout();
    res.redirect("/");
})

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