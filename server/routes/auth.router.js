const express = require ('express')

const route = express.Router()

const authController = require ('../controllers/auth.controller');
const upload = require('../uploadConfig');

route.post('/signup/member', authController.signup )
route.post('/signup/partner',  upload.single('picture'), authController.signup )
route.post('/signin', authController.signin )


module.exports = route