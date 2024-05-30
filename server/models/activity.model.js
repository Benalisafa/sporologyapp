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
    

    companyName: String,
    companyAddress: String,
    status: {
        type: String,
        enum: ['individual', 'company'],
        default: 'individual'
    },

    bookingIds: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'bookings' 
      },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },

      // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

    

})

module.exports = mongoose.model('activities',activitySchema)