let express = require('express');
let router = express.Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user.js');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

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

router.post('/signin', function(req,res){

    User.findOne( {where: {
        username: req.body.user.username 
    }}).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches){
                    console.log("Your password was Correct!", matches);
                });
            } else {
                res.status(500).send({error: 'WRONG!'});
            }
        },
        function (err) {
            res.status(500).send({ error: 'Does not compute!'});
        }
    );
});

module.exports = router;