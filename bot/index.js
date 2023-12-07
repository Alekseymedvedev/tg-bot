require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const sequelize = require('./db')
const CalendarModel = require('./model')
const rosskoApi = require('./api');
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");

console.log()
const start = async () => {
    //Подключение к БД
    try {
        await sequelize.authenticate()
        await sequelize.sync()
    } catch (e) {
        console.log('Подключение к бд сломалось', e)
    }
    try {
        const app = express();
        const port = 5000;

       app.use(bodyParser.json());
        app.use(cors());
        app.post('/', (req, res) => {
            res.set('Access-Control-Allow-Origin', '*')
            console.log(req.body)
             CalendarModel.create(req.body)
            res.status(200).send('');
        });

        app.get('/', (req, res) => {
            res.set('Access-Control-Allow-Origin', '*')
            const calendar =  CalendarModel.findAll()
            console.log(JSON.stringify(calendar));
            return res.send(JSON.stringify(calendar))
        });
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                // await CalendarModel.create({chatId})
                rosskoApi(chatId,bot)
                // bot.sendMessage(chatId, 'запись',{
                //     reply_markup:{
                //         inline_keyboard:[
                //             [{text:'text', web_app:{url:'https://tg-bot-f97v-git-main-alekseymedvedev.vercel.app/'}}]
                //         ]
                //     }
                // })
            }
            // return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибка! ' + e);
        }

    })
}

start()
