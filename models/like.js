const { DataTypes } = require("sequelize");
const db = require("../db");

const Like = db.Sequelize.define("Like", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    videoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        // Other model options go here
        tableName: 'Likes'
    }
);

module.exports = Like;