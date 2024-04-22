const express = require ('express')

const route = express.Router()

const bookingController = require ('../controllers/booking.controller');




route.post('/save', bookingController.saveBooking)
route.get ('/listBookings' , bookingController.getBookings)
route.get('/listBooking/:id' , bookingController.getBookingById)


module.exports = route