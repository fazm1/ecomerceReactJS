const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  price_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  total_amount: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
