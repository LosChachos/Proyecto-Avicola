const express = require('express');
const router = express.Router();
const passport = require('passport');
const db = require('../util/database')
const {getAllUsernames, loginUser, insertPerson, insertUser} = require("../util/consultas");
const helpers = require('../lib/helpers');

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

router.post('/signup', async (req, res) => {
    const id = req.body['id'];
    const names = req.body['names'];
    const lastnames = req.body['lastnames'];
    const email = req.body['email'];
    const phone = req.body['phone'];
    const username = req.body['username'];
    const pass = req.body['pass'];
    const usernameInto = await db.query(loginUser, [username]);
    if (usernameInto.length == 0) {
        try {
            await db.query(insertPerson, [id,names,lastnames,email,phone]);
            const passEncrypted = await helpers.encryptPassword(pass);
            const result = await db.query(insertUser, [username, passEncrypted, 'Admin', id]);
            const newUser = {
                username,
                password: pass,
                user_type: "Admin",
                id_person: id
            }
            newUser.id = result.insertId;
            console.log('finalmente por aca');
            res.json(newUser);

        } catch (error) {
            console.log(error)
            res.send("Usuario con esa identificación ya existe");      // Modificar para la vista
        }
    } else {
        res.send("Nombre de usuario ya existe");                        // Modificar para la vista
    }
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
