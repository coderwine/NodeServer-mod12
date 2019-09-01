module.exports = function (req,res,next){
    res.header('access-control-allow-origin', '*');
    res.header('access-control-allow-methods', 'GET, POST, PUT, DELETE');
    res.header('access.control-allow-headers', 'Origin, X-requested-With, Content-Type, Accept, Authorization');

    next();
};

//////////////////////////////////////////////////
//!  REMEMBER:  module.exports allow this module to be used within another file. 
//!  calling on headers ("res.headers") allows the server to respond with the request.  Using specific headers (access-control-allow-origin, etc) tells the server the specific origin location that are allowed to communicate with the server.  ("*" is considered as a "wild-card".  It meas that everything is allowed.)

//?  next() is a command that is required.  It calls for the request to move to it's next destination.  This could be the API endpoint or another middleware function for something else.  