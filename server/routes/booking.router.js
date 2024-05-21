const express = require ('express')

const route = express.Router()

const bookingController = require ('../controllers/booking.controller');




route.post('/createBooking', bookingController.createBooking)
route.get ('/listBookings' , bookingController.getBookings)
route.get ('/listUserBookings/:userId' , bookingController.getBookingByUserId)
route.get('/listBooking/:id' , bookingController.getBookingById)
route.get('/trends' , bookingController.getBookingData)


module.exports = route