const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { fullName, email, phone, password } = req.body;
  try {
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      fullName,
      email,
      phone,
      password: hashedPassword
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, user: { fullName, email, phone } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// routes/auth.js
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { fullName: user.fullName, email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users (admin only)
router.get('/', auth, async (req, res) => {
  // Optionally: check if req.user.isAdmin === true
  try {
    const users = await User.find({}, { password: 0 }); // Don't send passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete user by id (admin only)
router.delete('/:id', auth, async (req, res) => {
  // Optionally: check if req.user.isAdmin === true
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update logged-in user's profile
router.put('/me', auth, async (req, res) => {
  try {
    const { fullName, phone, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId, // userId from JWT
      { fullName, phone, email },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json({
      fullName: updatedUser.fullName,
      phone: updatedUser.phone,
      email: updatedUser.email,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get logged-in user's profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      fullName: user.fullName,
      phone: user.phone,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
