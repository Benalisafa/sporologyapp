const mongoose =require('mongoose')

const bookingSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' 
      },

    name: String,
    bookingDate: Date,


      // activityId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'activities' 
      // },

      // reviewIds : {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'reviews' 
      // },

      
      // startDate: Date,
      // endDate: Date
      
})

module.exports = mongoose.model('bookings',bookingSchema)