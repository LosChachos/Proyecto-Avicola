const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const express_session = require('express-session');

// Constantes
const CONST = {
    PORT: 5000,
    loginDir: "" 
};

// Initializations
const app = express();
require('./lib/passport');


// settings
app.set('port', process.env.PORT || CONST.PORT);


// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(express_session({ secret: 'SECRET' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Global variables
app.use((req,res, next) => {
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication/login'));
app.use('/farms',require('./routes/farms'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server

app.listen(app.get('port'), () => {
    console.log('server on port ' + app.get('port'));
});

module.exports = CONST;