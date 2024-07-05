const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');


router.get('/admin/articles', (req, res) => {
    res.send("ROTA DE ARTIGOS")
});

router.get('/admin/articles/new', (req, res) => {

    Category.findAll().then((result) => {
        res.render("admin/articles/new", { categories: result })
    })

})

router.post('/articles/save', function (req, res) {
  
    let data = {
        title: req.body.title,
        body: req.body.body,
        categoryId: req.body.category,
        slug: slugify(req.body.title)
    }

    Article.create(data).then((result) => {
        res.redirect('/admin/articles')
    })
})

module.exports = router;