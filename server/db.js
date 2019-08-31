const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.NAME, 'postgres', process.env.PASS, {
    host: 'localhost',
    dialect: 'postgres'
})
// const sequelize = new Sequelize('Mod12', 'postgres', 'Onetwo34', {
//     host: 'localhost',
//     dialect: 'postgres'
// })

sequelize.authenticate()
    .then(() => console.log('db is authenticated'))
    .catch(err => console.log(err))


module.exports = sequelize;