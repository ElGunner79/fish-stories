const { body, param } = require("express-validator");

const likeValidator = [
    body("videoId", "videoId is required").not().isEmpty(),
    body("videoId", "videoId should be numeric").isNumeric(),
    body("userId", "userId is required").not().isEmpty(),
    body("userId", "userId should be numeric").isNumeric(),
];

const likeUpdateValidator = [
    param("id", "Like id is required").not().isEmpty(),
    param("id", "Like id should be numeric").isNumeric(),
    body("videoId", "videoId is required").not().isEmpty(),
    body("videoId", "videoId should be numeric").isNumeric(),
    body("userId", "userId is required").not().isEmpty(),
    body("userId", "userId should be numeric").isNumeric(),
];

module.exports = {
    likeValidator,
    likeUpdateValidator,
};