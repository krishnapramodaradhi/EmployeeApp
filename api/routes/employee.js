/**
 * Express framework goes here
 */
const express               = require('express');
const router                = express.Router();
const mongoose              = require('mongoose');

/**
 * Model imports goes here
 */
const Employee              = require('../models/employeeModel');

/**
 * Controllers goes here
 */
const employeeController  = require('../controllers/employeeController');
const resultController     = require('../controllers/resultController');

 /**
  * Utilities goes here
  */
  const logger              = require('../utils/logger');
  const constants          = require('../utils/errorCodes');

/**
 * @argument req
 * @argument res
 * Registers a new employee into the database
 * @returns a success or error message based on the request
 */
router.post('/register', (req, res) => {
    logger.info(process.env.TILDA+ 'Inside /register '+process.env.POST+' method'+process.env.TILDA);
        !req.body.employee_id && !req.body.employee_name && !req.body.password && !req.body.designation &&!req.body.serviceLine && !req.body.role ? resultController.error(res, 'Not all fields were          provided')
        :!req.body.employee_id ? resultController.error(res, constants.R0001)
        :!req.body.employee_name ? resultController.error(res, 'No Employee name was provided')
        :!req.body.password ? resultController.error(res, 'No password was provided')
        :!req.body.designation ? resultController.error(res, 'No designation was provided')
        :!req.body.serviceLine ? resultController.error(res, 'No service line was provided')
        :!req.body.role ? resultController.error(res, 'No role was provided')
        : employeeController.registerEmployee(req, res);
});

/**
 * @argument req
 * @argument res
 * This method is used to login the employees
 * @returns a success or error message and the login information of the employee.
 */
router.post('/login', (req, res) => {
    logger.info(process.env.TILDA+ 'Inside /login '+process.env.POST+' method'+process.env.TILDA);
    !req.body.employee_id ? resultController.error(res, 'No EmployeeID Provided')
    :!req.body.password ? resultController.error(res, 'No Password provided')
    :employeeController.loginEmployee(req, res);
});

/**
 * @argument req
 * @argument res
 * @argument next
 * Middleware to decoded the generated token
 * All the routes below this middleware require authentication
 * All the routes above this middleware do not require auth
 */
router.use((req, res, next) => {
    logger.info(process.env.TILDA+ 'Inside Token verification middleware' +process.env.TILDA);
    const token = req.headers.authorization;
    !token ? resultController.error(res, 'No token provided')
    :employeeController.verifyToken(req, res, token);
    next();
})

/**
 * @argument req
 * @argument res
 * @returns all the employees and their information from the database
 */
router.get('/getAllEmployees', employeeController.getAllEmployees);

module.exports = router;