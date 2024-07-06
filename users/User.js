const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('users', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync({force: false})
    .then(() => {
        console.log('Tabela User sincronizada.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar a tabela User:', error);
    });

module.exports = User;