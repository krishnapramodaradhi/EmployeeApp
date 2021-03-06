/**
 * Mongoose and bcrypt import goes here
 */
const mongoose          = require('mongoose');

/**
 * Creating a new Schema
 */
const designationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    option: {
        type: String,
        required: true
    }
});

/**
 * Exporting this model so that it can be used in other modules
 */
module.exports = mongoose.model('Designation', designationSchema);