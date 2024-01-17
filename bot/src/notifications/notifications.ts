import {Rossko} from "./rossko";
import {Bot} from "../bot/bot";

const bot = new Bot()
const notificationRossko = new Rossko(new Date().toLocaleDateString("ru-RU"))


export class Notifications {
    text: string
    currentDate: string

    constructor() {
        this.text = ''
        this.currentDate = new Date().toLocaleDateString("ru-RU")
        notificationRossko.handler()
    }

    handler() {


        notificationRossko.handler().then(()=>console.log(notificationRossko.result))

        setInterval(() => {
            //      .then(()=>bot.message(notificationRossko.result))
        }, 5000)
    }
}

