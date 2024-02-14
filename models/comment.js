const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.Sequelize.define("Comment", {
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
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
},
    {
        // Other model options go here
        tableName: 'Comments'
    }
);

module.exports = Comment;