import { Rossko } from "./rossko";
import { Bot } from "../bot/bot";
const notificationRossko = new Rossko(new Date().toLocaleDateString("ru-RU"));

export class Notifications {
  get text(): string {
    return this._text;
  }
  private _text: string ;

  constructor() {
    this._text = "";
  }

  async handler() {
    if(notificationRossko.result){
      await notificationRossko.handler().then(()=>this._text =`Довставка Росско на сумму: ${notificationRossko.result}`)
    }
  }
}
