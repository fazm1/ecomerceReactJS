const { gql } = require('graphql-tag');

const typeDefs = gql`
  scalar Date

  type Product {
    _id: ID!
    name: String!
    description: String!
    brand: String!
    inStock: Boolean!
    categories: [Category!]!
    attributes: [ProductAttribute!]!
    prices: [Price!]!
    images: [Image!]!
    orders: [Order!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Category {
    _id: ID!
    category_name: String!
    category_description: String!
    products: [Product!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Attribute {
    _id: ID!
    attribute_name: String!
    attribute_description: String!
    subattributes: [SubAttribute!]!
    products: [Product!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type SubAttribute {
    _id: ID!
    attribute_id: ID!
    attribute: Attribute!
    subattribute_name: String!
    subattribute_description: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductAttribute {
    _id: ID!
    product_id: ID!
    product: Product!
    attribute_id: ID!
    attribute: Attribute!
    subattribute_id: ID!
    subattribute: SubAttribute!
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductCategory {
    _id: ID!
    product_id: ID!
    product: Product!
    category_id: ID!
    category: Category!
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductPrice {
    _id: ID!
    product_id: ID!
    product: Product!
    price_id: ID!
    price: Price!
    createdAt: Date!
    updatedAt: Date!
  }

  type Currency {
    _id: ID!
    currency_name: String!
    currency_symbol: String!
    prices: [Price!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Price {
    _id: ID!
    price_currency_id: ID!
    currency: Currency!
    price_value: Float!
    products: [Product!]!
    orders: [Order!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Order {
    _id: ID!
    price_id: ID!
    price: Price!
    status: OrderStatus!
    total_amount: Float!
    products: [Product!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type ProductOrder {
    _id: ID!
    product_id: ID!
    product: Product!
    order_id: ID!
    order: Order!
    quantity: Int!
    createdAt: Date!
    updatedAt: Date!
  }

  type Image {
    _id: ID!
    product_id: ID!
    product: Product!
    image_url: String!
    alt_text: String
    is_primary: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  enum OrderStatus {
    pending
    processing
    shipped
    delivered
    cancelled
  }

  # Input types for mutations
  input ProductInput {
    name: String!
    description: String!
    brand: String!
    inStock: Boolean
  }

  input CategoryInput {
    category_name: String!
    category_description: String!
  }

  input AttributeInput {
    attribute_name: String!
    attribute_description: String!
  }

  input SubAttributeInput {
    attribute_id: ID!
    subattribute_name: String!
    subattribute_description: String!
  }

  input CurrencyInput {
    currency_name: String!
    currency_symbol: String!
  }

  input PriceInput {
    price_currency_id: ID!
    price_value: Float!
  }

  input OrderInput {
    price_id: ID!
    status: OrderStatus
    total_amount: Float!
  }

  input ImageInput {
    product_id: ID!
    image_url: String!
    alt_text: String
    is_primary: Boolean
  }

  input ProductCategoryInput {
    product_id: ID!
    category_id: ID!
  }

  input ProductAttributeInput {
    product_id: ID!
    attribute_id: ID!
    subattribute_id: ID!
  }

  input ProductPriceInput {
    product_id: ID!
    price_id: ID!
  }

  input ProductOrderInput {
    product_id: ID!
    order_id: ID!
    quantity: Int!
  }

  # Queries
  type Query {
    # Product queries
    products: [Product!]!
    product(id: ID!): Product
    productsByCategory(categoryId: ID!): [Product!]!
    productsByBrand(brand: String!): [Product!]!
    productsInStock: [Product!]!

    # Category queries
    categories: [Category!]!
    category(id: ID!): Category

    # Attribute queries
    attributes: [Attribute!]!
    attribute(id: ID!): Attribute
    subattributes(attributeId: ID!): [SubAttribute!]!

    # Price queries
    prices: [Price!]!
    price(id: ID!): Price
    pricesByCurrency(currencyId: ID!): [Price!]!

    # Order queries
    orders: [Order!]!
    order(id: ID!): Order
    ordersByStatus(status: OrderStatus!): [Order!]!

    # Currency queries
    currencies: [Currency!]!
    currency(id: ID!): Currency

    # Image queries
    images: [Image!]!
    image(id: ID!): Image
    imagesByProduct(productId: ID!): [Image!]!
  }

  # Mutations
  type Mutation {
    # Product mutations
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Boolean!

    # Category mutations
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category!
    deleteCategory(id: ID!): Boolean!

    # Attribute mutations
    createAttribute(input: AttributeInput!): Attribute!
    updateAttribute(id: ID!, input: AttributeInput!): Attribute!
    deleteAttribute(id: ID!): Boolean!

    # SubAttribute mutations
    createSubAttribute(input: SubAttributeInput!): SubAttribute!
    updateSubAttribute(id: ID!, input: SubAttributeInput!): SubAttribute!
    deleteSubAttribute(id: ID!): Boolean!

    # Currency mutations
    createCurrency(input: CurrencyInput!): Currency!
    updateCurrency(id: ID!, input: CurrencyInput!): Currency!
    deleteCurrency(id: ID!): Boolean!

    # Price mutations
    createPrice(input: PriceInput!): Price!
    updatePrice(id: ID!, input: PriceInput!): Price!
    deletePrice(id: ID!): Boolean!

    # Order mutations
    createOrder(input: OrderInput!): Order!
    updateOrder(id: ID!, input: OrderInput!): Order!
    deleteOrder(id: ID!): Boolean!

    # Image mutations
    createImage(input: ImageInput!): Image!
    updateImage(id: ID!, input: ImageInput!): Image!
    deleteImage(id: ID!): Boolean!

    # Relationship mutations
    addProductToCategory(input: ProductCategoryInput!): ProductCategory!
    removeProductFromCategory(input: ProductCategoryInput!): Boolean!

    addAttributeToProduct(input: ProductAttributeInput!): ProductAttribute!
    removeAttributeFromProduct(input: ProductAttributeInput!): Boolean!

    addPriceToProduct(input: ProductPriceInput!): ProductPrice!
    removePriceFromProduct(input: ProductPriceInput!): Boolean!

    addProductToOrder(input: ProductOrderInput!): ProductOrder!
    removeProductFromOrder(input: ProductOrderInput!): Boolean!
  }
`;

module.exports = typeDefs;
