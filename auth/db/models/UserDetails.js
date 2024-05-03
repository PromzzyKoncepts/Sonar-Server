const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneContact: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  distance: {
    type: String,
    required: true
  },
  timeTaken: {
    type: String,
    required: true
  }
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = PersonalInfo;
