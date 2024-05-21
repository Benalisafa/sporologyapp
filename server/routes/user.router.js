const express = require('express');
const route = express.Router();
const userController = require('../controllers/user.controller');
const multer = require('multer');
const passport = require("passport");
const checkRole = require("../middleware/role.middleware");



route.get("/user/:id", userController.findUserById);
route.get("/partners", userController.getPartners);
route.get("/members", userController.getMembers);
route.put("/updateUser/:id",  userController.updateUserById);
route.post("/email", userController.checkEmailExists);
route.post("/verifyPassword/:id", userController.verifyPassword);
route.delete("/deleteUser/:id", passport.authenticate("jwt", { session: false }), checkRole(['admin']), userController.deleteUser);
route.get('/registrationData', userController.getUserRegistrationData);
route.get('/roleProportion', userController.getUserRoleProportion);

//Kén aandek wa9t arja3 lenna w aamel desactiver l son compter el membre

module.exports = route;
