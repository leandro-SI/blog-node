const Sequelize = require('sequelize');

const connection = new Sequelize('guia-blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;