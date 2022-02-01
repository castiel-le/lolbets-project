const express = require("express");
const app = express();
const router = require("./routes/api.js");

// all api calls to db is in /murals
app.use("/api", router);

// directory for react components
app.use(express.static(path.resolve(__dirname, "../frontend/build")));

module.exports = app;