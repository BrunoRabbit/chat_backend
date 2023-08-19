const Sequelize = require('sequelize');
const instance = require('../../db');

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    token: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lastLogin: {
        type: Sequelize.DATE,
        allowNull: true,
    },
    photo: {
        type: Sequelize.STRING,
    }
};

const setts = {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false,
    timezone: 'America/Sao_Paulo',
};

module.exports = instance.define('user', columns, setts);