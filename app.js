var express = require('express'),
    mongoose = require('mongoose'),
    body_parser = require('body-parser');

//new instance of express server
var app = express();

//application port, will pick up port in the process.evt else will be 3000 by default
var port = process.env.port || 3000;

//databse connection with mongoDB(Will create the database if it does not exist)
var db;

if (process.env.ENV === 'Test')
    db = mongoose.connect('mongodb://localhost/emp-api-test');

else
    db = mongoose.connect('mongodb://localhost/emp-api');

//Employee model import
var Emp = require('./models/emp-model')

// parse application/json
app.use(body_parser.json());

// parse application/x-www-form-urlencoded
app.use(body_parser.urlencoded({ extended: false }));

//emp router
var empRouter = require('./routes/emp-routes')(Emp, app);

//emp API's default url
app.use('/api/emp', empRouter);

app.get('/', function (req, res) {
    res.send('My APIs are running on PORT:' + port);
});

//default log when the gulp starts
app.listen(port, function () {
    console.log('Gulp is running the app on PORT:' + port);
});