const FamilyMember = require('../models/familyMember.model');
const User = require('../models/user.model');

exports.addFamilyMember = async (req, res) => {
  const { name, age } = req.body;
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newFamilyMember = new FamilyMember({ name, age, user: userId });
    const savedFamilyMember = await newFamilyMember.save();

    user.familyMembers.push(savedFamilyMember._id);
    await user.save();

    res.json(savedFamilyMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFamilyMembers = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate('familyMembers');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.familyMembers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
