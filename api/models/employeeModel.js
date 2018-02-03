/**
 * Mongoose and bcrypt import goes here
 */
const mongoose          = require('mongoose');
const bcrypt            = require('bcrypt-nodejs');

/**
 * Utilities goes here
 */
const validations = require('../utils/errorCodes');

/**
 * ID validators goes here
 */
//function to check the length of the id
let idLengthChecker = (id) => {
    if(!id) {
        return false;
    } else if(id.length != 6) {
        return false;
    } else {
        return true;
    }
}
//function to check whether the entered id are all digits or not
let validID = (id) => {
    if(!id) {
        return false;
    } else {
        return new RegExp('^[0-9]{6}$').test(id);
    }
}
//Pass this validator with the constraints to the employee_id field
const idValidator = [
    {
        validator: idLengthChecker,
        message: validations.DB.EAIDLENGTH
    },
    {
        validator: validID,
        message: validations.DB.EAVALIDID
    }
]

/**
 * Password Validators goes here
 */
//function to check the length of the password
let passwordLengthChecker = (password) => {
    if(!password) {
        return false;
    } else if(password.length < 8 || password.length > 15) {
        return false;
    } else {
        return true;
    }
}
//function to check whether the password is valid or not
let validPassword = (password) => {
    if(!password) {
        return false;
    } else {
        return new RegExp('(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$').test(password);
    }
}
//Pass this validator with the constraints to the password field
const passwordValidator = [
    {
        validator: passwordLengthChecker,
        message: validations.DB.EAPASSLENGTH
    },
    {
        validator: validPassword,
        message: validations.DB.EAVALIDPASS
    }
]
/**
 * Creating a new Schema
 */
const employeeSchema    = mongoose.Schema({
    //Mongoose unique ID for each record which will be auto-generated
    _id: mongoose.Schema.Types.ObjectId,
    employee_id: {
        type: String,
        required: true,
        unique: true,
        validate: idValidator
    },
    employee_name: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
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

//Encrypting the password before saving into the database
employeeSchema.pre('save', function(next) {
    if (!this.isModified('password'))
      return next();
  
    bcrypt.hash(this.password, null, null, (err, hash) => {
      if (err) return next(err);
      this.password = hash;
      next(); 
    });
  });

//function to verify whether the entered password matches with the one in database
employeeSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

/**
 * Exporting this model so that it can be used in other modules
 */
module.exports = mongoose.model('Employee', employeeSchema);