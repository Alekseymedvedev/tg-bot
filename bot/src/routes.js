const Router = require('express')
const recordController = require('./controllers')
const router = new Router()


router.post('/record',recordController.createRecord)
router.get('/record',recordController.getAllRecord)
router.get('/record/:id',recordController.getOneRecord)
router.patch('/record/:id',recordController.updateRecord)
router.delete('/record/:id',recordController.deleteRecord)


module.exports = router