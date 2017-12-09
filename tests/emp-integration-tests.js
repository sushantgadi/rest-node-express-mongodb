var should = require('should'),
    request = require('supertest'),
    app = ('../app.js'),
    mongoose = require('mongoose'),
    Emp = mongoose.model('Emp'),
    agent = request.agent(app);


describe('Emp test for CRUD operation', function () {
    it('Should allow to create an employee using POST operation and return an _id', function () {

        var empData = {
            "emp_name": "John Taylor",
            "department": "Vice President",
            "salary": "7500000"
        };

        agent.post('/api/emp/employees')
            .send(empData)
            .expect(201)
            .end(function(err,res){
            result.body.should.have.property('_id');
            });
    })

    afterEach(function(done){
        Emp.remove().exec();
        done();
    })
});




