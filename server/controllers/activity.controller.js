const Activity = require('../models/activity.model')
const { validationResult } = require('express-validator');

exports.createActivity = ( req , res ) =>  {


    const data = {
        title : req.body.title,
        description: req.body.description,
        photos : req.body.photos,
        date : req.body.date,
        location : req.body.location,
        duration : req.body.duration,
        capacity : req.body.capacity,
        // category : req.body.category,
        // creator : req.body.creator,
        
    }


    const _activity = new Activity(data);

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
        
        console.error('Error getting activity by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.updateActivity = async (req, res) => {
    const data = {
        title : req.body.title,
        description: req.body.description,
        photos : req.body.photos,
        date : req.body.date,
        location : req.body.location,
        duration : req.body.duration,
        capacity : req.body.capacity,
        // category : req.body.category,
        // creator : req.body.creator,
        
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
        
        
        if (data) {
            _activity.title = data.title;
            _activity.description = data.description;
            _activity.photos = data.photos;
            _activity.duration = data.duration;
            _activity.capacity = data.capacity;
            _activity.date = data.date;
            _activity.location = data.location;
          }
        

        
        await _activity.save();

        
        res.status(200).json(_activity);
    } catch (error) {
        
        console.error('Cannot update activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.deleteActivity = async (req, res) => {

    try {
        // Extract the activity ID from the request parameters
        const { id } = req.params;

        // Find the activity in the database by its ID
        const activity = await Activity.findById(id);

        // Check if the activity exists
        if (!activity) {
            return res.status(404).json({ error: 'Activity not found' });
        }

        // Delete the activity from the database
        await activity.remove();

        // Return success response
        res.status(200).json({ message: 'Activity deleted successfully' });
    } catch (error) {
        // If an error occurs during the process, return an error response
        console.error('Error deleting activity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

};