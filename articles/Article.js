const Sequelize = require('sequelize');
const connection = require('../database/database');
const Category = require('../categories/Category');

const Article = connection.define('articles', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})

Category.hasMany(Article); // Uma Categoria tem muitos Artigos
Article.belongsTo(Category); // Um Artigo pertence a uma Categoria

Article.sync({force: false})
    .then(() => {
        console.log('Tabela Article sincronizada.');
    })
    .catch(error => {
        console.error('Erro ao sincronizar a tabela Article:', error);
    });

module.exports = Article;