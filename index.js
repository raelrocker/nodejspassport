const express = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');

const app = express();
//app.use(express.json());

mongoose.connect('mongodb+srv://raelrocker:DXZZgZ9pb@cluster0-1nwyc.mongodb.net/exp_passport?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

/** PASSPORT BASIC */
//passport.use(require('./src/auth/basic'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'))
//BASIC
//app.get('*', passport.authenticate('basic', { session: false }));

// PASSPORT LOCAL
require('./src/auth/local')(passport);
app.use(methodOverride('_method'));
app.use(session({ secret: '!2fdjsdfe3#555', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session())

require('./src/index')(app, passport);

app.listen(3333, () => {
    console.log('Server is listening on port 3333');
});