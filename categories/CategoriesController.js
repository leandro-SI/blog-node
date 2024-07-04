const express = require('express')
const router = express.Router();
const slugify = require('slugify');
const Category = require('./Category');


// Rotas de Categories
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})

router.post('/categories/save', (req, res) => {
    
    let data = {
        title: req.body.title,
        slug: slugify(req.body.title)
    }

    Category.create(data)
        .then((result) => {
            res.redirect('/admin/categories')
        })
})

router.get('/admin/categories', (req, res) => {

    Category.findAll({
        raw: true
    }).then((result) => {
        res.render('admin/categories/index', { categories: result })
    })

})

router.post('/categories/delete', (req, res) => {
  
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

module.exports = router;