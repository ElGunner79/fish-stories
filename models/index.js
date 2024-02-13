"use strict";
const User = require("./user");
const Video = require("./video");
const Comment = require("./comment");
const Like = require("./like");

async function init() {
    // create relationships between modelss
    User.hasMany(Video, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Video.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        }
    });
    User.hasMany(Comment, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Comment.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    User.hasMany(Like, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        }
    });
    Like.belongsTo(User, {
        foreignKey: {
            name: "userId",
            allowNull: false,
        },
    });
    Video.hasMany(Comment, {
        foreignKey: {
            name: "videoId",
            allowNull: false,
        },
    });
    Comment.belongsTo(Video, {
        foreignKey: {
            name: "videoId",
            allowNull: false,
        },
    });
    Video.hasMany(Like, {
        foreignKey: {
            name: "videoId",
            allowNull: false,
        },
    });
    Like.belongsTo(Video, {
        foreignKey: {
            name: "videoId",
            allowNull: false,
        }
    });
    // sync all models with database
    await User.sync();
    await Video.sync();
    await Comment.sync();
    await Like.sync();
}
module.exports = {
    init,
};