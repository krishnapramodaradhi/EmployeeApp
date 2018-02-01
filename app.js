/**
 * All the frameworks and node packages goes here
 */
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const dotenv        = require('dotenv').config();
const path          = require('path');
const favicon       = require('serve-favicon');

/**
 * DB connection goes here
 */
//const db            = require('./api/utils/db');
const dbLoc         = require('./api/utils/dbLocal');

/**
 * routes goes here
 */
const employee      = require('./api/routes/employee');

/**
 * Middlewares that'll accept json and url encoded data
 */
app.use(favicon(path.join(__dirname, 'client', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * Middleware for Express to recognize the static files in the project 
 */
app.use(express.static(path.join(__dirname, 'client')));

/**
 * Middlewares to handle incoming routes
 */
app.use('/employee', employee);

app.get('*', (req, res) => {
    res.sendFile('./client/index.html', { root: __dirname});
})

module.exports = app;