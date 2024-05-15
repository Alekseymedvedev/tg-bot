import config from "../config/config";
import {Notifications} from "../notifications/notifications";

const ChatModel = require("../model/chatModel")
const TelegramBot = require('node-telegram-bot-api');
const token = config.token;
const bot = new TelegramBot(token, {polling: true});
const allNotifications = new Notifications()

export class Bot {
    private chatId?: string | number
    private userChatId?: string | number

    constructor() {
        this.chatId = ''
        this.userChatId = ''
        this.start()
        this.notification()
    }

    start() {
        bot.on('message', async (msg: any) => {
            const text = msg.text;
            this.chatId = msg.chat.id;

            try {
                if (text === '/start'){
                    return await bot.sendMessage(this.chatId, 'Бот запущен')
                }
                if (text === '/adduser') {
                    const chat = await ChatModel.findOne({where: {chatId: msg.chat.id.toString()}})
                    this.userChatId = chat?.dataValues?.chatId
                    if (!this.userChatId) {
                        await ChatModel.create({
                            chatId: this.chatId,
                            firstName: msg.chat.first_name,
                            username: msg.chat.username,
                        })
                        return bot.sendMessage(this.chatId, 'Аккаунт добавлен в список уведомлений')
                    } else {
                        return bot.sendMessage(this.chatId, 'Аккаунт уже был добавлен в список уведомлений')
                    }
                }
                return bot.sendMessage(this.chatId, 'Не известная команда');
            } catch (e) {
                return bot.sendMessage(this.chatId, 'Произошла ошибка! ' + e);
            }
        })
        bot.on('polling_error', (error: any) => {
            console.error('Polling error:', error);
        });
    }

    async message(message: string) {
        const res = await ChatModel.findAll()
        for (let value of res) {
            await bot.sendMessage(value.chatId, `${message}`)
        }
    }

    notification() {
        setInterval(async () => {
            const date = new Date();
            const time = date.getHours();
            if (time == 18) {
                allNotifications.handler()
                    .then(async () => {
                        if (allNotifications.text){
                            const res = await ChatModel.findAll()
                            for (let value of res) {
                                await bot.sendMessage(value.chatId, `Завтра ${allNotifications.text}`)
                            }
                        }
                    })
            }
        }, 3600000)
    }


    voice() {

    }
}