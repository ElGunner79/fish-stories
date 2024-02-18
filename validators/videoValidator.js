const { body, param } = require("express-validator");

const videoValidator = [
    body("userId", "userId is required").not().isEmpty(),
    body("userId", "userId should be numeric").isNumeric(),
    body("title", "title is required").not().isEmpty(),
    body("content", "content is required").not().isEmpty(),
];

const videoUpdateValidator = [
    param("id", "Video id is required").not().isEmpty(),
    param("id", "Video id should be numeric").isNumeric(),
    body("userId", "userId is required").not().isEmpty(),
    body("userId", "userId should be numeric").isNumeric(),
    body("title", "title is required").not().isEmpty(),
    body("content", "content is required").not().isEmpty(),
];

module.exports = {
    videoValidator,
    videoUpdateValidator,
};