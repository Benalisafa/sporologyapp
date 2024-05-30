const express = require ('express');
const route = express.Router();

const familyMemberController = require ('../controllers/familyMember.Controller');

route.post('/:userId', familyMemberController.addFamilyMember);
route.get('/:userId', familyMemberController.getFamilyMembers);

module.exports = route;
