/**
 * A utilility for logging the results
 */
const logger = require('../utils/logger');

/**
 * Exporting the module so that it can be used in other modules
 */
module.exports = {
    error: (res, message) => {
        logger.error(process.env.TILDA + ' ' + message + ' ' + process.env.TILDA);
        res.status(500).json({
            success: false,
            message: message
        });
    },
    success: (res, status, message) => {
        logger.info(process.env.TILDA + ' ' + message + ' ' + process.env.TILDA);
        res.status(status).json({
            success: true,
            message: message
        });
    }
}