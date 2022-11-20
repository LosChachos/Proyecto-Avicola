const { Passport } = require('passport');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require('../util/database')
const helpers = require('../lib/helpers');
const {loginUser} = require("../util/consultas");

passport.use('local.login', new LocalStrategy({
    usernameField: 'user',          // Nombre del campo  convertir a constante
    passwordsField: 'password',      // Nombre del campo  convertir a constante
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await db.query(loginUser, [username]);
    console.log(rows);
    if (rows.length > 0) {
        const user = rows[0];
        console.log(user.password);
        const validPassword = await helpers.matchPassword(password, user.password);
        console.log(validPassword);
        if (validPassword) {
            done(null, user );
        } else {
            done('Contraseña inválida');
        }
    } else {
        return done('El usuario no existe');
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'user',          // Nombre del campo  convertir a constante
    passwordsField: 'password',      // Nombre del campo  convertir a constante
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { id, name, lastname, email, phone } = req.body;
    const newPerson = {
        id,
        name,
        lastname,
        email,
        phone
    };

    const usernameInto = await db.query(loginUser, [username])
    if (usernameInto.length == 0) {
        try {

            await db.query('INSERT INTO persons SET ?', [newPerson]);
            const newUser = {
                username,
                password,
                user_type: "Admin",  // Nombre  del campo   convertir   a constante
                id_person: id
            }
            newUser.password = await helpers.encryptPassword(password);
            const result = await db.query('INSERT INTO users SET ?', [newUser]);
            newUser.id = result.insertId;
            console.log(result);
            return done(null, newUser);

        } catch (error) {
            return done("Usuario con esa identificación ya existe");
        }
    } else {
        return done("Nombre de usuario ya existe" );
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});