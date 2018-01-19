/**
 * Importing Http module from core NodeJs
 */
const http        = require('http');

/**
 * Application to be deployed
 */
const app         = require('./app');

/**
 * PORT on which the application has to listen
 */
const port        = process.env.PORT || 8000;

/**
 * Creating a server
 */
const server      = http.createServer(app);

/**
 * Listener for the application
 */
server.listen(port);