const Activity = require('../models/activity.model');
const multer = require('multer');
const { validationResult } = require('express-validator');
const path = require('path');
const mongoose = require('mongoose');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: './images/activity/', 
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Multer upload configuration
const upload = multer({ 
  storage: storage,
  limits: { files: 5 }
});

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

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No images uploaded' });
      }

      for (const file of req.files) {
        uploadedImages.push(file.path); 
      }

      // Validate userId
      if (!req.body.userId || !mongoose.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).json({ message: 'Invalid User ID' });
      }

      const activity = new Activity({
        title: req.body.title,
        description: req.body.description,
        capacity: req.body.capacity,
        price: req.body.price,
        date: req.body.date,
        images: uploadedImages,
        category: req.body.category,
        duration: req.body.duration,
        location: req.body.location,
        time: req.body.time,
        bookingIds: [],
        userId: req.body.userId,
      });

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
    // Retrieve all activities from the database and populate userId with firstname and companyName
    const allActivities = await Activity.find().populate('userId', ' partnerType firstname lastname companyName');

    // Send response with all activities
    res.status(200).json({ activities: allActivities });
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

exports.getSimilarActivities = async (req, res) => {
  try {
    const { category } = req.params;

    // Retrieve activities with the same category
    const similarActivities = await Activity.find({ category });

    res.status(200).json(similarActivities);
  } catch (error) {
    console.error('Error fetching similar activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getTopReservedActivities = async (req, res) => {
  try {
    // Aggregate to find the most booked activities
    const topReservedActivities = await Activity.aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          images: 1,
          date: 1,
          location: 1,
          duration: 1,
          time: 1,
          capacity: 1,
          price: 1,
          category: 1,
          companyName: 1,
          companyAddress: 1,
          status: 1,
          userId: 1,
          favorites: 1,
          numberOfBookings: { $size: '$bookingIds' }
        }
      },
      { $sort: { numberOfBookings: -1 } } // Sort by number of bookings
    ]);

    // Send response with top reserved activities
    res.status(200).json({ activities: topReservedActivities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving top reserved activities' });
  }
};

exports.getUpcomingActivitiesByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Validate userId format
    if (!isValidUserId(userId)) {
      return res.status(400).json({ error: 'Invalid userId' });
    }

    // Get current date
    const currentDate = new Date();

    // Find activities posted by the user where the date hasn't arrived yet
    const upcomingActivities = await Activity.find({
      userId: userId,
      date: { $gt: currentDate } // Find activities with date greater than current date
    });

    // Return response
    return res.status(200).json({ activities: upcomingActivities });
  } catch (error) {
    console.error('Error fetching upcoming activities:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to validate userId format
function isValidUserId(userId) {
  // Implement your validation logic here
  // Example: Check if userId is a non-empty string
  return typeof userId === 'string' && userId.trim() !== '';
}



exports.getPastActivitiesByUserId = async (req, res) => {
  const userId = req.params.userId; // Assuming userId is available in the request object
  try {
    // Get current date with time set to the beginning of the day
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Find activities posted by the user where the date has already passed
    const pastActivities = await Activity.find({
      userId: userId,
      date: { $lt: currentDate } // Find activities with date less than current date
    });

    if (pastActivities.length === 0) {
      return res.status(404).json({ message: "No past activities found for the user." });
    }

    // Send the past activities as response
    res.json(pastActivities);
  } catch (error) {
    console.error('Error fetching past activities:', error);
    res.status(500).json({ message: "Internal Server Error" }); // Send an error response
  }
};






exports.activityFavoriteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    let activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Check if the user has already favorited the activity
    const index = activity.favorites.indexOf(userId);
    if (index === -1) {
      // If user hasn't favorited the activity, add to favorites
      activity.favorites.push(userId);
    } else {
      // If user has already favorited the activity, remove from favorites
      activity.favorites.splice(index, 1);
    }

    await activity.save();

    res.status(200).json({ message: 'Favorite status toggled successfully', activity });
  } catch (error) {
    console.error('Cannot toggle favorite status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.searchActivities = async (req, res) => {
  try {
    // Extract search parameters from the request query
    const { activity, location, date } = req.query;

    // Validate the search parameters if needed
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }

    // Build the search query based on provided parameters
    const searchQuery = {};
    if (activity) {
      searchQuery.title = { $regex: activity, $options: 'i' }; // Case-insensitive search
    }
    if (location) {
      searchQuery.location = { $regex: location, $options: 'i' };
    }
    if (date) {
      searchQuery.date = { $regex: date, $options: 'i' };
    }

    // Execute the search query
    const matchingActivities = await Activity.find(searchQuery);

    // Return the matching activities as a response
    res.status(200).json({ activities: matchingActivities });
  } catch (error) {
    console.error('Error searching activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// exports.searchActivities = async (req, res) => {
//   try {
//     const searchQuery = {};

//     const { activity, location, date, startDate, endDate } = req.query;

//     if (activity) {
//       searchQuery.title = { $regex: activity, $options: 'i' }; // Case-insensitive search
//     }
//     if (location) {
//       searchQuery.location = { $regex: location, $options: 'i' }; // Case-insensitive search
//     }
//     if (date) {
//       searchQuery.date = new Date(date);
//     } else if (startDate && endDate) {
//       searchQuery.date = {
//         $gte: new Date(startDate),
//         $lte: new Date(endDate)
//       };
//     } else if (startDate) {
//       searchQuery.date = { $gte: new Date(startDate) };
//     } else if (endDate) {
//       searchQuery.date = { $lte: new Date(endDate) };
//     }

//     const activities = await Activity.find(searchQuery);
//     res.status(200).json(activities);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };



exports.updateActivity = async (req, res) => {
  try {
      const { id } = req.params;
      const { title, description, capacity, date, location } = req.body;

      // Find activity by ID
      let activity = await Activity.findById(id);

      if (!activity) {
          return res.status(404).json({ error: 'Activity not found' });
      }

      // Update activity fields
      activity.title = title;
      activity.description = description;
      activity.capacity = capacity;
      activity.date = date;
      activity.location = location;

      // Save updated activity
      await activity.save();

      res.status(200).json(activity);
  } catch (error) {
      console.error('Error updating activity:', error);
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

  exports.getActivityCount = async (req, res) => {
    try {
      const activityCount = await Activity.countDocuments();
      res.json({ count: activityCount });
    } catch (error) {
      console.error('Error fetching activity count:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  