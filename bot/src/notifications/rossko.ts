import {Client} from "soap/lib/client";
import config from "../config/config";
import { DateFormatter } from "../services/dateFormatter";

const soap = require("soap");

const date = new DateFormatter();
export class Rossko {

    private _result: string | number
    public today: string

    constructor(currentDate: string) {
        this._result = 'пустая строка'
        this.today = currentDate
    }
  
   async  handler() {
        const connect = {
            wsdl: `${config.rosskoUrl}/GetOrders`,
        };
        const param = {
            KEY1: config.rosskoKey1,
            KEY2: config.rosskoKey2,
            start_date: `${date.formatStartDate()}`,
            end_date: `${date.formatDateToYYYYMMDD()}`,
        };
        const client = await soap.createClientAsync(connect.wsdl);
        const [result] = await client.GetOrdersAsync(param);
        let sum = 0;
       console.log(result?.OrdersResult?.OrdersList?.Order)
       console.log(date.tomorrow(),date.tomorrow() == result?.OrdersResult?.OrdersList?.delivery_date)
       // && date.tomorrow() == result?.OrdersResult?.OrdersList?.delivery_date
         if (result?.OrdersResult?.success){
            for (let res of result?.OrdersResult?.OrdersList?.Order) {
                if (res?.delivery_date == date.tomorrow()){
                    for (let product of res.parts.part) {
                        if (product.status < 8) {
                            sum += +product.price;
                        }
                    }
                }
            }
         }
        this._result = sum;

    }
    get result(): string | number {
        return this._result;
    }
}


// [
//     {
//         id: 90774764,
//         created_date: '06.01.2024 14:23:56',
//         delivery_date: '10.01.2024',
//         total_price: '7591.99',
//         extra: 0,
//         stock_address: 'Нижний Новгород, улица Коминтерна, 39литС1',
//         detail: {
//             delivery_type: 'Курьерская доставка',
//             delivery_cost: '0',
//             delivery_address: 'Нижний Новгород, улица Щербакова, 31 корп.3',
//             payment_type: 'Оплата наличными при получении товара'
//         },
//         parts: {
//     guid: 'NSIN0023096362',
//     partnumber: '30701 02',
//     name: 'Стойка стабилизатора | перед прав/лев |',
//     brand: 'Lemforder',
//     price: '803.32',
//     count: 2,
//     delivery: 0,
//     status: 2
// },
//     },
//     {
//         id: 90773814,
//         created_date: '06.01.2024 14:14:00',
//         delivery_date: '11.01.2024',
//         total_price: '0',
//         extra: 0,
//         stock_address: 'Нижний Новгород, улица Коминтерна, 39литС1',
//         detail: {
//             delivery_type: 'Курьерская доставка',
//             delivery_cost: '0',
//             delivery_address: 'Нижний Новгород, улица Щербакова, 31 корп.3',
//             payment_type: 'Оплата наличными при получении товара'
//         },
//         parts: { part: [Array] }
//     }
// ]