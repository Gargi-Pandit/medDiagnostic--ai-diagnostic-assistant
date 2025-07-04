const express = require('express');
const jwt = require('jsonwebtoken');
const History = require('../models/history');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Middleware to verify JWT and get user
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided.' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

// GET /api/user/history
router.get('/history', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const history = await History.find({ user: user._id }).sort({ createdAt: -1 });
    res.json({ history });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;