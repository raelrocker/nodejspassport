const express = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const passport = require('passport');
const mongoose = require('mongoose');
const path = require('path');


const app = express();
//app.use(express.json());

mongoose.connect('mongodb+srv://raelrocker:DXZZgZ9pb@cluster0-1nwyc.mongodb.net/exp_passport?retryWrites=true&w=majority', {
    useNewUrlParser: true
});
mongoose.Promise = global.Promise;

/** PASSPORT BASIC */
//passport.use(require('./src/auth/basic'));

app.use(morgan('dev'));

app.use(passport.initialize());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'))
//BASIC
//app.get('*', passport.authenticate('basic', { session: false }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


require('./src/index')(app);

app.listen(3333, () => {
    console.log('Server is listening on port 3333');
});