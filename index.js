require("dotenv").config();
const express = require("express");

// Database
const db = require("./db");
// create tables
const models = require("./models");
models.init();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    Logger.debug(`Example app listening on port ${port}!`);
});
