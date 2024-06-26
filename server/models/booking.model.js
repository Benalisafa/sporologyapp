const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },

  familyMember: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'familyMembers'
  },

  bookingDate: Date,
  activity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'activities'
  }
});

module.exports = mongoose.model('bookings', bookingSchema);
