const Activity = require('../models/activity.model');

const activityOwnership = async (req, res, next) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    // Check if activity.owner is undefined
    if (!activity.owner || activity.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized: You are not the owner of this activity' });
    }

    next(); // Allow the operation to proceed if the user is the owner
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving activity' });
  }
};

module.exports = activityOwnership;
