var mongoose = require('mongoose');

//employee model definition
var emp_model = mongoose.Schema({
    emp_name: {
        type: String
    },
    department: {
        type: String
    },
    salary: {
        type: Number
    },
    is_active: {
        type: Boolean, default: true
    }
});

//exporting the emp_model, so that it can be used
module.exports = mongoose.model('Emp', emp_model);