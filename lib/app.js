const express = require('express');
const app = express();
const errorHandler = require('./errorHandler');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
//TODO: add model connections

//TODO: add route connections

app.use(errorHandler());

module.exports = app;