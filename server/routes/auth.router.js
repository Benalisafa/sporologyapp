const express = require ('express')

const route = express.Router()

const authController = require ('../controllers/auth.controller');

route.post('/signup/member', authController.signup )
route.post('/signup/partner', authController.signup )
route.post('/signin', authController.signin )


module.exports = route