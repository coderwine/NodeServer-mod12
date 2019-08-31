module.exports = function (sequelize, DataTypes) {
    return sequelize.define('test', {
        testdata: DataTypes.STRING
    });
};

/////////////////////////////////////////////////
//! the define method [xx.define()] is a Sequelize method that will map model properties in the server file to a table in Postgres. 
