const bodyParser = require('body-parser');
const session = require('express-session');
const express = require('express');
const app = express();
const connection = require('./database/database');

const categoriesController = require('./categories/CategoriesController');
const articlesController = require('./articles/ArticlesController');
const usersController = require('./users/UsersController');

const Article = require('./articles/Article');
const Category = require('./categories/Category');
const User = require('./users/User');

const port = 3000;

// View engine
app.set('view engine', 'ejs')

// Static
app.use(express.static('public'))

// Body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Database connect
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!');
    }).catch((err) => {
        console.log('Erro na conexão: ', err)
    })

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

// Rotas
app.get('/', (req, res) => {

    Article.findAll({
        order: [
            ['id', 'DESC']
        ],
        limit: 4
    }).then((result) => {

        Category.findAll().then((categories) => {
            res.render('index', { articles: result, categories: categories })
        })        
    })
})

app.get('/:slug', (req, res) => {
  var slug = req.params.slug

  Article.findOne({
    where: {
        slug: slug
    }
  }).then((result) => {
    if (result != undefined) {

        Category.findAll().then((categories) => {
            res.render('article', { article: result, categories: categories })
        }) 

    } else {
        res.redirect('/')
    }
  }).catch((err) => {
    res.redirect('/')
  })
})

app.get('/category/:slug', (req, res) => {
  var slug = req.params.slug;

  Category.findOne({
    where: {
        slug: slug
    },
    include: [{ model: Article }]
  }).then((category) => {
    if (category != undefined) {

        Category.findAll().then((categories) => {
            res.render('index', { articles: category.articles, categories: categories });
        })
    } else {
        res.redirect('/')
    }
  }).catch((err) => {
    res.redirect('/')
  })
})

app.listen(port, () => console.log(`O servidor está rodando na porta ${port}!`))