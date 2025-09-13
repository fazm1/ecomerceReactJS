# E-commerce Backend

A comprehensive e-commerce backend built with Node.js, Express, GraphQL, and MongoDB. This API provides full CRUD operations for products, categories, attributes, orders, and more.

## Features

- **GraphQL API** with Apollo Server
- **MongoDB** with Mongoose ODM
- **Complete E-commerce Schema** based on ERD
- **Input Validation** and Error Handling
- **Sample Data Seeding**
- **Relationship Management** between entities

## Database Schema

The API implements a comprehensive e-commerce schema with the following entities:

- **Products** - Core product information
- **Categories** - Product categorization
- **Attributes & SubAttributes** - Product specifications (color, size, material, etc.)
- **Prices & Currencies** - Multi-currency pricing
- **Orders** - Order management
- **Images** - Product images
- **Relationships** - Many-to-many relationships between entities

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecomerceReactJS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your MongoDB connection string:
   ```
   MONGO_URI=mongodb://localhost:27017/ecommerce_db
   PORT=4000
   NODE_ENV=development
   ```

4. **Seed the database with sample data**
   ```bash
   npm run seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The GraphQL playground will be available at `http://localhost:4000/graphql`

## API Usage

### GraphQL Queries

#### Get All Products with Categories and Prices
```graphql
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
  }
}
```

#### Get Products by Category
```graphql
query GetProductsByCategory($categoryId: ID!) {
  productsByCategory(categoryId: $categoryId) {
    _id
    name
    description
    brand
    inStock
  }
}
```

#### Get Products with Attributes
```graphql
query GetProductsWithAttributes {
  products {
    _id
    name
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
```

### GraphQL Mutations

#### Create a New Product
```graphql
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    _id
    name
    description
    brand
    inStock
  }
}
```

Variables:
```json
{
  "input": {
    "name": "MacBook Pro 16\"",
    "description": "Powerful laptop for professionals",
    "brand": "Apple",
    "inStock": true
  }
}
```

#### Add Product to Category
```graphql
mutation AddProductToCategory($input: ProductCategoryInput!) {
  addProductToCategory(input: $input) {
    _id
    product_id
    category_id
  }
}
```

#### Create Order
```graphql
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
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm run seed` - Seed the database with sample data

## API Endpoints

- **GraphQL Playground**: `http://localhost:4000/graphql`
- **GraphQL Endpoint**: `http://localhost:4000/graphql`

## Database Models

### Core Models
- `Product` - Product information
- `Category` - Product categories
- `Attribute` - Product attributes (color, size, etc.)
- `SubAttribute` - Specific attribute values
- `Currency` - Supported currencies
- `Price` - Product pricing
- `Order` - Customer orders
- `Image` - Product images

### Relationship Models
- `ProductCategory` - Product-Category relationships
- `ProductAttribute` - Product-Attribute relationships
- `ProductPrice` - Product-Price relationships
- `ProductOrder` - Product-Order relationships

## Error Handling

The API includes comprehensive error handling with specific error types:

- `VALIDATION_ERROR` - Input validation errors
- `NOT_FOUND` - Resource not found
- `DUPLICATE_ERROR` - Duplicate resource creation
- `DATABASE_ERROR` - Database operation errors

## Sample Data

The seeding script creates:
- 5 sample products (iPhone, Samsung, Nike shoes, Adidas shoes, Coffee maker)
- 3 categories (Electronics, Clothing, Home & Garden)
- 3 attributes (Color, Size, Material) with subattributes
- 2 currencies (USD, EUR)
- Multiple prices and relationships
- Sample orders and images

## Development

### Project Structure
```
├── models/           # MongoDB models
├── graphql/          # GraphQL schema and resolvers
├── middlewares/      # Validation and error handling
├── scripts/          # Database seeding
├── index.js          # Main server file
└── package.json      # Dependencies and scripts
```

### Adding New Features

1. **Create Model** - Add new model in `models/` directory
2. **Update Schema** - Add types to `graphql/typeDefs.js`
3. **Add Resolvers** - Implement resolvers in `graphql/resolvers.js`
4. **Add Validation** - Create validation functions in `middlewares/validation.js`


# E-commerce Frontend

A modern, responsive e-commerce frontend built with React and GraphQL Apollo Client.

## Features

- 🛍️ **Product Catalog** - Browse products with filtering by category and stock status
- 🔍 **Product Details** - Detailed product view with attributes and specifications
- 🛒 **Shopping Cart** - Add/remove items, update quantities
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Clean, professional design with CSS3
- ⚡ **GraphQL Integration** - Efficient data fetching with Apollo Client

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- The backend GraphQL API running on `http://localhost:4000`

### Installation

1. **Navigate to the client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Project Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── apollo/
│   │   └── client.js          # Apollo Client configuration
│   ├── components/
│   │   ├── Header.js          # Navigation header
│   │   ├── ProductList.js     # Product grid with filters
│   │   ├── ProductCard.js     # Individual product card
│   │   ├── ProductDetail.js   # Product detail view
│   │   └── Cart.js            # Shopping cart
│   ├── graphql/
│   │   ├── queries.js         # GraphQL queries
│   │   └── mutations.js       # GraphQL mutations
│   ├── App.js                 # Main app component
│   ├── App.css                # App-specific styles
│   ├── index.js               # React entry point
│   └── index.css              # Global styles
└── package.json
```

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Features Overview

### Product Catalog
- Grid layout with product cards
- Filter by category
- Show only in-stock items
- Product images with fallbacks
- Product attributes display

### Product Details
- Full product information
- Image gallery
- Attribute specifications
- Add to cart functionality
- Stock status

### Shopping Cart
- Add/remove items
- Update quantities
- Real-time total calculation
- Responsive design
- Empty cart state

## GraphQL Integration

The app uses Apollo Client to communicate with the GraphQL backend:

- **Queries**: Fetch products, categories, and product details
- **Mutations**: Create orders, manage product relationships
- **Caching**: Automatic caching for better performance
- **Error Handling**: Graceful error states

## Styling

- **CSS3** with modern features
- **Flexbox** and **Grid** layouts
- **Responsive design** for all screen sizes
- **Custom properties** for consistent theming
- **Smooth animations** and transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Adding New Features

1. **New Components**: Add to `src/components/`
2. **GraphQL Operations**: Add to `src/graphql/`
3. **Styling**: Update CSS files
4. **State Management**: Use React hooks

### Code Structure

- **Functional Components** with React hooks
- **Apollo Client** for GraphQL operations
- **CSS Modules** for component styling
- **Responsive design** patterns

## Troubleshooting

### Common Issues

1. **GraphQL Connection Error**
   - Ensure backend is running on port 4000
   - Check CORS settings

2. **Images Not Loading**
   - Check image URLs in the database
   - Verify fallback images are working

3. **Styling Issues**
   - Clear browser cache
   - Check CSS file imports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License
=
