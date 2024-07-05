const Sequelize = require('sequelize');

const connection = new Sequelize('guia-blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;