/**
 * Express framework goes here
 */
const express       = require('express');
const router        = express.Router();

/**
 * Model imports goes here
 */

 /**
  * Utilities goes here
  */
  const logger      = require('../utils/logger');

/**
 * @argument req
 * @argument res
 * Registers a new employee into the database
 * @returns a success or error message based on the request
 */
router.post('/register', (req, res) => {
    logger.info(process.env.TILDA+ 'Inside /register '+process.env.GET+' method'+process.env.TILDA);
    const employee = {
        id: 49029402,
        name: 'bla bla....',
        designation: 'SE',
        DOB: 'mm/dd/yyyy'
    }
    res.status(200).json(employee);
});

module.exports = router;