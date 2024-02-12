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

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});
