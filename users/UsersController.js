const express = require('express')
const router = express.Router();
const User = require('./User');
const bcrypt = require('bcryptjs');

router.get('/admin/users', (req, res) => {

    User.findAll().then((users) => {
        res.render('admin/users/index', {users: users})
    })

})

router.get('/admin/users/create', (req, res) => {
    res.render('./admin/users/create')
})

router.post('/users/create', function (req, res) {

    let password = req.body.password;
    let email = req.body.email;

    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (user == null) {
            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
        
            var data = {
                email: email,
                password: hash
            }
        
            User.create(data).then((response) => {
                res.redirect('/');
            }).catch((err) => {
                res.redirect('/')
            })
        } else {
            res.redirect('/admin/users/create');
        }
    })



})

module.exports = router;