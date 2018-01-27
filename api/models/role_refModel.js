/**
 * Mongoose and bcrypt import goes here
 */
const mongoose          = require('mongoose');

/**
 * Creating a new Schema
 */
const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    role: {
        type: String,
        required: true
    }
});

/**
 * Exporting this model so that it can be used in other modules
 */
module.exports = mongoose.model('Role', roleSchema);