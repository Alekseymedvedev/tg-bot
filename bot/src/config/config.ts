const dotenv = require('dotenv')
dotenv.config()

const config = {
    dataBase: process.env.DATA_BASE,
    dataBaseUser: process.env.DATA_BASE_USER,
    dataBasePassword: process.env.DATA_BASE_PASSWORD,
    port: process.env.PORT,
    token: process.env.TOKEN,
    rosskoUrl: process.env.ROSSKO_URL,
    rosskoKey1: process.env.ROSSKO_KEY1,
    rosskoKey2: process.env.ROSSKO_KEY2,
}
export default config