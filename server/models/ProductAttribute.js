const mongoose = require('mongoose');

const productAttributeSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  attribute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
    required: true
  },
  subattribute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubAttribute',
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique combination of product, attribute, and subattribute
productAttributeSchema.index({ product_id: 1, attribute_id: 1, subattribute_id: 1 }, { unique: true });

module.exports = mongoose.model('ProductAttribute', productAttributeSchema);
