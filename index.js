require("dotenv").config();
const express = require("express");
const {handleInvalidJson, handleUnauthorized, handleNotFound, handleAllOtherErrors} = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");
var cors = require('cors');

// Database
const db = require("./db");
// Create tables
const models = require("./models");
models.init();

const app = express();

app.use(express.json());

app.use(morganMiddleware);

app.use(cors());

//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerSpec");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));

//Routes
//add user routes
app.use("/api/users", require("./routes/userRoutes"));
//add video routes
app.use("/api/videos", require("./routes/videoRoutes"));
//add like routes
app.use("/api/likes", require("./routes/likeRoutes"));
//add comment routes
app.use("/api/comments", require("./routes/commentRoutes"));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

//Added error handler middleware functions to the pipeline
app.use(handleInvalidJson);
app.use(handleUnauthorized);
app.use(handleNotFound);
app.use(handleAllOtherErrors);

const port = process.env.PORT || 3001;

app.listen(port, () => {
    Logger.debug(`Example app listening on port ${port}!`);
});
