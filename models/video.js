const { DataTypes } = require("sequelize");
const db = require("../db");

const Video = db.Sequelize.define("Video", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    videoTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoDesc: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedTime: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
    },
    {
        // Other model options go here
        tableName: 'Videos'
    }
);

module.exports = Video;