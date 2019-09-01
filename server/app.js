require('dotenv').config();

let express = require('express');  //points to package.json 
let app = express();
let logs = require('./controllers/logcontroller');
let user = require('./controllers/usercontroller');
// let test = require('./controllers/testcontroller'); //allows the testcontrol.js to be linked within our app.js 
let sequelize = require('./db');
// let bodyParser = require('body-parser');


sequelize.sync();
app.use(express.json());
// app.use(bodyParser.json());
app.use(require('./middleware/headers'));

app.listen(3002, function(){
    console.log('App is on 3002');
})

app.use('/logs', logs)
app.use('/auth', user);

// app.use('/test', test)

// app.use('/api/test', function(req, res) {
//     res.send("This is data from the /api/test endpoint.  It's from the server!")
// });

// app.listen(process.env.PORT, () => console.log(`app is on ${process.env.PORT}`));
//////////////////////////////////////////////////////////////
//! app.listen is pointing to both the port and activating a function to be started.  In this case, a console.log string is noted. 

//! app.use (/test) notes an endpoint.  When this endpoint is called, it directs it to the variable "test" which then directs it to testcontroller.js 

//! app.use (api/test) aims at a particular endpoint [('/api/test'...)] and notes a function (sending a response) when that endpoint is called. 

//! BODY-PARSER:  this app.use MUST go above any routes.  It won't allow the bodyparser library to be activated and thus will break.    * body-parser extract the entire body portion of an incoming reqest stream and exposes it on req.body. 

//! middleware functions should always come before the routes are declared. 