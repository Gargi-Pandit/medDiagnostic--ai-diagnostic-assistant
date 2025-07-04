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

// POST /api/symptom/analyze
router.post('/analyze', authMiddleware, async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0)
    return res.status(400).json({ message: 'Symptoms are required.' });

  // Mock analysis result
  const analysisResult = {
    possibleConditions: [
      { name: "Mock Condition A", probability: 0.7 },
      { name: "Mock Condition B", probability: 0.3 }
    ]
  };

  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Save to history
    const history = new History({
      user: user._id,
      type: 'symptom',
      input: { symptoms },
      result: analysisResult
    });
    await history.save();

    res.json({ result: analysisResult });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;