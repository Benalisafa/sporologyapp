const Review = require('../models/review.model');

exports.createReview = async (req, res) => {
    const { userId, activityId, rating, experience, date } = req.body;
    

    // Instantiate a new Review object with the received data
    const review = new Review({
        userId,
        activityId,
        rating,
        experience,
        date
    });

    try {
        // Save the review to the database
        const savedReview = await review.save();
        console.log('Received rating:', rating);
        console.log('Received experience:', experience);
        console.log(activityId)
        
        
        // Send a response indicating success
        res.status(201).json(savedReview);
    } catch (error) {
        console.error('Error saving review:', error);
        // Send a response indicating failure
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.getReviewsByActivityId = async (req, res) => {
    try {
        const { activityId } = req.params;
    
        // Find all reviews associated with the provided activity ID
        const reviews = await Review.find({ activityId });
    
        // Return the reviews as JSON response
        res.json(reviews);
    
      } catch (error) {
        // Handle errors
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
