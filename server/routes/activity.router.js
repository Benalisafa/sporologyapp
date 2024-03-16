const express = require ('express')

const route = express.Router()

const activityController = require ('../controllers/activity.controller');

route.post('/createActivity' , activityController.createActivity)
route.get('/listActivity/:id' , activityController.getActivityById)
route.put('/updateActivity/:id' , activityController.updateActivity)
route.delete('/deleteActivity/:id' , activityController.deleteActivity)

module.exports = route