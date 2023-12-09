const CalendarModel = require("./model");

class RecordController {
    async createRecord(req, res) {
        try{
            res.set('Access-Control-Allow-Origin', '*')
            CalendarModel.create(req.body)
            res.status(200).send(req.body)
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
        await CalendarModel.update(req.body,{
            where: {
                id
            }
        })
    }

    async deleteRecord(req, res) {
        const id = req.params.id
        await CalendarModel.destroy({
            where: {
                id
            }
        })
    }
}

module.exports = new RecordController()