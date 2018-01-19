/**
 * Mongoose default package
 */
const mongoose          = require('mongoose');

/**
 * Utilities goes here
 */
const logger            = require('../utils/logger');

/**
 * mongoose connection string to connect to the cloud database (Mongo Atlas)
 * The object useMongoClient is set to true because of mongo clients native driver 
 */
mongoose.connect(`mongodb://`+process.env.DBUSER+`:`+process.env.DBPASS+`@cluster0-shard-00-00-kq8ud.mongodb.net:27017,cluster0-shard-00-01-kq8ud.mongodb.net:27017,cluster0-shard-00-02-kq8ud.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`);

/**
 * A global promise to prevent the deprication warning of mongoose's default promise library
 */
mongoose.Promise = global.Promise;