import {Client} from "soap/lib/client";

const soap = require("soap");



export class Rossko {
    public result: string
    public currentDate
    constructor(currentDate:any) {
        this.result = 'Пустая строка'
        this.currentDate = currentDate
        this.handler()
    }

    // if (err) {
    //     console.error(err);
    //     return;
    // }
    async handler() {

        const connect = {
            wsdl: '/GetOrders',
            options: {
                connection_timeout: 1,
                trace: true
            }
        };
        const param = {
            KEY1: '',
            KEY2: '',
            start_date: `2023-11-28`,
            end_date: `2023-11-28`
        };
       await soap.createClient(connect.wsdl, connect.options,  async (err='', client: Client) => {
            client.GetOrders(param, (err: string | undefined, result: any) => {
                this.result =  result.OrdersResult.OrdersList.Order[0].delivery_date
            });
        });
    }
}