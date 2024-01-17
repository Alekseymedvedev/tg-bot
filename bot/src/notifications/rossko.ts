import {Client} from "soap/lib/client";
import {config} from "../config/config";

const soap = require("soap");


export class Rossko {

    private _result: string | number
    public today: string

    constructor(currentDate: string) {
        this._result = 'Пустая строка'
        this.today = currentDate
    }

    // if (err) {
    //     console.error(err);
    //     return;
    // }
   async  handler() {

        const aaa = this.today.toString().split('.').reverse().join('-')
        const connect = {
            wsdl: `${config.rosskoUrl}/GetOrders`,
        };
        const param = {
            KEY1: `${config.rosskoKey1}`,
            KEY2: `${config.rosskoKey2}`,
            start_date: `2024-01-01`,
            end_date: `${aaa}`
        };
       await soap.createClient(connect.wsdl,  async (err: any, client: Client) => {
            this._result = 'dddd'

             client.GetOrders(param, (err: string | undefined, result: any) => {
                    // this.result = result.OrdersResult.OrdersList.Order[0].delivery_date
                    // console.log(result.OrdersResult.OrdersList.Order[0].parts.part)
                    let sum = 0
                    for (let res of result.OrdersResult.OrdersList.Order) {
                        for (let product of res.parts.part) {
                            if (product.status < 8) {
                                sum += +product.price
                            }
                        }
                    }
                return  this._result = sum
                });
            },
        );

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