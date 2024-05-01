const express = require ('express');
const route = express.Router();
const multer = require('multer');
const activityController = require ('../controllers/activity.controller');
const passport = require ("passport");
const checkRole = require ("../middleware/role.middleware");
const activityOwnership = require('../middleware/activityOwnership');


route.post('/createActivity', activityController.createActivity);

route.get('/listActivity' , activityController.getActivities);
route.get('/listActivity/:id' , activityController.getActivityById);
route.get('/similar/:category', activityController.getSimilarActivities);

route.put('/updateActivity/:id' , 
  passport.authenticate('jwt', { session: false }),  
  checkRole(['member']), 
  activityOwnership,
  activityController.updateActivity
);


route.put('/cancelActivity/:id' , 
  passport.authenticate('jwt', { session: false }),  
  checkRole(['partner']),
  activityController.cancelActivity
);

route.put('/removeActivity/:id' , 
  passport.authenticate('jwt', { session: false }),  
  checkRole(['admin']),
  activityController.removeActivity
);

module.exports = route;
