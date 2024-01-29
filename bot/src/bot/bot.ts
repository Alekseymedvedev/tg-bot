
import {config} from "../config/config";

const ChatModel = require("../model/chatModel")
const TelegramBot = require('node-telegram-bot-api');
const token = config.token;
const bot = new TelegramBot(token, {polling: true});


export class Bot {
    private chatId?: string | number
    private userChatId?: string | number

    constructor() {
        this.chatId = ''
        this.userChatId = ''
    }

    start() {
        bot.on('message', async (msg: any) => {
            const text = msg.text;
            this.chatId = msg.chat.id;
            await bot.sendMessage(this.chatId, 'Бот запущен')
            try {
                if (text === '/start') {
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

   async message(message:string) {
        const res = await ChatModel.findAll()

        for (let value of res) {
            await bot.sendMessage(value.chatId, `Завтра ожидается ${message}`)
            
        }
    }

    // notification() {
    //     allNotifications.handler()
    //         .then(async () => {
    //             const res = await ChatModel.findAll()
    //
    //             for (let value of res) {
    //                await bot.sendMessage(value.chatId, 'Завтра ')
    //                 console.log(value.dataValues?.chatId)
    //             }
    //         })
    // }


    voice() {

    }
}