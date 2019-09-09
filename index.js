const express = require('express');
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
*/


require('./src/index')(app);

app.listen(3333, () => {
    console.log('Server is listening on port 3333');
});