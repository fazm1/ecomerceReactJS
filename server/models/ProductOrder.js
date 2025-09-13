const mongoose = require('mongoose');

const productOrderSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  order_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  }
}, {
  timestamps: true
});

// Ensure unique combination of product and order
productOrderSchema.index({ product_id: 1, order_id: 1 }, { unique: true });

module.exports = mongoose.model('ProductOrder', productOrderSchema);
