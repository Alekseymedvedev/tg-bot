require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');
const speech = require('@google-cloud/speech').v1p1beta1;
const token = process.env.TOKEN;
const bot = new TelegramBot(token, {polling: true});
const sequelize = require('./db')
const rosskoApi = require('./api');
const express = require('express')
const cors = require('cors')
const recordRouter = require("./routes");
const client = new speech.SpeechClient({
    projectId: 'skilful-firefly-407521',
    credentials: {
        client_email: 'alekseymedvedev152@gmail.com',
        private_key: 'AIzaSyArkmOwLXIIFWuwOp71SX3UTE2f3wrR4hA',
    },
});
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
}

start()
// Обработчик голосового сообщения
bot.on('voice', (msg) => {
    const chatId = msg.chat.id;
    const fileId = msg.voice.file_id;

    // Получите информацию о голосовом сообщении
    bot.getFile(fileId).then((fileData) => {
        const fileUrl = `https://api.telegram.org/file/bot${bot.token}/${fileData.file_path}`;

        // Вызовите Google Cloud Speech-to-Text API для распознавания речи
        const audio = {
            uri: fileUrl,
        };
        const config = {
            encoding: 'OGG_OPUS',
            sampleRateHertz: 48000,
            languageCode: 'ru-RU',
        };
        const request = {
            audio: audio,
            config: config,
        };
        console.log(request)
        client.recognize(request)
            .then((response) => {
                console.log(response)
                const transcription = response.results
                    .map((result) => result.alternatives[0].transcript)
                    .join('\n');
                bot.sendMessage(chatId, `Текст: ${transcription}`);
            })
            .catch((err) => {
                console.error('Error:', err);
                bot.sendMessage(chatId, 'Произошла ошибка при распознавании речи.'+ err);
            });
    });
});

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
bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
});
