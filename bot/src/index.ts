import {Notifications} from "./notifications/notifications";
import config from "./config/config";
import {Bot} from "./bot/bot";

const sequelize = require('./db')
const express = require('express')
const cors = require('cors')
const recordRouter = require("./routes");

const app = express();
const bot = new Bot()
const allNotifications = new Notifications()

app.use(express.json());
app.use(cors());
// bot.start()
// bot.notification()
// allNotifications.handler()


const start = async () => {
    //Подключение к БД
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Подключение к бд установлено')
    } catch (e) {
        console.log('Подключение к бд сломалось', e)
    }
    try {
        app.use('/api/bot', recordRouter)
        app.listen(config.port, () => console.log(`Сервер слушает порт ${config.port}`));
    } catch (error) {
        console.error('server' + error);
        process.exit(1);
    }
}

start()







