const express = require('express');
const { validationResult } = require('express-validator');
const { videoValidator } = require("../validators/videoValidator");
const { idParamValidator } = require("../validators/index");
const router = express.Router();
const videoController = require('../controllers/videoController');
const e = require('express');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: process.env.UPLOADS_DIR || 'uploads' });

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
 *      multipart/form-data:
 *       schema:
 *        type: object
 *        properties:
 *          videoTitle:
 *              type: string
 *          videoDesc:
 *              type: string
*          location:
 *              type: string
 *          userId:
 *              type: integer
 *              format: int64
 *              example: 1
 *          video:
 *              type: string
 *              format: binary
 *    responses:
 *       '200':
 *          description: A successful response
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: integer
 *                    example: 200
 *                  data:
 *                    type: object
 *                    properties:
 *                      id:
 *                        type: integer
 *                        example: 1
 *                      title:
 *                        type: string
 *                        example: "Video Title"
 *                      content:
 *                        type: string
 *                        example: "Video Content"
 *                      userId:
 *                        type: integer
 *                        example: 1
 *       '400':
 *          description: Invalid JSON
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: integer
 *                    example: 400
 *                  message:
 *                    type: string
 *                    example: "Invalid JSON"
 *       '404':
 *          description: Video not found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: integer
 *                    example: 404
 *                  message:
 *                    type: string
 *                    example: "Video not found"
 *       '422':
 *          description: Validation error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: integer
 *                    example: 422
 *                  errors:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        msg:
 *                          type: string
 *                          example: "Title is required"
 *                        param:
 *                          type: string
 *                          example: "title"
 *                        location:
 *                          type: string
 *                          example: "body"
 *       '500':
 *          description: Server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  result:
 *                    type: integer
 *                    example: 500
 *                  message:
 *                    type: string
 *                    example: "Server error"
 */
router.post('/', upload.single('video'), async (req, res, next) => {
    try {
        // console.log(req.body);
        const errors = []//validationResult(req);
        if (true) {
            // Get the video file from req.file and write it to a location
            const videoFile = req.file;

            // Assuming createVideo returns the stored video data
            const data = await videoController.createVideo({
                userId: req.body.userId,
                videoTitle: req.body.videoTitle,
                videoDesc: req.body.videoDesc,
                location: req.body.location,
                filename: videoFile.filename,
            });

            if (!data) {
                res.status(404).json({ result: 404, message: "Video not found" });
            } else {
                res.send({ result: 200, data: data });
            }
        } else {
            res.status(422).json({ result: 422, errors: errors.array() });
        }
    } catch (err) {
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
