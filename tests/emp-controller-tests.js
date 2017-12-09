var should = require('should'),
    sinon = require('sinon');

describe('Emp Controller Tests:', function () {
    describe('Post', function () {
        it('should not allow an empty emp_name on post', function () {
            var Emp = function (emp) {
                this.save = function () {
                };
            };

            var req = {
                body: {
                    emp_name: 'test'
                }
            };

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var emp_controller = require('../controllers/emp-controller')(Emp);

            emp_controller.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);
            res.send.calledWith('Emp Name is required').should.equal(true);

        });
    });
});

