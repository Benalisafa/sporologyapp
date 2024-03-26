const User = require('../models/user.model'); 

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
