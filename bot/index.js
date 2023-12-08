require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const sequelize = require('./db')
const rosskoApi = require('./api');
const express = require('express')
const cors = require('cors')
const recordRouter = require("./routes");

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

const start = async () => {
    //Подключение к БД
    try {
        await sequelize.authenticate()
        await sequelize.sync()
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
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        try {
            if (text === '/start') {
                rosskoApi(chatId,bot)
                // bot.sendMessage(chatId, 'запись',{
                //     reply_markup:{
                //         inline_keyboard:[
                //             [{text:'text', web_app:{url:'https://tg-bot-f97v-git-main-alekseymedvedev.vercel.app/'}}]
                //         ]
                //     }
                // })
            }
            // return bot.sendMessage(chatId, '');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибка! ' + e);
        }

    })
}

start()
