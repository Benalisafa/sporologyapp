const User = require('../models/user.model'); 
const bcrypt = require ('bcryptjs')
const multer = require('multer');
const path = require('path');
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




const fs = require('fs');

const storage = multer.diskStorage({
  destination: './images/profile/', 
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, phone, email,newPassword } = req.body; 

    let user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data if fields are not empty
    if (firstname !== undefined && firstname !== '') user.firstname = firstname;
    if (lastname !== undefined && lastname !== '') user.lastname = lastname;
    if (phone !== undefined && phone !== '') user.phone = phone;
    if (email !== undefined && email !== '') user.email = email;
    if (newPassword !== undefined && newPassword !== '') user.password = newPassword;

    // If picture exists in form data, update user's profile picture
    upload.single('picture')(req, res, async (err) => {
      if (err) {
        console.error('Error uploading picture:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      console.log('Image received from frontend:', req.file); // Log if image is received

      if (req.file) {
        console.log('New profile picture uploaded:', req.file.filename); // Log if new profile picture is uploaded
        user.picture = req.file.filename; // Save the filename/path of the uploaded picture
      } else {
        console.log('No new profile picture uploaded.'); // Log if no new profile picture is uploaded
      }

      // Save updated user data
      await user.save();

      console.log('User data updated successfully.'); // Log if user data is updated

      res.status(200).json({ message: 'User updated successfully' });
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.checkEmailExists = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the email already exists in the database
    const user = await User.findOne({ email });
    if (user) {
      // Email already exists
      return res.status(200).json({ exists: true });
    } else {
      // Email doesn't exist
      return res.status(200).json({ exists: false });
    }
  } catch (error) {
    // Error occurred while checking email existence
    console.error('Error checking email existence:', error);
    return res.status(500).json({ error: 'An error occurred while checking email existence' });
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


exports.getUserRegistrationData = async (req, res) => {
  try {
    const sampleData = await User.find({}).limit(10); // Fetch some sample data
    console.log('Sample user data:', sampleData); // Log the sample data

    const data = await User.aggregate([
      { $match: { createdAt: { $type: 'date' } } },
      { $project: { year: { $year: "$createdAt" }, week: { $isoWeek: "$createdAt" } } },
      { $group: { _id: { year: "$year", week: "$week" }, count: { $sum: 1 } } },
      { $sort: { "_id.year": 1, "_id.week": 1 } }
    ]);

    console.log('Aggregated user registration data:', data); // Log the data
    res.json(data);
  } catch (error) {
    console.error('Error retrieving user registration data:', error.message);
    console.error(error.stack);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.getUserRoleProportion = async (req, res) => {
  try {
    const memberCount = await User.countDocuments({ role: 'member' });
    const partnerCount = await User.countDocuments({ role: 'partner' });
    
    // Example: Assuming returning an object with role names as keys and counts as values
    res.json({ member: memberCount, partner: partnerCount });
  } catch (error) {
    console.error('Error fetching role proportion:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


