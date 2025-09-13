const mongoose = require('mongoose');

const productPriceSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  price_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Price',
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique combination of product and price
productPriceSchema.index({ product_id: 1, price_id: 1 }, { unique: true });

module.exports = mongoose.model('ProductPrice', productPriceSchema);
