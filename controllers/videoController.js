const Video = require('../models/video');

/**
 *
 * @returns Array<Video>
 */
const getVideos = async () => {
    const data = await Video.findAll({});
    return data;
};
/**
 *
 * @param {number} id - video id
 * @returns {Promise<Video>}
 */
const getVideo = async (id) => {
    const data = await Video.findOne({ where: { id: id } });
    return data;
};
/**
 *
 * @param {number} id - video id
 * @returns {Promise<Video>}
 */
const getVideoIncludeAll = async (id) => {
    const data = await Video.findOne({ where: { id: id }, include: { all: true } });
    return data;
};
/**
 *
 * @param {number} id - user id
 * @returns {Promise<Array<Video>>}
 */
const getVideosByUser = async (id) => {
    const data = await Video.findAll({ where: { userId: id } });
    return data;
};
/**
 *
 * @param {Video} data - video data
 * @returns {Promise<Video>}
 */
const createVideo = async (data) => {
    console.log("test");
    console.log(data);
    const video = await Video.create(data);
    return video;
}
/**
 *
 * @param {number} id - video id
 * @param {Video} data - video data
 * @returns {Promise<Video>}
 */
const updateVideo = async (id, data) => {
    const video = await Video.update(data, { where: { id: id } });
    return video;
};
/**
 *
 * @param {number} id - video id
 * @returns {Promise<number>}
 */
const deleteVideo = async (id) => {
    const video = await Video.destroy({ where: { id: id } });
    return video;
};

// exports functions for use in routes
module.exports = {
    getVideo,
    getVideoIncludeAll,
    getVideos,
    createVideo,
    updateVideo,
    deleteVideo,
    getVideosByUser,
};