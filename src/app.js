'use strict'

const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

mongoose.connect("mongodb+srv://diogoX451:dnsg494743@cluster0.pd9yg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

const temperature = require('./models/temperatura');
const index = require('./routes/base');
const temperatureroute = require('./routes/temperatura-routes');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

app.use('/', index);
app.use('/temperature', temperatureroute)

module.exports = app;