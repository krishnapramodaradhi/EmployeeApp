/**
 * Mongoose and jsonwebtoken import
 */
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

/**
 * Employee model for CRUD operations
 */
const Employee = require('../models/employeeModel');
const Designation = require('../models/designation_refModel');
const Role = require('../models/role_refModel');

/**
 * This controller returns the success or error messages based on the request
 */
const resultController = require('../controllers/resultController');

/**
 * A utility for logging the results
 */
const logger = require('../utils/logger');
const validations = require('../utils/errorCodes');
const config = require('../config/config');

/**
 * Exporting the module so that it can be used in other modules
 */
module.exports = {
    registerEmployee: (req, res) => {
        let employee = new Employee();
        employee._id = new mongoose.Types.ObjectId();
            employee.employee_id = req.body.employee_id;
            employee.employee_name = req.body.employee_name;
            employee.password = req.body.password;
            employee.designation = req.body.designation;
            employee.serviceLine = req.body.serviceLine;
            employee.role = req.body.role;
        employee.save()
            .then(result => {
                resultController.success(res, 201, validations.success.EASREG);
            }).catch(err => {
                err.code === 11000 ? resultController.error(res, validations.errors.EAIDUNIQUE)
                    : err.errors.employee_id ? resultController.error(res, err.errors.employee_id.message)
                        : err.errors.password ? resultController.error(res, err.errors.password.message)
                            : resultController.error(res, validations.errors.EAREG);
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
                    resultController.error(res, validations.errors.EAAUTH);
                } else {
                    !req.body.password ? resultController.error(res, validations.required.EAPASS)
                        : validPassword = employee.comparePassword(req.body.password);
                    if (!validPassword) {
                        resultController.error(res, validations.errors.EAINVALIDPASS);
                    } else {
                        let token = jwt.sign({ employee_id: employee.employee_id, employee_name: employee.employee_name }, config.secret, { expiresIn: '24h' });
                        res.status(200).json({
                            success: true,
                            message: validations.success.EASAUTH,
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
                logger.info(config.tilda + 'Token decoded' + config.tilda);
                req.decoded = decoded;
            }
        })
    },
    referenceDesignations: (req, res) => {
        Designation.find().exec()
            .then(result => {
                res.set('Cache-Control', 'public, max-age=86400');
                resultController.success(res, 200, result);
            })
            .catch(err => {
                resultController.error(res, err);
            });
    },
    referenceRoles: (req, res) => {
        Role.find().exec()
            .then(result => {
                res.set('Cache-Control', 'public, max-age=86400');
                resultController.success(res, 200, result);
            })
            .catch(err => {
                resultController.error(res, err);
            });
    },
    profile: (req, res) => {
        resultController.success(res, 200, req.decoded);
    }
}