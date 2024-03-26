const express = require ('express')

const route = express.Router()

const activityController = require ('../controllers/activity.controller');
const passport = require ("passport")
const checkRole = require ("../middleware/role.middleware");
const activityOwnership = require('../middleware/activityOwnership');


route.post('/createActivity' , 
passport.authenticate('jwt', { session: false }) ,  
checkRole(['partner']), 
activityController.createActivity)


route.get('/listActivity' , activityController.getActivities)
route.get('/listActivity/:id' , activityController.getActivityById)

route.get('/me' , 
passport.authenticate('jwt', { session: false }) ,  
checkRole(['partner']), 
activityController.getMyActivities)



route.put('/updateActivity/:id' , 
passport.authenticate('jwt', { session: false }) ,  
checkRole(['partner']), 
activityOwnership,
activityController.updateActivity)


route.put('/cancelActivity/:id' , 
passport.authenticate('jwt', { session: false }) ,  
checkRole(['partner']),
activityController.cancelActivity)

route.put('/removeActivity/:id' , 
passport.authenticate('jwt', { session: false }) ,  
checkRole(['admin']),
activityController.removeActivity)



module.exports = route