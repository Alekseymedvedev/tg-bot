const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'tg_bot',
    'postgres',
    'x29021956X',
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
)