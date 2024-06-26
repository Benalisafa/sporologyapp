const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: {
    type: String,
    unique: true,
  },
  role: {
    type: String,
    enum: ['partner', 'member', 'admin'],
    default: 'member'
  },
  partnerType: {
    type: String,
    enum: ['individual', 'company'],
  },
  picture: String,
  birthdate: Date,
  address: String,
  phone: Number,
  // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  companyName: String,
  companyAddress: String,
  description: String,
  familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FamilyMembers' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('users', userSchema);
