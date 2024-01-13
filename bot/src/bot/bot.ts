import {Rossko} from "../notifications/rossko";
import {DataTypes} from "sequelize";

 const ChatModel = require("../model/chatModel")

const dotenv = require('dotenv')
dotenv.config()

const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});


// const { Model, SpkModel, KaldiRecognizer } = require('vosk');
// const model = new Model('path/to/vosk-model-small-en-us-0.15');
// const spkModel = new SpkModel('path/to/vosk-model-small-en-us-0.15');
// const recognizer = new KaldiRecognizer(model, spkModel, 16000.0);

export class Bot {
    private chatId?: string | number

    // public text?:string


    constructor() {
        this.chatId = ''
    }

    handle() {

        bot.on('message', async (msg: any) => {
            const text = msg.text;
            this.chatId = msg.chat.id;
            bot.sendMessage(this.chatId, 'start')
            try {
                if (text === '/start') {
                    const chat = await ChatModel.findOne({where: {chatId: msg.chat.id.toString()}})
                    const chatId = chat?.dataValues?.chatId
                    console.log(chat)
                    if(!chatId){

                        // ChatModel.create({
                        //     chatId: this.chatId,
                        //     firstName: msg.chat.first_name,
                        //     username: msg.chat.username,
                        // })
                        console.log('chatId',chatId)
                    }

                }
                // return bot.sendMessage(this.chatId, 'Не известная команда');
            } catch (e) {
                return bot.sendMessage(this.chatId, 'Произошла ошибка! ' + e);
            }
        })
        bot.on('polling_error', (error: any) => {
            console.error('Polling error:', error);
        });
    }

    notification(text: string) {
        // setInterval(()=>{
        //     if(notificationRossko.handle() != ''){
        //         bot.sendMessage(this.chatId, text)
        //     }
        // },1000)
        //  console.log('this.chatId',this.chatId)
        // return bot.sendMessage(this.chatId, this.text);
    }

    voice() {
        // Обрабатываем голосовые сообщения
        // bot.on('voice', async (msg) => {
        //     try {
        //         // Получаем информацию о файле аудио
        //         const voiceFile = await bot.getFile(msg.voice.file_id);
        //         const audioPath = `./${voiceFile.file_id}.ogg`;
        //
        //         // Скачиваем аудиофайл
        //         await bot.downloadFile(voiceFile.file_path, audioPath);
        //
        //         // Открываем аудиофайл для распознавания
        //         recognizer.acceptWaveform(audioPath);
        //
        //         // Получаем распознанный текст
        //         const result = recognizer.result();
        //
        //         // Отправляем распознанный текст в ответ
        //         bot.sendMessage(msg.chat.id, result);
        //     } catch (error) {
        //         console.error(error);
        //         bot.sendMessage(msg.chat.id, 'Произошла ошибка при распознавании речи');
        //     }
        // });

    }
}