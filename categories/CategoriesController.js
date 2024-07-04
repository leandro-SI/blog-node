const express = require('express')
const router = express.Router();


// Rotas de Categories
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})

module.exports = router;