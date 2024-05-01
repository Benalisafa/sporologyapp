const Activity = require('../models/activity.model'); 
const multer = require('multer');
const { validationResult } = require('express-validator'); 
const path = require('path');

const storage = multer.diskStorage({
  destination: './images/activity/', 
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage,
  limits: { files: 5 } });

exports.createActivity = async (req, res) => {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    

    const uploadedImages = []; 

    upload.array('images', 5)(req, res, async (err) => { 
      if (err) {
        return res.status(400).json({ message: err.message });
      }

     

      if (req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
      }

      for (const file of req.files) {
        uploadedImages.push(file.path); 
      }
     
      const activity = new Activity({
        title: req.body.title,
        description: req.body.description,
        capacity: req.body.capacity,
        price: req.body.price,
        date:req.body.date,
        images: uploadedImages ,
        category:req.body.category,
        duration:req.body.duration,
        location:req.body.location,
      });
      
      console.log(uploadedImages)
      await activity.save();
      res.status(201).json(activity);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};




exports.getActivities = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 10; // Number of activities per page

    // Calculate skip value to skip activities on previous pages
    const skip = (page - 1) * pageSize;

    // Retrieve activities from the database with pagination
    const allActivities = await Activity.find({}).skip(skip).limit(pageSize);

    // Normalize image paths before sending response
    const normalizedActivities = allActivities.map(activity => ({
      ...activity.toObject(), // Convert Mongoose document to plain JavaScript object
      images: activity.images.map(imageUrl => imageUrl.replace(/\\/g, '/'))
    }));

    // Send response with normalized activities
    res.status(200).json({ activities: normalizedActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving activities' });
  }
};

     

    // exports.getMyActivities = async (req,res) => {

    //     const activities = await Activity.find({owner:req.user._id})
    //     res.status(200).json({ myActivities: activities })
    // }


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
        category : req.body.category,
        owner : req.user._id,
        
    }
    try {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        
        const { id } = req.params;
        const { title, description, category, date, location} = req.body;

        
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
            _activity.category = activityData.category;
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
  
      // Delete the activity
      await Activity.findByIdAndDelete(id);
  
      res.status(200).send({ message: 'Activity deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error deleting activity' });
    }
  };