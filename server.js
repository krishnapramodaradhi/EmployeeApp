/**
 * NodeJs HTTP import
 */
const http          = require('http');

/**
 * App that needs to be deployed into the server
 */
const app           = require('./app');

/**
 * Initializing a port either from environment variables or default port 8000
 */
const port          = process.env.PORT || 8000

/**
 * Creating an http server
 */
const server        = http.createServer(app);

/**
 * listening on port 8000
 */
server.listen(port);