const express = require('express');
const route = express.Router();
const categoryController = require('../controllers/category.controller');

// Route to create a category
route.post('/add', categoryController.createCategory);
route.get('/', categoryController.getCategories);
route.put('/:id', categoryController.updateCategory);
route.delete('/:id', categoryController.deleteCategory);

// Additional routes can be added here (e.g., getCategories, deleteCategory, etc.)

module.exports = route;
