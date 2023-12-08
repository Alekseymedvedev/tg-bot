const CalendarModel = require("./model");

class RecordController {
    async createRecord(req,res){
        res.set('Access-Control-Allow-Origin', '*')
        CalendarModel.create(req.body)
        res.status(200).send(req.body)
    }
    async getAllRecord(req,res){
        res.set('Access-Control-Allow-Origin', '*')

        const calendar = await CalendarModel.findAll()
        console.log(calendar)
        return res.send(JSON.stringify(calendar))
    }
    async getOneRecord(req,res){

    }
    async updateRecord(req,res){

    }
    async deleteRecord(req,res){

    }
}
module.exports= new RecordController()