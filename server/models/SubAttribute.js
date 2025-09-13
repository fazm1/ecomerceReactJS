const mongoose = require('mongoose');

const subAttributeSchema = new mongoose.Schema({
  attribute_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attribute',
    required: true
  },
  subattribute_name: {
    type: String,
    required: true,
    trim: true
  },
  subattribute_description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Ensure unique combination of attribute and subattribute name
subAttributeSchema.index({ attribute_id: 1, subattribute_name: 1 }, { unique: true });

module.exports = mongoose.model('SubAttribute', subAttributeSchema);
