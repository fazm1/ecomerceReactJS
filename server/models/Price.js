const mongoose = require('mongoose');

const priceSchema = new mongoose.Schema({
  price_currency_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Currency',
    required: true
  },
  price_value: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Price', priceSchema);
