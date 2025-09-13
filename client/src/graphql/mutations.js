import { gql } from '@apollo/client';

// Create a new product
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      _id
      name
      description
      brand
      inStock
    }
  }
`;

// Update a product
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      _id
      name
      description
      brand
      inStock
    }
  }
`;

// Delete a product
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

// Create an order
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      _id
      status
      total_amount
      price {
        price_value
        currency {
          currency_symbol
        }
      }
    }
  }
`;

// Add product to category
export const ADD_PRODUCT_TO_CATEGORY = gql`
  mutation AddProductToCategory($input: ProductCategoryInput!) {
    addProductToCategory(input: $input) {
      _id
      product_id
      category_id
    }
  }
`;

// Add attribute to product
export const ADD_ATTRIBUTE_TO_PRODUCT = gql`
  mutation AddAttributeToProduct($input: ProductAttributeInput!) {
    addAttributeToProduct(input: $input) {
      _id
      product_id
      attribute_id
      subattribute_id
    }
  }
`;

// Add price to product
export const ADD_PRICE_TO_PRODUCT = gql`
  mutation AddPriceToProduct($input: ProductPriceInput!) {
    addPriceToProduct(input: $input) {
      _id
      product_id
      price_id
    }
  }
`;
