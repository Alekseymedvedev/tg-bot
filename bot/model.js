const sequelize = require('./db')
const {DataTypes}=require('sequelize')

const Calendar = sequelize.define('calendar',{
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    // chatId: {type: DataTypes.STRING, unique: true},
    date: {type: DataTypes.INTEGER},
    time: {type: DataTypes.STRING},
    car: {type: DataTypes.STRING},
    text: {type: DataTypes.STRING},
})

module.exports = Calendar