const mongoose =require('mongoose')

const activitySchema = new mongoose.Schema({

 
    title: String,
    description: String,
    images: [{
      type: String,
      required:true
  }],
    date: Date,
    location: String,
    duration : Number,
    time : String,
    capacity: Number,
    price: Number,
    category:String,
    

    status: String,

    bookingIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'bookings' 
      },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },

    isFavorite: {
        type: Boolean,
        default: false
      }

    

})

module.exports = mongoose.model('activities',activitySchema)