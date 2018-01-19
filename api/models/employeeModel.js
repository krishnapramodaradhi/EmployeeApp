/**
 * Mongoose import goes here
 */
const mongoose          = require('mongoose');
const Schema            = mongoose.Schema;

/**
 * Creating a new Schema
 */
const employeeSchema    = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: {
        type: String,
        required: true,
        unique: true
    },
    employee_name: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    serviceLine: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', employeeSchema);