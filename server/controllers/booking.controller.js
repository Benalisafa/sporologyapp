const express = require('express');
const router = express.Router();
const Booking = require('../models/booking.model');
const Activity = require('../models/activity.model'); 

const FamilyMember = require('../models/familyMember.model'); // Assuming you have a FamilyMember model

exports.createBooking = async (req, res) => {
  try {
    const { activityId, userId, name } = req.body;
    const bookingDate = new Date(); // Capture current date and time

    // Validate inputs
    if (!activityId || !userId || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the family member by name
    const familyMember = await FamilyMember.findOne({ name, user: userId });

    if (!familyMember) {
      return res.status(404).json({ error: 'Family member not found' });
    }

    // Check if a booking for the same activity, user, and family member already exists
    const existingBooking = await Booking.findOne({ activity: activityId, userId, familyMember: familyMember._id });
    if (existingBooking) {
      return res.status(400).json({ error: 'You have already booked this activity under this name' });
    }

    // Create a new Booking instance
    const booking = new Booking({
      activity: activityId, // Store activity reference
      userId,
      familyMember: familyMember._id, // Store the _id of the family member
      bookingDate
    });

    // Save the booking to the database
    const savedBooking = await booking.save();

    // Retrieve the corresponding activity
    const activity = await Activity.findById(activityId);

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    // Update the activity's bookingIds array to include the newly created booking's _id
    activity.bookingIds.push(savedBooking._id);

    // Save the updated activity back to the database
    await activity.save();

    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
};

exports.getBookingByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    const bookings = await Booking.find({ userId })
      .populate('activity')
      .populate({
        path: 'familyMembers',
        select: 'name', // Specify the fields you want to select from FamilyMember
      })
      .exec();

    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
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

exports.getBookingByUserId = async (req, res) => {
  const userId = req.params.userId;

  try {
    // Retrieve bookings for the specified user and populate the 'activity' field
    const bookings = await Booking.find({ userId }).populate('activity').exec();
    res.json({ bookings }); // Send merged data to the client
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
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


exports.getBookingData = async (req, res) => {
  try {
    const results = await Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$bookingDate' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } }, // Sort by date ascending
    ]);
    res.json(results);
  } catch (error) {
    console.error('Error aggregating daily trends:', error);
    res.status(500).json({ error: 'Error aggregating daily trends' });
  }
}
