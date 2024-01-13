import {Rossko} from "./rossko";
import {Bot} from "../bot/bot";
const currentDate = new Date().getSeconds()
const notificationRossko = new Rossko(currentDate)
const bot = new Bot()


export class Notifications {
    text: string

    constructor() {
        this.text = ''
    }

    async handler() {

        // setInterval(() => {
        //     notificationRossko.handler()
        //         .then(r => this.text = notificationRossko.result)
        //         .then(() => bot.handle('this.text'))
        // }, 10000)
    }
}