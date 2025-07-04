const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const History = require('../models/history');
const User = require('../models/User');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

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

// POST /api/image/analyze
router.post('/analyze', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    // Mock analysis result (replace with real AI/ML later)
    const analysisResult = {
      diagnosis: "Mock diagnosis result",
      confidence: 0.95,
      imageType: req.file.mimetype,
      fileName: req.file.filename
    };

    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Save to history
    const history = new History({
      user: user._id,
      type: 'image',
      input: { 
        fileName: req.file.filename,
        originalName: req.file.originalname,
        fileSize: req.file.size
      },
      result: analysisResult
    });
    await history.save();

    res.json({ result: analysisResult });
  } catch (err) {
    // Clean up uploaded file if there's an error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;