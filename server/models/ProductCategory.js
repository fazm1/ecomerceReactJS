const mongoose = require('mongoose');

const productCategorySchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique combination of product and category
productCategorySchema.index({ product_id: 1, category_id: 1 }, { unique: true });

module.exports = mongoose.model('ProductCategory', productCategorySchema);
