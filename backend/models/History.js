const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['image', 'symptom'], required: true },
  input: { type: mongoose.Schema.Types.Mixed, required: true }, // image filename or symptoms array
  result: { type: mongoose.Schema.Types.Mixed, required: true }, // analysis result
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);