const mongoose =require('mongoose')

const reservationSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users' // Reference to User model
      },

      activity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'activities' 
      },

      




})

module.exports = mongoose.model('reservations',reservationSchema)