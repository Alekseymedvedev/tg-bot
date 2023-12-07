const TelegramBot = require('node-telegram-bot-api');
const token = '6725091421:AAEpj1sNiGPhTyzEV3Gg5S65bKb6KXynDmc';
const bot = new TelegramBot(token, {polling: true});
const sequelize = require('./db')
const CalendarModel = require('./model')
const rosskoApi = require('./api');


const start = async () => {
    //Подключение к БД
    // try {
    //     await sequelize.authenticate()
    //     await sequelize.sync()
    // } catch (e) {
    //     console.log('Подключение к бд сломалось', e)
    // }

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === '/start') {
                // await CalendarModel.create({chatId})
                rosskoApi(chatId,bot)
                bot.sendMessage(chatId, 'запись',{
                    reply_markup:{
                        inline_keyboard:[
                            [{text:'text', web_app:{url:'https://tg-bot-f97v-git-main-alekseymedvedev.vercel.app/'}}]
                        ]
                    }
                })
            }
            // return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!)');
        } catch (e) {
            return bot.sendMessage(chatId, 'Произошла какая то ошибка!)');
        }

    })
}

start()
