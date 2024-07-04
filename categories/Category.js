const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('categories', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Category.sync({force: false})
    .then(() => {
        console.log('Tabela Category sincronizada.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar a tabela Category:', error);
    });

module.exports = Category;