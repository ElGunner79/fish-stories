require("dotenv").config();
const express = require("express");
const handlebars = require('express-handlebars');
const {handleInvalidJson, handleUnauthorized, handleNotFound, handleAllOtherErrors} = require("./errors/errorHandler");
const morganMiddleware = require("./logging/morganMiddleware");
const Logger = require("./logging/logger");

// Database
const db = require("./db");
// Create tables
const models = require("./models");
models.init();

const app = express();

app.set('view engine', 'hbs');

app.engine('hbs', handlebars.engine({
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.use(express.json());

//Serves static files (needed to import a css file in a react app)
app.use(express.static('public'));

app.use(morganMiddleware);

//Swagger
if(process.env.NODE_ENV === "development") {
    const swaggerUi = require("swagger-ui-express");
    const swaggerSpec = require("./swagger/swaggerSpec");
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec.default));
}

//Routes
app.use("/api/users", require("./routes/userRoutes"));
// add video routes
app.use("/api/videos", require("./routes/videoRoutes"));
// add like routes
app.use("/api/likes", require("./routes/likeRoutes"));
// add comment routes
app.use("/api/comments", require("./routes/commentRoutes"));

app.get("/", (req, res) => {
    res.render('main', { layout: 'index' });
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
