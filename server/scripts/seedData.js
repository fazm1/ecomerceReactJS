require('dotenv').config();
const mongoose = require('mongoose');

// Import models
const Product = require('../models/Product');
const Category = require('../models/Category');
const ProductCategory = require('../models/ProductCategory');
const Attribute = require('../models/Attribute');
const SubAttribute = require('../models/SubAttribute');
const ProductAttribute = require('../models/ProductAttribute');
const Currency = require('../models/Currency');
const Price = require('../models/Price');
const ProductPrice = require('../models/ProductPrice');
const Order = require('../models/Order');
const ProductOrder = require('../models/ProductOrder');
const Image = require('../models/Image');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('🟢 Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      ProductCategory.deleteMany({}),
      Attribute.deleteMany({}),
      SubAttribute.deleteMany({}),
      ProductAttribute.deleteMany({}),
      Currency.deleteMany({}),
      Price.deleteMany({}),
      ProductPrice.deleteMany({}),
      Order.deleteMany({}),
      ProductOrder.deleteMany({}),
      Image.deleteMany({})
    ]);

    console.log('🗑️ Cleared existing data');

    // Create currencies
    const usd = await Currency.create({
      currency_name: 'US Dollar',
      currency_symbol: '$'
    });

    const eur = await Currency.create({
      currency_name: 'Euro',
      currency_symbol: '€'
    });

    console.log('💰 Created currencies');

    // Create categories
    const electronics = await Category.create({
      category_name: 'Electronics',
      category_description: 'Electronic devices and gadgets'
    });

    const clothing = await Category.create({
      category_name: 'Clothing',
      category_description: 'Fashion and apparel'
    });

    const home = await Category.create({
      category_name: 'Home & Garden',
      category_description: 'Home improvement and garden supplies'
    });

    console.log('📂 Created categories');

    // Create attributes
    const color = await Attribute.create({
      attribute_name: 'Color',
      attribute_description: 'Product color options'
    });

    const size = await Attribute.create({
      attribute_name: 'Size',
      attribute_description: 'Product size options'
    });

    const material = await Attribute.create({
      attribute_name: 'Material',
      attribute_description: 'Product material composition'
    });

    console.log('🏷️ Created attributes');

    // Create subattributes
    const colorSubs = await SubAttribute.create([
      { attribute_id: color._id, subattribute_name: 'Red', subattribute_description: 'Red color' },
      { attribute_id: color._id, subattribute_name: 'Blue', subattribute_description: 'Blue color' },
      { attribute_id: color._id, subattribute_name: 'Black', subattribute_description: 'Black color' },
      { attribute_id: color._id, subattribute_name: 'White', subattribute_description: 'White color' }
    ]);

    const sizeSubs = await SubAttribute.create([
      { attribute_id: size._id, subattribute_name: 'Small', subattribute_description: 'Small size' },
      { attribute_id: size._id, subattribute_name: 'Medium', subattribute_description: 'Medium size' },
      { attribute_id: size._id, subattribute_name: 'Large', subattribute_description: 'Large size' },
      { attribute_id: size._id, subattribute_name: 'XL', subattribute_description: 'Extra Large size' }
    ]);

    const materialSubs = await SubAttribute.create([
      { attribute_id: material._id, subattribute_name: 'Cotton', subattribute_description: '100% Cotton' },
      { attribute_id: material._id, subattribute_name: 'Polyester', subattribute_description: 'Polyester blend' },
      { attribute_id: material._id, subattribute_name: 'Metal', subattribute_description: 'Metal construction' },
      { attribute_id: material._id, subattribute_name: 'Plastic', subattribute_description: 'Plastic material' }
    ]);

    console.log('🔧 Created subattributes');

    // Create products
    const products = await Product.create([
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip',
        brand: 'Apple',
        inStock: true
      },
      {
        name: 'Samsung Galaxy S24',
        description: 'Premium Android smartphone with AI features',
        brand: 'Samsung',
        inStock: true
      },
      {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Max Air cushioning',
        brand: 'Nike',
        inStock: true
      },
      {
        name: 'Adidas Ultraboost 22',
        description: 'High-performance running shoes with Boost technology',
        brand: 'Adidas',
        inStock: false
      },
      {
        name: 'Coffee Maker Deluxe',
        description: 'Programmable coffee maker with 12-cup capacity',
        brand: 'KitchenAid',
        inStock: true
      }
    ]);

    console.log('📱 Created products');

    // Create prices
    const prices = await Price.create([
      { price_currency_id: usd._id, price_value: 999.99 },
      { price_currency_id: usd._id, price_value: 899.99 },
      { price_currency_id: usd._id, price_value: 150.00 },
      { price_currency_id: usd._id, price_value: 180.00 },
      { price_currency_id: usd._id, price_value: 89.99 },
      { price_currency_id: eur._id, price_value: 899.99 },
      { price_currency_id: eur._id, price_value: 799.99 }
    ]);

    console.log('💵 Created prices');

    // Create product-category relationships
    await ProductCategory.create([
      { product_id: products[0]._id, category_id: electronics._id },
      { product_id: products[1]._id, category_id: electronics._id },
      { product_id: products[2]._id, category_id: clothing._id },
      { product_id: products[3]._id, category_id: clothing._id },
      { product_id: products[4]._id, category_id: home._id }
    ]);

    console.log('🔗 Created product-category relationships');

    // Create product-attribute relationships
    await ProductAttribute.create([
      { product_id: products[0]._id, attribute_id: color._id, subattribute_id: colorSubs[2]._id }, // iPhone - Black
      { product_id: products[0]._id, attribute_id: color._id, subattribute_id: colorSubs[3]._id }, // iPhone - White
      { product_id: products[1]._id, attribute_id: color._id, subattribute_id: colorSubs[0]._id }, // Samsung - Red
      { product_id: products[1]._id, attribute_id: color._id, subattribute_id: colorSubs[1]._id }, // Samsung - Blue
      { product_id: products[2]._id, attribute_id: size._id, subattribute_id: sizeSubs[1]._id }, // Nike - Medium
      { product_id: products[2]._id, attribute_id: size._id, subattribute_id: sizeSubs[2]._id }, // Nike - Large
      { product_id: products[2]._id, attribute_id: material._id, subattribute_id: materialSubs[1]._id }, // Nike - Polyester
      { product_id: products[3]._id, attribute_id: size._id, subattribute_id: sizeSubs[0]._id }, // Adidas - Small
      { product_id: products[3]._id, attribute_id: size._id, subattribute_id: sizeSubs[1]._id }, // Adidas - Medium
      { product_id: products[4]._id, attribute_id: color._id, subattribute_id: colorSubs[3]._id }, // Coffee Maker - White
      { product_id: products[4]._id, attribute_id: material._id, subattribute_id: materialSubs[3]._id } // Coffee Maker - Plastic
    ]);

    console.log('🏷️ Created product-attribute relationships');

    // Create product-price relationships
    await ProductPrice.create([
      { product_id: products[0]._id, price_id: prices[0]._id }, // iPhone - $999.99
      { product_id: products[0]._id, price_id: prices[5]._id }, // iPhone - €899.99
      { product_id: products[1]._id, price_id: prices[1]._id }, // Samsung - $899.99
      { product_id: products[1]._id, price_id: prices[6]._id }, // Samsung - €799.99
      { product_id: products[2]._id, price_id: prices[2]._id }, // Nike - $150.00
      { product_id: products[3]._id, price_id: prices[3]._id }, // Adidas - $180.00
      { product_id: products[4]._id, price_id: prices[4]._id }  // Coffee Maker - $89.99
    ]);

    console.log('💰 Created product-price relationships');

    // Create images
    await Image.create([
      { product_id: products[0]._id, image_url: 'https://example.com/iphone15pro.jpg', alt_text: 'iPhone 15 Pro', is_primary: true },
      { product_id: products[0]._id, image_url: 'https://example.com/iphone15pro-back.jpg', alt_text: 'iPhone 15 Pro back view', is_primary: false },
      { product_id: products[1]._id, image_url: 'https://example.com/galaxy-s24.jpg', alt_text: 'Samsung Galaxy S24', is_primary: true },
      { product_id: products[2]._id, image_url: 'https://example.com/nike-airmax270.jpg', alt_text: 'Nike Air Max 270', is_primary: true },
      { product_id: products[3]._id, image_url: 'https://example.com/adidas-ultraboost22.jpg', alt_text: 'Adidas Ultraboost 22', is_primary: true },
      { product_id: products[4]._id, image_url: 'https://example.com/coffee-maker.jpg', alt_text: 'Coffee Maker Deluxe', is_primary: true }
    ]);

    console.log('🖼️ Created images');

    // Create orders
    const orders = await Order.create([
      { price_id: prices[0]._id, status: 'pending', total_amount: 999.99 },
      { price_id: prices[2]._id, status: 'processing', total_amount: 150.00 },
      { price_id: prices[4]._id, status: 'delivered', total_amount: 89.99 }
    ]);

    console.log('📦 Created orders');

    // Create product-order relationships
    await ProductOrder.create([
      { product_id: products[0]._id, order_id: orders[0]._id, quantity: 1 },
      { product_id: products[2]._id, order_id: orders[1]._id, quantity: 1 },
      { product_id: products[4]._id, order_id: orders[2]._id, quantity: 2 }
    ]);

    console.log('🛒 Created product-order relationships');

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`- ${products.length} products created`);
    console.log(`- ${(await Category.countDocuments())} categories created`);
    console.log(`- ${(await Attribute.countDocuments())} attributes created`);
    console.log(`- ${(await SubAttribute.countDocuments())} subattributes created`);
    console.log(`- ${(await Currency.countDocuments())} currencies created`);
    console.log(`- ${(await Price.countDocuments())} prices created`);
    console.log(`- ${(await Order.countDocuments())} orders created`);
    console.log(`- ${(await Image.countDocuments())} images created`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
};

// Run the seed function
seedData();
