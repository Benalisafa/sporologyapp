const mongoose =require('mongoose')

const activitySchema = new mongoose.Schema({

  owner:{
    type : mongoose.Types.ObjectId,
    ref : 'users'
    // required:true
},
    title: String,
    description: String,
    images: [{
      type: String // Assuming you're storing image filenames
  }],
    date: Date,
    location: String,
    duration : Number,
    time : Date,
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