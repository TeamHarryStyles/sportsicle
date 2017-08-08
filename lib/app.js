const express = require('express');
const morgan = require('morgan');
const app = express();
const errorHandler = require('./errorHandler');
const bodyParser = require('body-parser');
const createAuth = require('./auth/ensure-auth');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));
const ensureAuth = createAuth();
//TODO: add model connections

const auth = require('./routes/auth');


//TODO: add route connections
app.use('/api/auth', auth);
app.use(errorHandler());

module.exports = app;