const Sequelize = require('sequelize');
const instance = require('../db');
// salt: {
//     type: Sequelize.STRING,
//     allowNull: true,
//   },
// isAdmin: {
//     type: Sequelize.BOOLEAN,
//     allowNull: true,
//     defaultValue: true,
// },
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
    }
};

const setts = {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false,
    timezone: 'America/Sao_Paulo',
};

module.exports = instance.define('user', columns, setts);