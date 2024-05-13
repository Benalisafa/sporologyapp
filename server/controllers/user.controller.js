const User = require('../models/user.model'); 

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
    const partners = await User.find({ role: 'member' });

    res.json(members);
  } catch (error) {
    console.error('Error retrieving members:', error);
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
