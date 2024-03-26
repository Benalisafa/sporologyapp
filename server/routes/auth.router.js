const express = require ('express')

const route = express.Router()

const authController = require ('../controllers/auth.controller');

route.post('/signup', authController.signup )
route.post('/signin', authController.signin )
route.post('/logout', authController.logout )


module.exports = route