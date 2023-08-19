const Sequelize = require('sequelize');
const instance = require('../../db');

const columns = {
    text: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    userId: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
    }
};

const setts = {
    freezeTableName: true,
    tableName: 'chat',
    timestamps: false,
    timezone: 'America/Sao_Paulo',
};

module.exports = instance.define('chat', columns, setts);