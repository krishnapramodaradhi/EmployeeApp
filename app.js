/**
 * All the frameworks and node packages goes here
 */
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const dotenv        = require('dotenv').config();

/**
 * routes goes here
 */
const employee      = require('./api/routes/employee');

/**
 * Middlewares that'll accept json and url encoded data
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/**
 * Middlewares to handle incoming routes
 */
app.use('/employee', employee);

module.exports = app;