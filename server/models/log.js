module.exports = function (sequelize, DataTypes) {
    return sequelize.define('logs', {
        description: DataTypes.STRING,
        definition: DataTypes.STRING,
        results: DataTypes.STRING,
        owner: DataTypes.INTEGER
    });
};