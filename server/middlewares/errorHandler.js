const { GraphQLError } = require('graphql');

// Custom error types
class ValidationError extends GraphQLError {
  constructor(message, field = null) {
    super(message, {
      extensions: {
        code: 'VALIDATION_ERROR',
        field
      }
    });
  }
}

class NotFoundError extends GraphQLError {
  constructor(resource, id) {
    super(`${resource} with ID ${id} not found`, {
      extensions: {
        code: 'NOT_FOUND',
        resource,
        id
      }
    });
  }
}

class DuplicateError extends GraphQLError {
  constructor(message, field = null) {
    super(message, {
      extensions: {
        code: 'DUPLICATE_ERROR',
        field
      }
    });
  }
}

class DatabaseError extends GraphQLError {
  constructor(message) {
    super(message, {
      extensions: {
        code: 'DATABASE_ERROR'
      }
    });
  }
}

// Error handler for async operations
const asyncHandler = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error('Async handler error:', error);
      
      // Handle specific error types
      if (error.name === 'ValidationError') {
        throw new ValidationError(error.message);
      }
      
      if (error.name === 'CastError') {
        throw new ValidationError('Invalid ID format');
      }
      
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        throw new DuplicateError(`${field} already exists`, field);
      }
      
      if (error.name === 'DocumentNotFoundError') {
        throw new NotFoundError('Resource', 'unknown');
      }
      
      // Generic database error
      throw new DatabaseError('Database operation failed');
    }
  };
};

// Error formatter for Apollo Server
const errorFormatter = (error) => {
  console.error('GraphQL Error:', error);
  
  // Return the error as-is if it's already a GraphQLError
  if (error instanceof GraphQLError) {
    return error;
  }
  
  // Handle different error types
  if (error.name === 'ValidationError') {
    return new ValidationError(error.message);
  }
  
  if (error.name === 'CastError') {
    return new ValidationError('Invalid ID format');
  }
  
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    return new DuplicateError(`${field} already exists`, field);
  }
  
  if (error.name === 'DocumentNotFoundError') {
    return new NotFoundError('Resource', 'unknown');
  }
  
  // Generic error
  return new GraphQLError('Internal server error', {
    extensions: {
      code: 'INTERNAL_ERROR'
    }
  });
};

// Check if resource exists
const checkResourceExists = async (Model, id, resourceName) => {
  const resource = await Model.findById(id);
  if (!resource) {
    throw new NotFoundError(resourceName, id);
  }
  return resource;
};

// Check if resource exists by field
const checkResourceExistsByField = async (Model, field, value, resourceName) => {
  const resource = await Model.findOne({ [field]: value });
  if (!resource) {
    throw new NotFoundError(resourceName, value);
  }
  return resource;
};

module.exports = {
  ValidationError,
  NotFoundError,
  DuplicateError,
  DatabaseError,
  asyncHandler,
  errorFormatter,
  checkResourceExists,
  checkResourceExistsByField
};
