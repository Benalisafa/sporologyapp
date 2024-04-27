const express = require ('express');
const route = express.Router();

const reviewController = require ('../controllers/review.controller');

route.post('/createReview', reviewController.createReview);
route.get('/getReviewsByActivityId/:activityId', reviewController.getReviewsByActivityId);

module.exports = route;