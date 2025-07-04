const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: 'Username, email, and password are required.' });

  try {
    // Check if user already exists (by username or email)
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    if (existingUser)
      return res.status(409).json({ message: 'User with this username or email already exists.' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.json({ message: 'Signup successful.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Allow login with either username or email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials.' });

    // Generate JWT
    const token = jwt.sign({ username: user.username, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful.', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;