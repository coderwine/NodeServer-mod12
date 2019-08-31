let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let TestModel = sequelize.import('../models/test');

router.get('/', function(req,res) {
    res.send('This is my test route!')
});

router.get('/about', function (req,res) {
    res.send('test in a round-about way...')
});

router.get('/contact', function(req,res) {
    res.send({
        "user":"Bob",
        "email":"bobsemail@bob.com"
    })
});

router.get('/projects', function (req, res) {
    res.send(['Project 1','Project 2']);
});

router.get('/mycontacts', function (req, res) {
    res.send([{
        "user":"Bob",
        "email":"bobsemail@bob.com"
    },
    {
        "user":"Bob2",
        "email":"bobsemail@bob2.com"
    },
    {
        "user":"Bob3",
        "email":"bobsemail@bob3.com"
    }])
})

///////////////////////////////////////////////////////
//! POST
////////////////////////////////////////////////////////
router.post('/one', function(req, res){
    res.send('Test 1 is up and running!')
});

router.post('/two', function(req, res){
    let testData = 'updated db mapping';

    TestModel.create({
        testdata: testData
    }).then(
        dataFromDataBase => {
            res.send('2nd test thru!')
        })
});

router.post('/three', function(req, res){
    let testData = req.body.testdata.item;

    TestModel.create({
        testdata: testData
    })
    res.send('Test 3!')
    console.log('3 is Thru!')
});

router.post('/four', function(req, res){
    let testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    }).then(
        function message() {
            res.send('for forth four 4!');  //sending a response via STRING
        }
    );
});

router.post('/five', function(req, res){
    let testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(data) {
            res.send(data);
        }
    );
});

router.post('/six', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata){
            res.json({
                testdata: testdata
            });
        }
    );
});

router.post('/seven', function (req, res) {
    let testData = req.body.testdata.item;

    TestModel
    .create({
        testdata: testData
    })
    .then(
        function message(testdata){
            res.json({
                testdata:testdata
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});


module.exports = router; 

////////////////////////////////////////////////////////////
//! module.exports points to the router, which is firing off the express.Router() [a required function per the expression variable]. 

//! express.Router is used to create a modular, mountable route handlers.  This instance is a complete middleware and routing system.  Referred to as a "mini-app"


//? router.get is the method that is "getting" to an endpoint declared within the method [('/'...)] and applying said function.  How it gets this is by using the router variable that points back to express and calls upon that "mini-app" method per the required "express" notes [located within the package.json file].   This is noted as a callback function.  In order to activate that function, it needs to look back at what was declared previously.

//? within the function, I am sending out a response [res.send].  In this particular case, it is a string.