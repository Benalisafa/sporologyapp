const express = require ('express')

const route = express.Router()

const userController = require ('../controllers/user.controller');

const passport = require ("passport")
const checkRole = require ("../middleware/role.middleware");

route.delete("/deleteUser/:id" , passport.authenticate("jwt",{session:false}), checkRole(['admin']) , userController.deleteUser)

module.exports = route