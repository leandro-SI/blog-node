const express = require('express')
const router = express.Router();
const slugify = require('slugify');
const Category = require('./Category');
const adminAuth = require('../middlewares/adminAuth');


// Rotas de Categories
router.get('/admin/categories/new', adminAuth, (req, res) => {
    res.render('admin/categories/new')
})

router.post('/categories/save', adminAuth, (req, res) => {
    
    let data = {
        title: req.body.title,
        slug: slugify(req.body.title)
    }

    Category.create(data)
        .then((result) => {
            res.redirect('/admin/categories')
        })
})

router.get('/admin/categories', adminAuth, (req, res) => {

    Category.findAll({
        raw: true
    }).then((result) => {
        res.render('admin/categories/index', { categories: result })
    })

})

router.post('/categories/delete', adminAuth, (req, res) => {
  
    let id = req.body.id;

    if (id != null) {
        if (!isNaN(id)) {
            Category.destroy({
                where: {
                    id: id
                }
            }).then((result) => {
                res.redirect('/admin/categories')
            })
        } else {
            res.redirect('/admin/categories')
        }
    } else {
        res.redirect('/admin/categories')
    }

});

router.get('/admin/categories/edit/:id', adminAuth, (req, res) => {
    var id = req.params.id;

    if (isNaN(id))
        res.redirect('/admin/categories')

    Category.findByPk(id).then((result) => {
        if (result != null) {
            res.render("admin/categories/edit", { categoria: result })
        } else {
            res.redirect('/admin/categories')
        }
    }).catch((err) => {
        res.redirect('/admin/categories')
    })

})

router.post('/categories/update', adminAuth, (req, res) => {

    let data = {
        id: req.body.id,
        title: req.body.title,
        slug: slugify(req.body.title)
    }

    Category.update(data, {
        where: {
            id: data.id
        }
    }).then(() => {
        res.redirect('/admin/categories')
    })

})

module.exports = router;