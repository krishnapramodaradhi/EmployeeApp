/**
 * All the frameworks and node packages goes here
 */
const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');

/**
 * Middlewares that'll accept json and url encoded data
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

module.exports = app;