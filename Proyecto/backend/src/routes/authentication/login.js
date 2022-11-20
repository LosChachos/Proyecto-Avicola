const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', (req,res,next) => {
    passport.authenticate('local.login',{
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.post('/signup', passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', (req,res) => {
    res.send('Bienvenido al login');
});

router.get('/profile', (req,res) => {
    res.send("Inicio de sesión exitoso");
});

router.get('/signup', (req,res) => {
    res.send("Inicio de sesión");
});

module.exports = router;
