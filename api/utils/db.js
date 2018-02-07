const mongoose = require('mongoose');

/**
 * Utilities goes here
 */
const logger = require('../utils/logger');
const config = require('../config/config');

mongoose.connect(config.locuri).then(() => {
    logger.info('Local Connection successful');
})
.catch(err => {
    logger.error('Error in connecting to MongoDB '+err);
});

/**
 * A global promise to prevent the deprication warning of mongoose's default promise library
 */
mongoose.Promise = global.Promise;