const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../util/database')
const {getAllUsernames} = require("../util/consultas");

router.post('/login', function (req, res, next) {
    passport.authenticate('local.login', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.send(userLogged = { id: user.id, type: user.user_type, username: user.username });
        });
    })(req, res, next);
});

router.post('/signup', function (req, res, next) {
    passport.authenticate('local.signup', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/signup'); }
        // req.logIn(user, function (err) {
        // if (err) { return next(err); }
        return res.send(user);
        // });
    })(req, res, next);
});


router.get('/login', (req, res) => {
    res.send('Bienvenido al login');
});

router.get('/users',async (req, res)=>{
    const rows = await db.query(getAllUsernames);
    res.send(rows);
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/login');
});

router.get('/profile', (req, res) => {
    res.write(req.user);
    console.log(req.user);
});

router.get('/signup', (req, res) => {
    res.send("Inicio de sesión");
});

module.exports = router;
