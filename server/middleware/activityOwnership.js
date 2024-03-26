const Activity = require('../models/activity.model');

const activityOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const postId = req.params.postId; // Assuming post ID is in the route parameter
    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (activity.owner.toString() !== req.user._id.toString()) { // Compare user IDs (as strings)
      return res.status(403).json({ message: 'Unauthorized: You are not the owner of this post' });
    }

    next(); // Allow update to proceed if owner matches
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving activities' });
  }
};

module.exports = activityOwnership;