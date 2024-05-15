import { Rossko } from "./rossko";
import { Bot } from "../bot/bot";
const CalendarModel = require("../model/calendar");
import {DateFormatter} from "../services/dateFormatter";
const notificationRossko = new Rossko(new Date().toLocaleDateString("ru-RU"));
const date = new DateFormatter()
export class Notifications {
  get text(): string {
    return this._text;
  }
  private _text: string ;

  constructor() {
    this._text = "";
  }

  async handler() {
    const calendar = await CalendarModel.findAll({where:{date:date.tomorrow()}})
    if(calendar){
      this._text +=`Запись `
      for (let item of calendar) {
        this._text +=`\n${item.car} в ${item.time} ${item.text}`
      }
    }
    if(+notificationRossko.result > 0){
      await notificationRossko.handler().then(()=>this._text +=`Довставка Росско на сумму: ${notificationRossko.result}р`)
    }
  }
}
