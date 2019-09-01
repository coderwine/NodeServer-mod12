module.exports = (sequelize, DataTypes)  => {
    const Log = sequelize.define('logs', {
        description: DataTypes.STRING,
        definition: DataTypes.STRING,
        results: DataTypes.STRING,
        owner: DataTypes.INTEGER
    });
    return Log;
};