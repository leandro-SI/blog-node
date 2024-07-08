const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');
const Article = require('./Article');
const slugify = require('slugify');
const adminAuth = require('../middlewares/adminAuth');


router.get('/admin/articles', adminAuth, (req, res) => {

    Article.findAll({
        include: [{ model: Category }]
    }).then((result) => {
        res.render("admin/articles/index", { articles: result})
    })
});

router.get('/admin/articles/new', adminAuth, (req, res) => {

    Category.findAll().then((result) => {
        res.render("admin/articles/new", { categories: result })
    })

})

router.post('/articles/save', adminAuth, (req, res) => {
  
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

router.post('/articles/delete', adminAuth, (req, res) => {
  
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

router.get('/admin/articles/edit/:id', adminAuth, (req, res) => {
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

router.post('/categories/update', adminAuth, (req, res) => {

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

router.get('/articles/page/:page', (req, res) => {
    let page = req.params.page;
    let offset = 0;
    let limit = 4;

    if (isNaN(page) || page == 0 || page == 1) {
        offset = 0;
    } else {
        offset = (parseInt(page) - 1) * limit;
    }

    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [
            ['id', 'DESC']
        ]
    }).then((articles) => {

        let next;
        if (offset + 4 >= articles.count) {
            next = false;
        } else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            articles: articles
        }

        Category.findAll().then((categories) => {
            res.render('admin/articles/page', { result: result, categories: categories})
        })

    })
})

module.exports = router;