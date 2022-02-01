const express = require("express");
const router = express.Router();
const cache = require("memory-cache");

router.get("/helloworld", async (req, res) => {
    res.send("Hello There");
});

module.exports = [
    router,
]