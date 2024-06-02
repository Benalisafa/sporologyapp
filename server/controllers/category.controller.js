const Category = require('../models/category.model');

// Create category function
exports.createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    // Check if category already exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category already exists' });
    }

    // Create new category instance
    const newCategory = new Category({
      name
    });

    // Save new category to database
    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch all categories function
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete category function
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(deletedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update category function
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(id, { name }, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
