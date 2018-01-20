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

/**
 * @argument req
 * @argument res
 * Registers a new employee into the database
 * @returns a success or error message based on the request
 */
router.post('/register', (req, res) => {
    logger.info(process.env.TILDA+ 'Inside /register '+process.env.POST+' method'+process.env.TILDA);
        !req.body.employee_id && !req.body.employee_name && !req.body.password && !req.body.designation &&!req.body.serviceLine && !req.body.role ? resultController.error(res, 'Not all fields were          provided')
        :!req.body.employee_id ? resultController.error(res, 'No EmployeeID was provided')
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
    logger.info(process.env.TILDA+ 'Inside /register '+process.env.POST+' method'+process.env.TILDA);
    const employee = {
        id: 4802402,
        password: '*********'
    }
    res.status(200).json(employee);
});

/**
 * @argument req
 * @argument res
 * @returns all the employees and their information from in the database
 */
router.get('/getAllEmployees', employeeController.getAllEmployees);

module.exports = router;