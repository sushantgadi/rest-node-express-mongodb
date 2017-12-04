var emp_controller = function (Emp) {

    var post = function (req, res) {

        console.log("/employees post API request body:")
        console.log(req.body);

        //create new instance of Employee model using request body 
        var emp = new Emp(req.body);

        emp.save();

        console.log("--------------------------------------------------")
        console.log("/employees post API response body:")
        console.log(emp);

        res.status(201).send(emp);

    };

    var get = function (req, res) {

        //query parameters in the api
        var query = {};

        console.log('/employees get API Request query:');
        console.log(req.query);

        //check if the emp_name filter is present in the request parameters
        if (req.query.emp_name) {
            query.emp_name = req.query.emp_name;
        }

        Emp.find(query, function (err, employess) {
            if (err)
                res.status(500).send(err);
            else
                res.json(employess);
        });
    };

    return {
        post: post,
        get: get
    }

}

module.exports = emp_controller;