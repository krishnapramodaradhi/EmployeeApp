/**
 * Express framework goes here
 */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * Model imports goes here
 */
const Employee = require('../models/employeeModel');

/**
 * Controllers goes here
 */
const employeeController = require('../controllers/employeeController');
const resultController = require('../controllers/resultController');

/**
 * Utilities goes here
 */
const logger = require('../utils/logger');
const validations = require('../utils/errorCodes');
const config = require('../config/config');

/**
 * Registers a new employee into the database
 * @returns a success or error message based on the request
 */
router.post('/register', (req, res) => {
    logger.info(config.tilda + 'Inside /register ' + config.post + ' method' + config.tilda);
    !req.body.employee_id && !req.body.employee_name && !req.body.password && !req.body.designation && !req.body.serviceLine && !req.body.role ? resultController.error(res, validations.required.EAALL)
        : !req.body.employee_id ? resultController.error(res, validations.required.EAID)
            : !req.body.employee_name ? resultController.error(res, validations.required.EANAME)
                : !req.body.password ? resultController.error(res, validations.required.EAPASS)
                    : !req.body.designation ? resultController.error(res, validations.required.EADES)
                        : !req.body.serviceLine ? resultController.error(res, validations.required.EASL)
                            : !req.body.role ? resultController.error(res, validations.required.EAROLE)
                                : employeeController.registerEmployee(req, res);
});

/**
 * This method is used to login the employees
 * @returns a success or error message and the login information of the employee.
 */
router.post('/login', (req, res) => {
    logger.info(config.tilda + 'Inside /login ' + config.post + ' method' + config.tilda);
    !req.body.employee_id ? resultController.error(res, validations.required.EAID)
        : !req.body.password ? resultController.error(res, validations.required.EAPASS)
            : employeeController.loginEmployee(req, res);
});

/**
 * @returns all the employees and their information from the database
 */
router.get('/reference/designations', employeeController.referenceDesignations);

/**
 * @returns all the employees and their information from the database
 */
router.get('/reference/roles', employeeController.referenceRoles);

/**
 * Middleware to decoded the generated token
 * All the routes below this middleware require authentication
 * All the routes above this middleware do not require auth
 */
router.use((req, res, next) => {
    logger.info(config.tilda + 'Inside Token verification middleware' + config.tilda);
    const token = req.headers['x-access-token'];
    !token ? resultController.error(res, 'No token provided')
        : employeeController.verifyToken(req, res, token);
    next();
});

/**
 * This route helps the user to be loggedIn even after page refresh
 */
router.post('/me', employeeController.profile);

/**
 * @returns all the employees and their information from the database
 */
router.get('/getAllEmployees', employeeController.getAllEmployees);

module.exports = router;