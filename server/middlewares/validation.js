const { GraphQLError } = require('graphql');

// Validation helper functions
const validateRequired = (value, fieldName) => {
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    throw new GraphQLError(`${fieldName} is required`, {
      extensions: { code: 'VALIDATION_ERROR' }
    });
  }
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new GraphQLError('Invalid email format', {
      extensions: { code: 'VALIDATION_ERROR' }
    });
  }
};

const validatePositiveNumber = (value, fieldName) => {
  if (typeof value !== 'number' || value <= 0) {
    throw new GraphQLError(`${fieldName} must be a positive number`, {
      extensions: { code: 'VALIDATION_ERROR' }
    });
  }
};

const validateStringLength = (value, fieldName, minLength = 1, maxLength = 255) => {
  if (typeof value !== 'string' || value.length < minLength || value.length > maxLength) {
    throw new GraphQLError(`${fieldName} must be between ${minLength} and ${maxLength} characters`, {
      extensions: { code: 'VALIDATION_ERROR' }
    });
  }
};

const validateEnum = (value, fieldName, allowedValues) => {
  if (!allowedValues.includes(value)) {
    throw new GraphQLError(`${fieldName} must be one of: ${allowedValues.join(', ')}`, {
      extensions: { code: 'VALIDATION_ERROR' }
    });
  }
};

// Product validation
const validateProductInput = (input) => {
  validateRequired(input.name, 'Product name');
  validateStringLength(input.name, 'Product name', 1, 100);
  
  validateRequired(input.description, 'Product description');
  validateStringLength(input.description, 'Product description', 10, 1000);
  
  validateRequired(input.brand, 'Product brand');
  validateStringLength(input.brand, 'Product brand', 1, 50);
  
  if (input.inStock !== undefined && typeof input.inStock !== 'boolean') {
    throw new GraphQLError('inStock must be a boolean', {
      extensions: { code: 'VALIDATION_ERROR' }
    });
  }
};

// Category validation
const validateCategoryInput = (input) => {
  validateRequired(input.category_name, 'Category name');
  validateStringLength(input.category_name, 'Category name', 1, 50);
  
  validateRequired(input.category_description, 'Category description');
  validateStringLength(input.category_description, 'Category description', 5, 200);
};

// Attribute validation
const validateAttributeInput = (input) => {
  validateRequired(input.attribute_name, 'Attribute name');
  validateStringLength(input.attribute_name, 'Attribute name', 1, 50);
  
  validateRequired(input.attribute_description, 'Attribute description');
  validateStringLength(input.attribute_description, 'Attribute description', 5, 200);
};

// SubAttribute validation
const validateSubAttributeInput = (input) => {
  validateRequired(input.attribute_id, 'Attribute ID');
  validateRequired(input.subattribute_name, 'Subattribute name');
  validateStringLength(input.subattribute_name, 'Subattribute name', 1, 50);
  
  validateRequired(input.subattribute_description, 'Subattribute description');
  validateStringLength(input.subattribute_description, 'Subattribute description', 5, 200);
};

// Currency validation
const validateCurrencyInput = (input) => {
  validateRequired(input.currency_name, 'Currency name');
  validateStringLength(input.currency_name, 'Currency name', 1, 50);
  
  validateRequired(input.currency_symbol, 'Currency symbol');
  validateStringLength(input.currency_symbol, 'Currency symbol', 1, 10);
};

// Price validation
const validatePriceInput = (input) => {
  validateRequired(input.price_currency_id, 'Currency ID');
  validateRequired(input.price_value, 'Price value');
  validatePositiveNumber(input.price_value, 'Price value');
};

// Order validation
const validateOrderInput = (input) => {
  validateRequired(input.price_id, 'Price ID');
  validateRequired(input.total_amount, 'Total amount');
  validatePositiveNumber(input.total_amount, 'Total amount');
  
  if (input.status) {
    const allowedStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    validateEnum(input.status, 'Order status', allowedStatuses);
  }
};

// Image validation
const validateImageInput = (input) => {
  validateRequired(input.product_id, 'Product ID');
  validateRequired(input.image_url, 'Image URL');
  validateStringLength(input.image_url, 'Image URL', 10, 500);
  
  if (input.alt_text) {
    validateStringLength(input.alt_text, 'Alt text', 1, 100);
  }
  
  if (input.is_primary !== undefined && typeof input.is_primary !== 'boolean') {
    throw new GraphQLError('is_primary must be a boolean', {
      extensions: { code: 'VALIDATION_ERROR' }
    });
  }
};

// Relationship validation
const validateProductCategoryInput = (input) => {
  validateRequired(input.product_id, 'Product ID');
  validateRequired(input.category_id, 'Category ID');
};

const validateProductAttributeInput = (input) => {
  validateRequired(input.product_id, 'Product ID');
  validateRequired(input.attribute_id, 'Attribute ID');
  validateRequired(input.subattribute_id, 'Subattribute ID');
};

const validateProductPriceInput = (input) => {
  validateRequired(input.product_id, 'Product ID');
  validateRequired(input.price_id, 'Price ID');
};

const validateProductOrderInput = (input) => {
  validateRequired(input.product_id, 'Product ID');
  validateRequired(input.order_id, 'Order ID');
  validateRequired(input.quantity, 'Quantity');
  validatePositiveNumber(input.quantity, 'Quantity');
};

module.exports = {
  validateRequired,
  validateEmail,
  validatePositiveNumber,
  validateStringLength,
  validateEnum,
  validateProductInput,
  validateCategoryInput,
  validateAttributeInput,
  validateSubAttributeInput,
  validateCurrencyInput,
  validatePriceInput,
  validateOrderInput,
  validateImageInput,
  validateProductCategoryInput,
  validateProductAttributeInput,
  validateProductPriceInput,
  validateProductOrderInput
};
