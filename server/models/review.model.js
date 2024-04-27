const mongoose =require('mongoose')

const reviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
      },

      activityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activities' 
      },

      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings' 
      },

      experience: String,
      rating: Number,
      date: Date
      
})

module.exports = mongoose.model('reviews',reviewSchema)