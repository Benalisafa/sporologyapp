const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const Activity = require('../models/activity.model'); 

exports.createBooking = async (req, res) => {
  try {
    const { activityId, userId, name } = req.body;
    const bookingDate = Date.now();
    
    const booking = new Booking({
      activityId,
      userId,
      name,
      bookingDate:bookingDate,
    });

    const savedBooking = await booking.save();

    // Retrieve the corresponding activity
    const activity = await Activity.findById(activityId);

    // Log the retrieved activity to ensure it's found
    console.log('Retrieved activity:', activity);

    // Update the activity's bookingIds array to include the newly created booking's _id
    activity.bookingIds.push(savedBooking._id);

    // Log the updated activity before saving to ensure the bookingId is added
    console.log('Updated activity:', activity);

    // Save the updated activity back to the database
    await activity.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
};


exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Error retrieving bookings' });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error retrieving booking:', error);
    res.status(500).json({ error: 'Error retrieving booking' });
  }
};
