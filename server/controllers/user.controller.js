const User = require('../models/user.model'); 
const bcrypt = require ('bcryptjs')

const { validationResult } = require('express-validator'); 

exports.findUserById = async (req, res) => {

  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

}

exports.getPartners = async (req, res) => {
  try {
    // Query users with role "partner" and select all fields
    const partners = await User.find({ role: 'partner' });

    res.json(partners);
  } catch (error) {
    console.error('Error retrieving partners:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMembers = async (req, res) => {
  try {
    // Query users with role "partner" and select all fields
    const members = await User.find({ role: 'member' });

    res.json(members);
  } catch (error) {
    console.error('Error retrieving members:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.verifyPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { userPassword } = req.body;

    // Find the user by ID
    const user = await User.findById(id);

    // If user doesn't exist, return an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the user's hashed password
    const passwordMatch = await bcrypt.compare(userPassword, user.password);

    // Send response based on whether passwords match
    if (passwordMatch) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error verifying password:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




exports.updateUserById = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
   
    const userData = req.body;

    let _user = await User.findById(id);
   
    if (!_user) {
      return res.status(404).json({ error: 'User not found' });
    }


    // Update user data
    if (Object.keys(userData).length > 0) {
      // Only proceed with the update if there are modified fields
      Object.assign(_user, userData);
      await _user.save();
    }

    // Respond with success message
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};





exports.deleteUser = async (req, res) => {
  try {
    
    const { id } = req.params;

    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(id);

    res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error deleting user' });
  }
};
