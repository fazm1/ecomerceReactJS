const mongoose = require('mongoose');

const attributeSchema = new mongoose.Schema({
  attribute_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  attribute_description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Attribute', attributeSchema);
