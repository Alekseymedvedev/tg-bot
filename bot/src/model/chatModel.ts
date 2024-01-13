import {DataTypes} from "sequelize";
const sequelize = require('../db')

const Chat = sequelize.define('chats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, unique: true, autoIncrement: true},
    chatId: {type: DataTypes.STRING},
    firstName: {type: DataTypes.STRING},
    username: {type: DataTypes.STRING},
})
module.exports = Chat