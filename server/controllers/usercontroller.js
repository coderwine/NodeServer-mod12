let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');


                                //? CREATE USER

router.post('/createuser', function (req, res) {

    let username = req.body.user.username;
    let pass = req.body.user.password;

    User.create({
        username: username,
        password: bcrypt.hashSync(pass,10)
    }).then(
        function message(user){

            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                user: user,
                message: 'Changed because I can',
                sessionToken: token
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

                                //? LOGIN

router.post('/login', function(req,res){

    User.findOne( {where: {
        username: req.body.user.username 
    }}).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches){
                    if(matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "Authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "Unsuccessfully authenticated!"})
                    }
                });
            } else {
                res.status(500).send({error: 'WRONG!'});
            }
        },
        function (err) {
            res.status(501).send({ error: 'Does not compute!'});
        }
    );
});

module.exports = router;


///////////////////////////////////////////////
//! Ref: Sign-In:  bcrypt.compare(req.body.user.password, user.password... "req.body.user.password" points to the json login that is applied when the client is "logging in".  "user.password" points to the reference that is tied within the user.js file and looks at the value that is associated with it so that it can compare.  