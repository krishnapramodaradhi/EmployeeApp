/**
 * Mongoose import goes here
 */
const mongoose = require('mongoose');

/**
 * Mongoose connection goes here
 */
mongoose.connect(`mongodb://localhost:27017/EmployeeApp`)
    .then(() => {
        logger.info('Connection established');
    })
    .catch(err => {
        logger.error('Error in connecting '+err);
    })

/**
 * Models goes here
 */
const Designation = require('./api/models/designation_refModel');
const Role = require('./api/models/role_refModel');

/**
 * Utilities goes here
 */
const logger = require('./api/utils/logger');

const designations = [
    new Designation({
        _id: new mongoose.Types.ObjectId(),
        option: 'Assosiate Analyst/BTA'
    }),
    new Designation({
        _id: new mongoose.Types.ObjectId(),
        option: 'Consultant/Sr.Consultant'
    }),
    new Designation({
        _id: new mongoose.Types.ObjectId(),
        option: 'Manager/Sr.Manager'
    }),
    new Designation({
        _id: new mongoose.Types.ObjectId(),
        option: 'Specialist Senior/Master'
    })
];

var loop1 = 0;
for(let i = 0; i < designations.length; i++) {
    logger.info('Inside designations for loop');
    designations[i].save()
        .then(result => {
            loop1++;
            logger.info('Designations: '+loop1);
            if(loop1 === designations.length){
                exit();
            }
        })
        .catch(err => {
            if(err) throw err;
        });
}

const roles = [
    new Role({
        _id: new mongoose.Types.ObjectId(),
        role: 'Developer'
    }),
    new Role({
        _id: new mongoose.Types.ObjectId(),
        role: 'Tester'
    }),
    new Role({
        _id: new mongoose.Types.ObjectId(),
        role: 'Other'
    })
];

var loop2 = 0;
for (let i = 0; i < roles.length; i++) {
    logger.info('Inside roles for loop');
    roles[i].save()
        .then(result => {
            loop2++;
            logger.info('Roles: '+loop2);
            if(loop2 === roles.length) {
                exit();
            }
        });
}

exit = () => {
    mongoose.disconnect();
    logger.info('Disconnected');
}