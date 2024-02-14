require("dotenv").config();
const express = require("express");
const Logger = require("./logging/logger");

// Database
const db = require("./db");
// create tables
const models = require("./models");
models.init();

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    Logger.debug(`Example app listening on port ${port}!`);
});
