const CalendarModel = require("./model/calendar");
const {Bot} = require("./bot/bot");
const bot = new Bot()
class RecordController {
    async createRecord(req, res) {
        try{
            res.set('Access-Control-Allow-Origin', '*')
            CalendarModel.create(req.body)
            res.status(200).send(req.body)
            if(res.status(200)){
                bot.notification('Добалена новая запись')
            }
        }catch (e){
            console.log(e)
        }
    }

    async getAllRecord(req, res) {
     try{
         res.set('Access-Control-Allow-Origin', '*')
         const calendar = await CalendarModel.findAll()
         return res.send(JSON.stringify(calendar))
     }catch (e){
         console.log(e)
     }
    }

    async getOneRecord(req, res) {
        const id = req.params.id
        await CalendarModel.findOne({where: {id}})
    }

    async updateRecord(req, res) {
        const id = req.params.id
        try{
            await CalendarModel.update(req.body,{
                where: {
                    id
                }
            })
            res.status(200).send(req.body)
        }catch (e){
            console.log(e)
        }
    }

    async deleteRecord(req, res) {
        const id = req.params.id
        try{
            await CalendarModel.destroy({
                where: {
                    id
                }
            })
            res.status(200).send(req.body)
        }catch (e){
            console.log(e)
        }

    }
}

module.exports = new RecordController()