const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');


router.get('/admin/articles', (req, res) => {

    Article.findAll({
        include: [{ model: Category }]
    }).then((result) => {
        res.render("admin/articles/index", { articles: result})
    })
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

router.post('/articles/delete', (req, res) => {
  
    let id = req.body.id;

    if (id != null) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id
                }
            }).then((result) => {
                res.redirect('/admin/articles')
            })
        } else {
            res.redirect('/admin/articles')
        }
    } else {
        res.redirect('/admin/articles')
    }

});

router.get('/admin/articles/edit/:id', (req, res) => {
    var id = req.params.id;

    if (isNaN(id))
        res.redirect('/admin/articles')

    Article.findByPk(id).then((article) => {
        if (article != null) {
            Category.findAll().then((categories) => {
                res.render("admin/articles/edit", { article: article, categories: categories })
            })
        } else {
            res.redirect('/admin/articles')
        }
    }).catch((err) => {
        res.redirect('/admin/articles')
    })

})

router.post('/categories/update', (req, res) => {

    let data = {
        id: req.body.id,
        title: req.body.title,
        body: req.body.body,
        categoryId: req.body.category,
        slug: slugify(req.body.title)
    }

    Article.update(data, {
        where: {
            id: data.id
        }
    }).then(() => {
        res.redirect('/admin/articles');
    }).catch((err) => {
        res.redirect('/');
    })

})

module.exports = router;