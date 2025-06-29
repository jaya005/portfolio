const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const config = require('../config');

const router = express.Router();

// Register route

router.get('/test', (req, res) => {
  res.send("Auth router is active");
});

router.post('/register', async (req, res) => {
  try {
    const { email, password, role = 'user' } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ email, password, role });
    await user.save();

    const token = jwt.sign({ userId: user._id, email, role }, config.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ message: 'User registered', token, user: { id: user._id, email, role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: 'Invalid credentials.' });

    const token = jwt.sign({ userId: user._id, email, role: user.role }, config.JWT_SECRET, { expiresIn: '24h' });
    res.json({ message: 'Login successful', token, user: { id: user._id, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
