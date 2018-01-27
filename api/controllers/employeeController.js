/**
 * Mongoose and jsonwebtoken import
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/**
 * Employee model for CRUD operations
 */
const Employee = require('../models/employeeModel');

/**
 * This controller returns the success or error messages based on the request
 */
const resultController = require('../controllers/resultController');

/**
 * A utilility for logging the results
 */
const logger = require('../utils/logger');

/**
 * Exporting the module so that it can be used in other modules
 */
module.exports = {
    registerEmployee: (req, res) => {
        let employee = new Employee();
        employee._id = new mongoose.Types.ObjectId(),
            employee.employee_id = req.body.employee_id,
            employee.employee_name = req.body.employee_name,
            employee.password = req.body.password,
            employee.designation = req.body.designation,
            employee.serviceLine = req.body.serviceLine,
            employee.role = req.body.role
        employee.save()
            .then(result => {
                resultController.success(res, 201, 'Employee created successfully');
            }).catch(err => {
                err.code === 11000 ? resultController.error(res, 'EmployeeID already exists in the database')
                    : err.errors.employee_id ? resultController.error(res, err.errors.employee_id.message)
                        : err.errors.password ? resultController.error(res, err.errors.password.message)
                            : resultController.error(res, 'Could not save user');
            });
    },
    getAllEmployees: (req, res) => {
        Employee.find()
            .select('employee_id employee_name designation serviceLine role')
            .exec()
            .then(result => {
                resultController.success(res, 200, result);
            })
            .catch(err => {
                resultController.error(res, err);
            })
    },
    loginEmployee: (req, res) => {
        Employee.findOne({ employee_id: req.body.employee_id })
            .select('employee_id password employee_name')
            .exec()
            .then(employee => {
                let validPassword;
                if (!employee) {
                    resultController.error(res, 'Could not authenticate user');
                } else if (employee) {
                    !req.body.password ? resultController.error(res, 'No password provided')
                        : validPassword = employee.comparePassword(req.body.password);
                    if (!validPassword) {
                        resultController.error(res, 'Invalid Password');
                    } else {
                        let token = jwt.sign({ employee_id: employee.employee_id, employee_name: employee.employee_name }, process.env.SECRET, { expiresIn: '24h' });
                        res.status(200).json({
                            success: true,
                            message: 'Employee Authenticated!',
                            token: token
                        });
                    }
                }
            })
            .catch(err => {
                resultController.error(res, err);
            });
    },
    verifyToken: (req, res, token) => {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                resultController.error(res, 'Invalid token: ' + err);
            } else {
                logger.info(process.env.TILDA + 'Token decoded' + process.env.TILDA);
                req.decoded = decoded;
            }
        })
    }
}