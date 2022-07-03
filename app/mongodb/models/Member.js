const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const memberSchema = new mongoose.Schema({
  id: {
    type: String,
    default: function genUUID() {
      return uuidv4();
    },
  },
  email: { type: String, required: true, index: true },
  description: { type: String, required: true },
  involvement: {
    type: Number,
    required: true,
    min: [0, 'Must be at least 0, got {VALUE}'],
    max: [10, 'Must be at least 0, got {VALUE}'],
  },
  talent: {
    type: Number,
    required: true,
    min: [0, 'Must be at least 0, got {VALUE}'],
    max: [10, 'Must be at least 0, got {VALUE}'],
  },
  status: {
    type: String,
    enum: {
      values: ['PENDING', 'ACCEPTED'],
      message: '{VALUE} is not supported'
    }
  },
}, { timestamps: true });

const Trip = mongoose.model('Member', memberSchema);

module.exports = Trip;
