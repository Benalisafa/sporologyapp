const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');


exports.saveBooking = async ( req , res ) => {
  try {
    const { activityId, userId,  } = req.body;
    
    
    const booking = new Booking({
      activityId,
      userId,

      
    });

   
    const savedBooking = await booking.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
};


exports.getBookings = async ( req , res ) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    console.error('Error retrieving bookings:', error);
    res.status(500).json({ error: 'Error retrieving bookings' });
  }
};


exports.getBookingById = async ( req , res ) => {
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


