var express = require('express');



var routes = function (Emp) {

    //for defining different routes
    var empRouter = express.Router();

    //emp controller
    var emp_controller = require('../controllers/emp-controller')(Emp);

    //post:API for creating new employee, get:API for all employees with filtering option
    empRouter.route('/employees')

        .post(emp_controller.post)

        .get(emp_controller.get)

    //middleware to search by Id
    empRouter.use('/employees/:emp_id', function (req, res, next) {
        console.log('in middleware request params:');
        console.log(req.params);

        Emp.findById(req.params.emp_id, function (err, employee) {
            if (err)
                res.status(500).send(err);
            else if (employee) {
                req.employee = employee;
                next();
            }
            else {
                res.status(404).send('no employee found');
            }
        });
    });

    //API to get employee by Id
    empRouter.route('/employees/:emp_id')
        .get(function (req, res) {
            console.log('/employees/:emp_id get API request params:');
            console.log(req.params);

            res.json(req.employee);

        })
        .put(function (req, res) {
            console.log('/employees/:emp_id put API request params:');
            console.log(req.params);

            req.employee.emp_name = req.body.emp_name;
            req.employee.department = req.body.department;
            req.employee.salary = req.body.salary;
            req.employee.is_active = req.body.is_active;
            req.employee.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.employee);
                }
            });
        })
        .patch(function (req, res) {
            console.log('/employees/:emp_id patch API request params:');
            console.log(req.params);

            //remove _id from the patch logic
            if (req.body._id)
                delete req.body._id;

            //genric patch logic for all the other keys except _id
            for (p in req.body) {
                req.employee[p] = req.body[p];
            }

            req.employee.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.employee);
                }
            });
        })
        .delete(function (req, res) {
            req.employee.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('Removed');
                }
            });
        });
    return empRouter;
};

module.exports = routes;