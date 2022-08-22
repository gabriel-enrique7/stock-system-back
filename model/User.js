const Sequelize = require('sequelize');
const connection = require('../db/connection');

const User = connection.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }

}, { createdAt: false, updatedAt: false });

User.sync({ force: false });
module.exports = User;