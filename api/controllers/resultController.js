/**
 * A utility for logging the results
 */
const logger = require('../utils/logger');
const config = require('../config/config');

/**
 * Exporting the module so that it can be used in other modules
 */
module.exports = {
    error: (res, message) => {
        logger.error(config.tilda + ' ' + message + ' ' + config.tilda);
        res.status(500).json({
            success: false,
            message: message
        });
    },
    success: (res, status, message) => {
        logger.info(config.tilda + ' ' + message + ' ' + config.tilda);
        res.status(status).json({
            success: true,
            message: message
        });
    }
}