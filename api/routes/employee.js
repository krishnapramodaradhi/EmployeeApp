/**
 * Express framework goes here
 */
const express       = require('express');
const router        = express.Router();
const mongoose      = require('mongoose');

/**
 * Model imports goes here
 */
const Employee      = require('../models/employeeModel');

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
    logger.info(process.env.TILDA+ 'Inside /register '+process.env.POST+' method'+process.env.TILDA);
    const employee = new Employee({
        _id: new mongoose.Types.ObjectId(),
        employee_id: req.body.employee_id,
        employee_name: req.body.employee_name,
        password: req.body.password,
        designation: req.body.designation,
        serviceLine: req.body.serviceLine,
        role: req.body.role
    });
    employee.save()
        .then(result => {
            logger.info(process.env.TILDA+ 'Created Employee: '+ result +process.env.TILDA);
            res.status(201).json({
                success: true,
                message: 'Employee created successfully',
                createdEmployee: {
                    employee: employee,
                    request: {
                        type: process.env.GET,
                        description: 'GET_INDIVIDUAL_EMPLOYEE',
                        url: process.env.EMPLOYEE_DOMAIN+result.employee_id
                    }
                }
            })
        }).catch(err => {
            logger.info(process.env.TILDA+ 'Error: '+ err +process.env.TILDA);
            res.status(500).json({
                error: err
            });
        })
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
router.get('/getAllEmployees', (req, res) => {
    logger.info(process.env.TILDA+ 'Inside /getAllEmployees '+process.env.GET+' method'+process.env.TILDA);
    res.status(200).send('getAllEmployees route is working');
});

module.exports = router;