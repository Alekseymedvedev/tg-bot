
const dotenv = require('dotenv')
dotenv.config()
export const config={
    port: process.env.PORT,
    token: process.env.TOKEN,
    rosskoUrl: process.env.ROSSKO_URL,
    rosskoKey1: process.env.ROSSKO_KEY1,
    rosskoKey2: process.env.ROSSKO_KEY2,
}