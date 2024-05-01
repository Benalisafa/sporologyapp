const express = require ('express')

const route = express.Router()

const userController = require ('../controllers/user.controller');

const passport = require ("passport")
const checkRole = require ("../middleware/role.middleware");


route.get("/user/:id" , userController.findUserById)
route.delete("/deleteUser/:id" , passport.authenticate("jwt",{session:false}), checkRole(['admin']) , userController.deleteUser)


//Kén aandek wa9t arja3 lenna w aamel desactiver l son compter el membre

module.exports = route