const Activity = require('../models/activity.model')
const { validationResult } = require('express-validator');

exports.createActivity = ( req , res ) =>  {


    const activityData = {
        title : req.body.title,
        description: req.body.description,
        photos : req.body.photos,
        date : req.body.date,
        location : req.body.location,
        duration : req.body.duration,
        capacity : req.body.capacity,
        // category : req.body.category,
        owner : req.user._id,
        
    }


    const _activity = new Activity(activityData);

    _activity.save().then(
        (createdActivity) =>{
            res.status(200).json({ message : "Activity added successfully"})
        }
    ).catch(
        (err) => {
            console.error("Error saving activity:", err); // Log the error message
            res.status(400).json({ message: "Error adding activity: " + err.message }); // Send error message to client
        }
    )
    }
     

    exports.getActivities = async (req, res) => {

       

        try {
            const allActivities = await Activity.find({}); 
            res.status(200).json({ activities: allActivities });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error retrieving activities' });
          }

    }
     

    exports.getMyActivities = async (req,res) => {

        const activities = await Activity.find({owner:req.user._id})
        res.status(200).json({ myActivities: activities })
    }


     exports.getActivityById = async (req, res) => {
    try {
        
        const { id } = req.params;

        
        if (!id) {
            return res.status(400).json({ error: 'Invalid activity ID' });
        }

        
        const _activity = await Activity.findById(id);

        
        if (!_activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        
        res.status(200).json(_activity);
    } catch (error) {
        
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateActivity = async (req, res) => {
    const activityData = {
        title : req.body.title,
        description: req.body.description,
        photos : req.body.photos,
        date : req.body.date,
        location : req.body.location,
        duration : req.body.duration,
        capacity : req.body.capacity,
        // category : req.body.category,
        owner : req.user._id,
        
    }
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        
        const { id } = req.params;
        const { title, description, category, date, location } = req.body;

        
        let _activity = await Activity.findById(id);

        
        if (!_activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }
        
        
        if (activityData) {
            _activity.title = activityData.title;
            _activity.description = activityData.description;
            _activity.photos = activityData.photos;
            _activity.duration = activityData.duration;
            _activity.capacity = activityData.capacity;
            _activity.date = activityData.date;
            _activity.location = activityData.location;
          }
        

        
        await _activity.save();

        
        res.status(200).json(_activity);
    } catch (error) {
        
        console.error('Cannot update activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.cancelActivity = async (req, res) => {

   

    try {
        // Extract the activity ID from the request parameters
        const { id } = req.params;

        // Find the activity in the database by its ID
        const _activity = await Activity.findById(id);

        // Check if the activity exists
        if (!_activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // Delete the activity from the database
        _activity.status = 'cancelled'

        await _activity.save();

        
        res.status(200).json(_activity);
    } catch (error) {
        
        console.error('Cannot cancel activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


};

exports.removeActivity = async (req, res) => {
    try {
      
      const { id } = req.params;
  
      
      const activity = await Activity.findById(id);
      if (!activity) {
        return res.status(404).send({ message: 'Activity not found' });
      }
  
      // Delete the user
      await Activity.findByIdAndDelete(id);
  
      res.status(200).send({ message: 'Activity deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error deleting activity' });
    }
  };