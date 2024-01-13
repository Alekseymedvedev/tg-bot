import {Bot} from "./bot/bot";
import {Notifications} from "./notifications/notifications";
const sequelize = require('./db')
const express = require('express')
const cors = require('cors')
const recordRouter = require("./routes");
const bot = new Bot()
const notifications = new Notifications()
bot.handle()
notifications.handler()

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());


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
        app.use('/api',recordRouter)
        app.listen(port, () => console.log(`Сервер слушает порт ${port}`));
    } catch (error) {
        console.error('server' + error);
        process.exit(1);
    }
}

start()







