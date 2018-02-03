module.exports = {
    required : {
        EAALL: 'Not all fields were provided',
        EAID: 'No Employee ID was provided',
        EANAME: 'No name was provided',
        EAPASS: 'No Password was provided',
        EADES: 'No Designation was provided',
        EASL: 'No Service Line was provided',
        EAROLE: 'No Role was provided'
    },
    errors: {
        EAIDUNIQUE: 'EmployeeID already exists in the database',
        EAREG : 'Could not save user',
        EAAUTH: 'Could not authenticate user',
        EAINVALIDPASS: 'Invalid Password'
    },
    success: {
        EASAUTH: 'Employee Authenticated!',
        EASREG: 'Employee created successfully'
    },
    DB: {
        EAIDLENGTH: 'Employee ID should be exactly 6 digits',
        EAVALIDID: 'Employee ID should contain only digits',
        EAPASSLENGTH: 'Password must be aleast 8 characters and not more than 15',
        EAVALIDPASS: 'Password must have at least one uppercase, lowercase, special character, and number'
    }
}