const express = require("express");
const app = express();
const router = require("./routes/api");
const path = require("path");
const bodyParser = require("body-parser");

// all api calls to db is in /murals
app.use("/api", router);

//configure app to use bodyparser, which lets the app process POST requests
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// directory for react components
app.use(express.static(path.resolve(__dirname, "../frontend/build")));



module.exports = app;