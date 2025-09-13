import { gql } from '@apollo/client';

// Get all products with their relationships
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      name
      description
      brand
      inStock
      categories {
        _id
        category_name
      }
      prices {
        _id
        price_value
        currency {
          currency_name
          currency_symbol
        }
      }
      images {
        _id
        image_url
        alt_text
        is_primary
      }
      attributes {
        _id
        attribute {
          attribute_name
        }
        subattribute {
          subattribute_name
        }
      }
    }
  }
`;

// Get products by category
export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($categoryId: ID!) {
    productsByCategory(categoryId: $categoryId) {
      _id
      name
      description
      brand
      inStock
      prices {
        _id
        price_value
        currency {
          currency_symbol
        }
      }
      images {
        _id
        image_url
        alt_text
        is_primary
      }
    }
  }
`;

// Get all categories
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      category_name
      category_description
    }
  }
`;

// Get single product with full details
export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      _id
      name
      description
      brand
      inStock
      categories {
        _id
        category_name
      }
      prices {
        _id
        price_value
        currency {
          currency_name
          currency_symbol
        }
      }
      images {
        _id
        image_url
        alt_text
        is_primary
      }
      attributes {
        _id
        attribute {
          attribute_name
        }
        subattribute {
          subattribute_name
        }
      }
    }
  }
`;

// Get products in stock only
export const GET_PRODUCTS_IN_STOCK = gql`
  query GetProductsInStock {
    productsInStock {
      _id
      name
      description
      brand
      prices {
        _id
        price_value
        currency {
          currency_symbol
        }
      }
      images {
        _id
        image_url
        alt_text
        is_primary
      }
    }
  }
`;

// Get products by brand
export const GET_PRODUCTS_BY_BRAND = gql`
  query GetProductsByBrand($brand: String!) {
    productsByBrand(brand: $brand) {
      _id
      name
      description
      brand
      inStock
      prices {
        _id
        price_value
        currency {
          currency_symbol
        }
      }
      images {
        _id
        image_url
        alt_text
        is_primary
      }
    }
  }
`;
