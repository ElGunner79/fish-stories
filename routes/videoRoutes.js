const express = require('express');
const { validationResult } = require('express-validator');
const { videoValidator, videoUpdateValidator } = require("../validators/videoValidator");
const { idParamValidator } = require("../validators/index");
const router = express.Router();
const videoController = require('../controllers/videoController');
const e = require('express');

/**
 * @swagger
 * /api/videos:
 *  get:
 *    description: Use to request all videos
 *    tags:
 *      - Videos
 *    responses:
 *      '200':  
 *          description: A successful response
 *      '404':
 *          description: Video not found
 *      '500':
 *          description: Server error
 */
router.get('/', async (req, res, next) => {
    try {
        const data = await videoController.getVideos();
        res.send({ result: 200, data: data });
    }
    catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/videos/{id}:
 *  get:
 *    description: Use to request a video by ID
 *    tags:
 *      - Videos
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of video to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Video not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/:id', idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await videoController.getVideo(req.params.id);
            if (!data) {
                res.status(404).json({ result: 404, message: "Video not found" });
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({ result: 422, errors: errors.array() });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/videos/{id}/include:
 *  get:
 *    description: Use to request a video by ID with all associations
 *    tags:
 *      - Videos
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of video to fetch
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Video not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/:id/include', idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await videoController.getVideoIncludeAll(req.params.id);
            if (!data) {
                res.status(404).json({ result: 404, message: "Video not found" });
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({ result: 422, errors: errors.array() });
        }
    } catch (err) {
        next(err);
    }
});


/**
 * @swagger
 * /api/videos/user/{id}:
 *  get:
 *    description: Use to request all videos by user ID
 *    tags:
 *      - Videos
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of user to fetch videos from
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Video not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.get('/user/:id', idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await videoController.getVideosByUser(req.params.id);
            if (!data) {
                res.status(404).json({ result: 404, message: "Video not found" });
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({ result: 422, errors: errors.array() });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/videos:
 *  post:
 *    description: Use to create a new video
 *    tags:
 *     - Videos
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - title
 *         - content
 *         - userId
 *        properties:
 *          title:
 *              type: string
 *          content:
 *              type: string
 *          userId:
 *              type: integer
 *              example: 1
 *    responses:
 *       '200':
 *          description: A successful response
 *       '400':
 *          description: Invalid JSON
 *       '404':
 *          description: Video not found
 *       '422':
 *          description: Validation error
 *       '500':
 *          description: Server error
 */
router.post('/', videoValidator, async (req, res, next) => {
    try {
        // console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await videoController.createVideo(req.body);
            if (!data) {
                res.status(404).json({ result: 404, message: "Video not found" });
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({ result: 422, errors: errors.array() });
        }
    }
    catch (err) {
        if (err.name === 'SequelizeForeignKeyConstraintError') {
            res.status(422).send({ errors: err.parent });
        } else {
            next(err);
        }
    }
});

/**
 * @swagger
 * /api/videos/{id}:
 *  put:
 *    description: Use to update a video by ID
 *    tags:
 *      - Videos
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of video to update
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        required:
 *         - title
 *         - content
 *         - userId
 *        properties:
 *          title:
 *              type: string
 *          content:
 *              type: string
 *          userId:
 *              type: integer
 *              example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '400':
 *          description: Invalid JSON
 *      '404':
 *          description: Video not found
 *      '422':
 *         description: Validation error
 *      '500':
 *          description: Server error
 */
router.put('/:id', videoUpdateValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await videoController.updateVideo(req.params.id, req.body);
            res.send({ result: 200, data: data });
        } else {
            res.status(422).json({ result: 422, errors: errors.array() });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /api/videos/{id}:
 *  delete:
 *    description: Use to delete a video by ID
 *    tags:
 *      - Videos
 *    parameters:
 *      - name: id
 *        in: path
 *        description: ID of video to delete
 *        required: true
 *        type: integer
 *        minimum: 1
 *        example: 1
 *    responses:
 *      '200':
 *          description: A successful response
 *      '404':
 *          description: Video not found
 *      '422':
 *        description: Validation error
 *      '500':
 *          description: Server error
 */
router.delete('/:id', idParamValidator, async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const data = await videoController.deleteVideo(req.params.id);
            if (!data) {
                res.status(404).json({ result: 404, message: "Video not found" });
            }
            else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({ result: 422, errors: errors.array() });
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;
