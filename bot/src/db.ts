const {Sequelize} = require('sequelize')
import config from "./config/config";

module.exports = new Sequelize(
    config.dataBase,
    config.dataBaseUser,
    config.dataBasePassword,
    {
        host: 'localhost',
        dialect: 'postgres',
        port: 5432
    }
)