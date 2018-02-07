const crypto = require('crypto').randomBytes(256).toString('hex');

module.exports = {
    get: 'GET',
    post: 'POST',
    tilda: '~~~~~',
    locuri:'mongodb://localhost:27017/EmployeeApp',
    secret: crypto
}