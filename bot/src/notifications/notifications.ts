import { Rossko } from "./rossko";
import { Bot } from "../bot/bot";
const bot = new Bot();
const notificationRossko = new Rossko(new Date().toLocaleDateString("ru-RU"));

export class Notifications {
  text: string;

  constructor() {
    this.text = "";
  }

  handler() {
    //  notificationRossko.handler().then(()=>console.log(notificationRossko.result))
    const quickSort: any = (arr:  number[]) => {
      if (arr.length <= 1) {
        return arr;
      }

      const pivot = arr[0];
      let less = [];
      let greater = [];
      for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
          less.push(arr[i]);
        } else {
          greater.push(arr[i]);
        }
      }
      return [...quickSort(less), pivot, ...quickSort(greater)];
    };
    console.log(quickSort([3,2,1,1, 2, 5, 6, 7, 8, 3, 4, 9, 10]));
    //   setTimeout(()=>{
    //      console.log(222);
    //   },100)
  }
}
