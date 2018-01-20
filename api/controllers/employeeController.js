/**
 * Mongoose import
 */
const mongoose          = require('mongoose');

/**
 * Employee model for CRUD operations
 */
const Employee          = require('../models/employeeModel');

/**
 * This controller returns the success or error messages based on the request
 */
const resultController   = require('../controllers/resultController');

/**
 * A utilility for logging the results
 */
const logger            = require('../utils/logger');

/**
 * Exporting the module so that it can be used in other modules
 */
module.exports = {
    registerEmployee: (req, res) => {
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
            resultController.success(res, 201, 'Employee created successfully');
        }).catch(err => {
            err.code === 11000 ? resultController.error(res, 'EmployeeID already exists in the database')
            :resultController.error(res, 'Could not save user');
        });
    }
}