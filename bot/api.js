const soap = require('soap');


const rosskoApi =  () => {
    const connect = {
        wsdl: 'http://api.rossko.ru/service/v2.1/GetOrders',
        options: {
            connection_timeout: 1,
            trace: true
        }
    };
    const param = {
        KEY1: '3267d72f6e9ea820e35bdf9e1a67618a',
        KEY2: '79497c9d64bd6306595edf2de8340add',
        start_date: `2023-11-28`,
        end_date: `2023-11-28`
    };

   soap.createClient(connect.wsdl, connect.options, (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        client.GetOrders(param, (err, result) => {
            if (err) {
                console.error(err);
                return;
            }
             if (result.OrdersResult.OrdersList.Order[0].delivery_date) {
                 return result.OrdersResult.OrdersList.Order
            }
        });
    });
}

module.exports = rosskoApi