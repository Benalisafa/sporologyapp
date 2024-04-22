const mongoose =require('mongoose')

const reviewSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
      },

      bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings' 
      },

      content: String,
      rating: Number,
      date: Date
      
})

module.exports = mongoose.model('reviews',reviewSchema)