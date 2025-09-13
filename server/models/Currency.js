const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  currency_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  currency_symbol: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Currency', currencySchema);
