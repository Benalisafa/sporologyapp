const Category = require('../models/category.model');

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  const { userId } = req.params; // assuming userId is passed as a parameter

  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    const newCategory = new Category({
      name,
      description,
      createdBy: userId
    });

    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Additional functions (e.g., getCategories, deleteCategory, etc.) can be added here
