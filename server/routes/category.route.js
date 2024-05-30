const express = require('express');
const route = express.Router();
const categoryController = require('../controllers/category.controller');

// Route to create a category
route.post('/:userId', categoryController.createCategory);

// Additional routes can be added here (e.g., getCategories, deleteCategory, etc.)

module.exports = route;
