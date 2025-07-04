const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./db'); 

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

const imageRoutes = require('./routes/image');
const authRoutes = require('./routes/auth');
const symptomRoutes = require('./routes/symptom');
const userRoutes = require('./routes/user');

app.use('/api/image', imageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/symptom', symptomRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});