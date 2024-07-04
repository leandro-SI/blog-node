const express = require('express');
const router = express.Router();
const Category = require('../categories/Category');


router.get('/articles', (req, res) => {
    res.send("ROTA DE ARTIGOS")
});

router.get('/admin/articles/new', (req, res) => {

    Category.findAll().then((result) => {
        res.render("admin/articles/new", { categories: result })
    })

})

module.exports = router;