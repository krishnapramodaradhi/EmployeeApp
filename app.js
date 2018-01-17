/**
 * All the required imports goes here
 */
const express           = require('express');
const app               = express();
const bodyParser        = require('body-parser');

/**
 * Middleware to support both json and form-url-encoded data
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res) => {
    res.send('Hello world!');
})

module.exports = app;