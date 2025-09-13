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
      category_description: 'Electronic devices, smartphones, laptops, and tech gadgets'
    });

    const clothing = await Category.create({
      category_name: 'Clothing & Fashion',
      category_description: 'Fashion, apparel, shoes, and accessories'
    });

    const home = await Category.create({
      category_name: 'Home & Kitchen',
      category_description: 'Home appliances, kitchen tools, and home improvement'
    });

    const sports = await Category.create({
      category_name: 'Sports & Outdoors',
      category_description: 'Outdoor gear, sports equipment, and adventure supplies'
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
      // Electronics
      {
        name: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced camera system and A17 Pro chip. Features titanium design, Pro camera system, and A17 Pro chip for incredible performance.',
        brand: 'Apple',
        inStock: true
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android smartphone with AI features, S Pen, and 200MP camera. Built for productivity and creativity.',
        brand: 'Samsung',
        inStock: true
      },
      {
        name: 'MacBook Pro 16-inch',
        description: 'Powerful laptop with M3 Pro chip, Liquid Retina XDR display, and all-day battery life. Perfect for professionals.',
        brand: 'Apple',
        inStock: true
      },
      {
        name: 'Sony WH-1000XM5 Headphones',
        description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life and crystal clear hands-free calling.',
        brand: 'Sony',
        inStock: true
      },
      {
        name: 'iPad Air 5th Gen',
        description: 'Powerful tablet with M1 chip, 10.9-inch Liquid Retina display, and Apple Pencil support.',
        brand: 'Apple',
        inStock: true
      },
      {
        name: 'Dell XPS 13 Laptop',
        description: 'Ultra-thin laptop with 13th Gen Intel Core processor, stunning InfinityEdge display, and premium design.',
        brand: 'Dell',
        inStock: true
      },
      {
        name: 'Samsung 55" QLED 4K TV',
        description: 'Smart TV with Quantum Dot technology, HDR10+, and built-in Alexa. Perfect for entertainment.',
        brand: 'Samsung',
        inStock: true
      },
      {
        name: 'Nintendo Switch OLED',
        description: 'Gaming console with 7-inch OLED screen, 64GB internal storage, and Joy-Con controllers.',
        brand: 'Nintendo',
        inStock: false
      },

      // Clothing & Fashion
      {
        name: 'Nike Air Max 270',
        description: 'Comfortable running shoes with Max Air cushioning and breathable mesh upper. Perfect for daily wear.',
        brand: 'Nike',
        inStock: true
      },
      {
        name: 'Adidas Ultraboost 22',
        description: 'High-performance running shoes with Boost technology and Primeknit+ upper for ultimate comfort.',
        brand: 'Adidas',
        inStock: true
      },
      {
        name: 'Levi\'s 501 Original Jeans',
        description: 'Classic straight-fit jeans made from 100% cotton denim. The original blue jean that started it all.',
        brand: 'Levi\'s',
        inStock: true
      },
      {
        name: 'Champion Reverse Weave Hoodie',
        description: 'Premium heavyweight hoodie with reverse weave construction to prevent shrinking and maintain shape.',
        brand: 'Champion',
        inStock: true
      },
      {
        name: 'Vans Old Skool Sneakers',
        description: 'Classic skate shoes with suede and canvas upper, padded collar, and signature side stripe.',
        brand: 'Vans',
        inStock: true
      },
      {
        name: 'Patagonia Better Sweater Fleece',
        description: 'Sustainable fleece jacket made from recycled polyester. Warm, comfortable, and environmentally conscious.',
        brand: 'Patagonia',
        inStock: true
      },
      {
        name: 'Converse Chuck Taylor All Star',
        description: 'Iconic canvas sneakers with rubber toe cap and vulcanized sole. A timeless classic.',
        brand: 'Converse',
        inStock: true
      },
      {
        name: 'North Face Denali Jacket',
        description: 'Fleece jacket with Polartec 300 series fleece, full-zip design, and zippered chest pocket.',
        brand: 'The North Face',
        inStock: false
      },

      // Home & Kitchen
      {
        name: 'KitchenAid Stand Mixer',
        description: 'Professional stand mixer with 5-quart stainless steel bowl, 10 speeds, and multiple attachments.',
        brand: 'KitchenAid',
        inStock: true
      },
      {
        name: 'Dyson V15 Detect Vacuum',
        description: 'Cordless vacuum with laser dust detection, 60-minute runtime, and advanced filtration system.',
        brand: 'Dyson',
        inStock: true
      },
      {
        name: 'Instant Pot Duo 7-in-1',
        description: 'Electric pressure cooker that replaces 7 kitchen appliances. Cooks 70% faster than conventional methods.',
        brand: 'Instant Pot',
        inStock: true
      },
      {
        name: 'Cuisinart Coffee Maker',
        description: 'Programmable coffee maker with 12-cup capacity, auto shut-off, and permanent gold-tone filter.',
        brand: 'Cuisinart',
        inStock: true
      },
      {
        name: 'Vitamix A3500 Blender',
        description: 'Professional-grade blender with 64-ounce container, 5 programs, and wireless connectivity.',
        brand: 'Vitamix',
        inStock: true
      },
      {
        name: 'Lodge Cast Iron Skillet',
        description: 'Pre-seasoned cast iron skillet perfect for searing, baking, and frying. Heats evenly and retains heat.',
        brand: 'Lodge',
        inStock: true
      },
      {
        name: 'Breville Smart Oven Air Fryer',
        description: 'Convection oven with air fry, bake, broil, and toast functions. 13 cooking functions in one appliance.',
        brand: 'Breville',
        inStock: true
      },
      {
        name: 'OXO Good Grips Can Opener',
        description: 'Ergonomic can opener with soft, non-slip handles and smooth cutting action. Easy to use and clean.',
        brand: 'OXO',
        inStock: false
      },

      // Sports & Outdoors
      {
        name: 'Yeti Rambler Tumbler',
        description: 'Insulated tumbler that keeps drinks cold for hours. Double-wall vacuum insulation and no-sweat design.',
        brand: 'Yeti',
        inStock: true
      },
      {
        name: 'Coleman Sundome Tent',
        description: '4-person dome tent with WeatherTec system, easy setup, and large windows for ventilation.',
        brand: 'Coleman',
        inStock: true
      },
      {
        name: 'Hydro Flask Water Bottle',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
        brand: 'Hydro Flask',
        inStock: true
      },
      {
        name: 'REI Co-op Half Dome Tent',
        description: 'Lightweight 2-person tent with easy setup, great ventilation, and durable construction.',
        brand: 'REI Co-op',
        inStock: true
      },
      {
        name: 'Black Diamond Headlamp',
        description: 'Bright LED headlamp with multiple lighting modes, comfortable headband, and long battery life.',
        brand: 'Black Diamond',
        inStock: true
      },
      {
        name: 'CamelBak Hydration Pack',
        description: 'Hydration backpack with 3L reservoir, multiple pockets, and comfortable shoulder straps.',
        brand: 'CamelBak',
        inStock: true
      },
      {
        name: 'Therm-a-Rest Sleeping Pad',
        description: 'Lightweight sleeping pad with self-inflating technology and R-value of 4.2 for warmth.',
        brand: 'Therm-a-Rest',
        inStock: true
      },
      {
        name: 'MSR PocketRocket Stove',
        description: 'Compact backpacking stove that boils water in 3.5 minutes. Lightweight and reliable.',
        brand: 'MSR',
        inStock: false
      }
    ]);

    console.log('📱 Created products');

    // Create prices
    const prices = await Price.create([
      // Electronics prices
      { price_currency_id: usd._id, price_value: 999.99 },  // iPhone 15 Pro
      { price_currency_id: usd._id, price_value: 1199.99 }, // Samsung Galaxy S24 Ultra
      { price_currency_id: usd._id, price_value: 2499.99 }, // MacBook Pro 16-inch
      { price_currency_id: usd._id, price_value: 399.99 },  // Sony WH-1000XM5
      { price_currency_id: usd._id, price_value: 599.99 },  // iPad Air 5th Gen
      { price_currency_id: usd._id, price_value: 1299.99 }, // Dell XPS 13
      { price_currency_id: usd._id, price_value: 899.99 },  // Samsung 55" QLED TV
      { price_currency_id: usd._id, price_value: 349.99 },  // Nintendo Switch OLED
      
      // Clothing prices
      { price_currency_id: usd._id, price_value: 150.00 },  // Nike Air Max 270
      { price_currency_id: usd._id, price_value: 180.00 },  // Adidas Ultraboost 22
      { price_currency_id: usd._id, price_value: 98.00 },   // Levi's 501 Jeans
      { price_currency_id: usd._id, price_value: 65.00 },   // Champion Hoodie
      { price_currency_id: usd._id, price_value: 70.00 },   // Vans Old Skool
      { price_currency_id: usd._id, price_value: 89.00 },   // Patagonia Fleece
      { price_currency_id: usd._id, price_value: 55.00 },   // Converse Chuck Taylor
      { price_currency_id: usd._id, price_value: 120.00 },  // North Face Denali
      
      // Home & Kitchen prices
      { price_currency_id: usd._id, price_value: 329.99 },  // KitchenAid Mixer
      { price_currency_id: usd._id, price_value: 749.99 },  // Dyson V15 Vacuum
      { price_currency_id: usd._id, price_value: 99.99 },   // Instant Pot Duo
      { price_currency_id: usd._id, price_value: 89.99 },   // Cuisinart Coffee Maker
      { price_currency_id: usd._id, price_value: 549.99 },  // Vitamix A3500
      { price_currency_id: usd._id, price_value: 29.99 },   // Lodge Cast Iron
      { price_currency_id: usd._id, price_value: 399.99 },  // Breville Smart Oven
      { price_currency_id: usd._id, price_value: 19.99 },   // OXO Can Opener
      
      // Sports & Outdoors prices
      { price_currency_id: usd._id, price_value: 35.00 },   // Yeti Rambler
      { price_currency_id: usd._id, price_value: 79.99 },   // Coleman Sundome Tent
      { price_currency_id: usd._id, price_value: 42.00 },   // Hydro Flask
      { price_currency_id: usd._id, price_value: 199.99 },  // REI Half Dome Tent
      { price_currency_id: usd._id, price_value: 39.95 },   // Black Diamond Headlamp
      { price_currency_id: usd._id, price_value: 89.99 },   // CamelBak Hydration Pack
      { price_currency_id: usd._id, price_value: 199.95 },  // Therm-a-Rest Sleeping Pad
      { price_currency_id: usd._id, price_value: 44.95 },   // MSR PocketRocket
      
      // Euro prices for some items
      { price_currency_id: eur._id, price_value: 899.99 },  // iPhone 15 Pro EUR
      { price_currency_id: eur._id, price_value: 1099.99 }, // Samsung Galaxy S24 Ultra EUR
      { price_currency_id: eur._id, price_value: 2299.99 }, // MacBook Pro 16-inch EUR
      { price_currency_id: eur._id, price_value: 359.99 },  // Sony WH-1000XM5 EUR
      { price_currency_id: eur._id, price_value: 549.99 }   // iPad Air 5th Gen EUR
    ]);

    console.log('💵 Created prices');

    // Create product-category relationships
    await ProductCategory.create([
      // Electronics (0-7)
      { product_id: products[0]._id, category_id: electronics._id },  // iPhone 15 Pro
      { product_id: products[1]._id, category_id: electronics._id },  // Samsung Galaxy S24 Ultra
      { product_id: products[2]._id, category_id: electronics._id },  // MacBook Pro 16-inch
      { product_id: products[3]._id, category_id: electronics._id },  // Sony WH-1000XM5
      { product_id: products[4]._id, category_id: electronics._id },  // iPad Air 5th Gen
      { product_id: products[5]._id, category_id: electronics._id },  // Dell XPS 13
      { product_id: products[6]._id, category_id: electronics._id },  // Samsung 55" QLED TV
      { product_id: products[7]._id, category_id: electronics._id },  // Nintendo Switch OLED
      
      // Clothing & Fashion (8-15)
      { product_id: products[8]._id, category_id: clothing._id },     // Nike Air Max 270
      { product_id: products[9]._id, category_id: clothing._id },     // Adidas Ultraboost 22
      { product_id: products[10]._id, category_id: clothing._id },    // Levi's 501 Jeans
      { product_id: products[11]._id, category_id: clothing._id },    // Champion Hoodie
      { product_id: products[12]._id, category_id: clothing._id },    // Vans Old Skool
      { product_id: products[13]._id, category_id: clothing._id },    // Patagonia Fleece
      { product_id: products[14]._id, category_id: clothing._id },    // Converse Chuck Taylor
      { product_id: products[15]._id, category_id: clothing._id },    // North Face Denali
      
      // Home & Kitchen (16-23)
      { product_id: products[16]._id, category_id: home._id },        // KitchenAid Mixer
      { product_id: products[17]._id, category_id: home._id },        // Dyson V15 Vacuum
      { product_id: products[18]._id, category_id: home._id },        // Instant Pot Duo
      { product_id: products[19]._id, category_id: home._id },        // Cuisinart Coffee Maker
      { product_id: products[20]._id, category_id: home._id },        // Vitamix A3500
      { product_id: products[21]._id, category_id: home._id },        // Lodge Cast Iron
      { product_id: products[22]._id, category_id: home._id },        // Breville Smart Oven
      { product_id: products[23]._id, category_id: home._id },        // OXO Can Opener
      
      // Sports & Outdoors (24-31)
      { product_id: products[24]._id, category_id: sports._id },      // Yeti Rambler
      { product_id: products[25]._id, category_id: sports._id },      // Coleman Sundome Tent
      { product_id: products[26]._id, category_id: sports._id },      // Hydro Flask
      { product_id: products[27]._id, category_id: sports._id },      // REI Half Dome Tent
      { product_id: products[28]._id, category_id: sports._id },      // Black Diamond Headlamp
      { product_id: products[29]._id, category_id: sports._id },      // CamelBak Hydration Pack
      { product_id: products[30]._id, category_id: sports._id },      // Therm-a-Rest Sleeping Pad
      { product_id: products[31]._id, category_id: sports._id }       // MSR PocketRocket
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
      // Electronics with USD prices
      { product_id: products[0]._id, price_id: prices[0]._id },  // iPhone 15 Pro - $999.99
      { product_id: products[1]._id, price_id: prices[1]._id },  // Samsung Galaxy S24 Ultra - $1199.99
      { product_id: products[2]._id, price_id: prices[2]._id },  // MacBook Pro 16-inch - $2499.99
      { product_id: products[3]._id, price_id: prices[3]._id },  // Sony WH-1000XM5 - $399.99
      { product_id: products[4]._id, price_id: prices[4]._id },  // iPad Air 5th Gen - $599.99
      { product_id: products[5]._id, price_id: prices[5]._id },  // Dell XPS 13 - $1299.99
      { product_id: products[6]._id, price_id: prices[6]._id },  // Samsung 55" QLED TV - $899.99
      { product_id: products[7]._id, price_id: prices[7]._id },  // Nintendo Switch OLED - $349.99
      
      // Clothing with USD prices
      { product_id: products[8]._id, price_id: prices[8]._id },  // Nike Air Max 270 - $150.00
      { product_id: products[9]._id, price_id: prices[9]._id },  // Adidas Ultraboost 22 - $180.00
      { product_id: products[10]._id, price_id: prices[10]._id }, // Levi's 501 Jeans - $98.00
      { product_id: products[11]._id, price_id: prices[11]._id }, // Champion Hoodie - $65.00
      { product_id: products[12]._id, price_id: prices[12]._id }, // Vans Old Skool - $70.00
      { product_id: products[13]._id, price_id: prices[13]._id }, // Patagonia Fleece - $89.00
      { product_id: products[14]._id, price_id: prices[14]._id }, // Converse Chuck Taylor - $55.00
      { product_id: products[15]._id, price_id: prices[15]._id }, // North Face Denali - $120.00
      
      // Home & Kitchen with USD prices
      { product_id: products[16]._id, price_id: prices[16]._id }, // KitchenAid Mixer - $329.99
      { product_id: products[17]._id, price_id: prices[17]._id }, // Dyson V15 Vacuum - $749.99
      { product_id: products[18]._id, price_id: prices[18]._id }, // Instant Pot Duo - $99.99
      { product_id: products[19]._id, price_id: prices[19]._id }, // Cuisinart Coffee Maker - $89.99
      { product_id: products[20]._id, price_id: prices[20]._id }, // Vitamix A3500 - $549.99
      { product_id: products[21]._id, price_id: prices[21]._id }, // Lodge Cast Iron - $29.99
      { product_id: products[22]._id, price_id: prices[22]._id }, // Breville Smart Oven - $399.99
      { product_id: products[23]._id, price_id: prices[23]._id }, // OXO Can Opener - $19.99
      
      // Sports & Outdoors with USD prices
      { product_id: products[24]._id, price_id: prices[24]._id }, // Yeti Rambler - $35.00
      { product_id: products[25]._id, price_id: prices[25]._id }, // Coleman Sundome Tent - $79.99
      { product_id: products[26]._id, price_id: prices[26]._id }, // Hydro Flask - $42.00
      { product_id: products[27]._id, price_id: prices[27]._id }, // REI Half Dome Tent - $199.99
      { product_id: products[28]._id, price_id: prices[28]._id }, // Black Diamond Headlamp - $39.95
      { product_id: products[29]._id, price_id: prices[29]._id }, // CamelBak Hydration Pack - $89.99
      { product_id: products[30]._id, price_id: prices[30]._id }, // Therm-a-Rest Sleeping Pad - $199.95
      { product_id: products[31]._id, price_id: prices[31]._id }, // MSR PocketRocket - $44.95
      
      // Some products with EUR prices
      { product_id: products[0]._id, price_id: prices[32]._id },  // iPhone 15 Pro - €899.99
      { product_id: products[1]._id, price_id: prices[33]._id },  // Samsung Galaxy S24 Ultra - €1099.99
      { product_id: products[2]._id, price_id: prices[34]._id },  // MacBook Pro 16-inch - €2299.99
      { product_id: products[3]._id, price_id: prices[35]._id },  // Sony WH-1000XM5 - €359.99
      { product_id: products[4]._id, price_id: prices[36]._id }   // iPad Air 5th Gen - €549.99
    ]);

    console.log('💰 Created product-price relationships');

    // Create images with real product URLs
    await Image.create([
      // Electronics images
      { product_id: products[0]._id, image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1693009279823', alt_text: 'iPhone 15 Pro Natural Titanium', is_primary: true },
      { product_id: products[0]._id, image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-bluetitanium?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=1693009279823', alt_text: 'iPhone 15 Pro Blue Titanium', is_primary: false },
      
      { product_id: products[1]._id, image_url: 'https://images.samsung.com/us/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-design-titanium-black-mo.jpg', alt_text: 'Samsung Galaxy S24 Ultra Titanium Black', is_primary: true },
      { product_id: products[1]._id, image_url: 'https://images.samsung.com/us/smartphones/galaxy-s24-ultra/images/galaxy-s24-ultra-highlights-design-titanium-gray-mo.jpg', alt_text: 'Samsung Galaxy S24 Ultra Titanium Gray', is_primary: false },
      
      { product_id: products[2]._id, image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200', alt_text: 'MacBook Pro 16-inch Space Gray', is_primary: true },
      { product_id: products[2]._id, image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-silver-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697230830200', alt_text: 'MacBook Pro 16-inch Silver', is_primary: false },
      
      { product_id: products[3]._id, image_url: 'https://m.media-amazon.com/images/I/61SUj2aKoEL._AC_SL1500_.jpg', alt_text: 'Sony WH-1000XM5 Headphones', is_primary: true },
      { product_id: products[4]._id, image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=470&hei=556&fmt=p-jpg&qlt=95&.v=1645065732683', alt_text: 'iPad Air 5th Gen Blue', is_primary: true },
      { product_id: products[5]._id, image_url: 'https://i.dell.com/sites/csimages/Product_Imagery/en-us/dell-xps-13-9320-nt-pdp-module-1.jpg', alt_text: 'Dell XPS 13 Laptop', is_primary: true },
      { product_id: products[6]._id, image_url: 'https://images.samsung.com/us/tvs/qled-4k-q80c/gallery/01-q80c-qled-4k-smart-tv-2023-1.jpg', alt_text: 'Samsung 55" QLED 4K TV', is_primary: true },
      { product_id: products[7]._id, image_url: 'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg', alt_text: 'Nintendo Switch OLED Console', is_primary: true },
      
      // Clothing & Fashion images
      { product_id: products[8]._id, image_url: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-4aec-b89f-86f4974567f4/air-max-270-mens-shoes-KkLcGR.png', alt_text: 'Nike Air Max 270 Men\'s Shoes', is_primary: true },
      { product_id: products[9]._id, image_url: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fbaf991a78bc4896a3e9ad7800abcec6_9366/Ultraboost_22_Shoes_Black_GZ0127_01_standard.jpg', alt_text: 'Adidas Ultraboost 22 Shoes', is_primary: true },
      { product_id: products[10]._id, image_url: 'https://lsco.scene7.com/is/image/lsco/Levis/clothing/501-original-fit-jeans-mens-jeans-285010000-front.jpg', alt_text: 'Levi\'s 501 Original Jeans', is_primary: true },
      { product_id: products[11]._id, image_url: 'https://images.champion.com/is/image/Champion/ecb00000000000_001?$pdp_hero_desktop$', alt_text: 'Champion Reverse Weave Hoodie', is_primary: true },
      { product_id: products[12]._id, image_url: 'https://images.vans.com/is/image/Vans/D3HY28-HERO?$583x583$', alt_text: 'Vans Old Skool Sneakers', is_primary: true },
      { product_id: products[13]._id, image_url: 'https://www.patagonia.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-patagonia-master/default/dw8b8b8b8b/images/hi-res/25520_NENA_ZZ_1.jpg', alt_text: 'Patagonia Better Sweater Fleece', is_primary: true },
      { product_id: products[14]._id, image_url: 'https://www.converse.com/dw/image/v2/BCZC_PRD/on/demandware.static/-/Sites-cnv-master-catalog/default/dw8b8b8b8b/images/hi-res/162050C_001_H.png', alt_text: 'Converse Chuck Taylor All Star', is_primary: true },
      { product_id: products[15]._id, image_url: 'https://www.thenorthface.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-tnf-master-catalog/default/dw8b8b8b8b/images/hi-res/NF0A2R5J_2A1_hero.jpg', alt_text: 'North Face Denali Jacket', is_primary: true },
      
      // Home & Kitchen images
      { product_id: products[16]._id, image_url: 'https://www.kitchenaid.com/content/dam/kitchenaid/countertop-appliances/stand-mixers/ksm150pser/ksm150pser_hero_1.jpg', alt_text: 'KitchenAid Stand Mixer', is_primary: true },
      { product_id: products[17]._id, image_url: 'https://dyson-h.assetsd2c.com/is/image/dysonprod/dyson-v15-detect-cordless-vacuum-hero', alt_text: 'Dyson V15 Detect Vacuum', is_primary: true },
      { product_id: products[18]._id, image_url: 'https://www.instantpot.com/wp-content/uploads/2021/05/duo-7-in-1-6qt-1.jpg', alt_text: 'Instant Pot Duo 7-in-1', is_primary: true },
      { product_id: products[19]._id, image_url: 'https://www.cuisinart.com/images/products/dcc-3200_1.jpg', alt_text: 'Cuisinart Coffee Maker', is_primary: true },
      { product_id: products[20]._id, image_url: 'https://www.vitamix.com/media/resource/images/Ascent-Series-A3500-Blender-1.jpg', alt_text: 'Vitamix A3500 Blender', is_primary: true },
      { product_id: products[21]._id, image_url: 'https://www.lodgemfg.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-lodge-master-catalog/default/dw8b8b8b8b/images/hi-res/L8SK3_1.jpg', alt_text: 'Lodge Cast Iron Skillet', is_primary: true },
      { product_id: products[22]._id, image_url: 'https://www.breville.com/us/en/products/ovens/bov900.html', alt_text: 'Breville Smart Oven Air Fryer', is_primary: true },
      { product_id: products[23]._id, image_url: 'https://www.oxo.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-oxo-master-catalog/default/dw8b8b8b8b/images/hi-res/1011770_1.jpg', alt_text: 'OXO Good Grips Can Opener', is_primary: true },
      
      // Sports & Outdoors images
      { product_id: products[24]._id, image_url: 'https://www.yeti.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-yeti-master-catalog/default/dw8b8b8b8b/images/hi-res/rambler-20-oz-tumbler-stainless-steel-1.jpg', alt_text: 'Yeti Rambler Tumbler', is_primary: true },
      { product_id: products[25]._id, image_url: 'https://www.coleman.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-coleman-master-catalog/default/dw8b8b8b8b/images/hi-res/sundome-4-person-tent-1.jpg', alt_text: 'Coleman Sundome Tent', is_primary: true },
      { product_id: products[26]._id, image_url: 'https://www.hydroflask.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-hydroflask-master-catalog/default/dw8b8b8b8b/images/hi-res/water-bottle-32-oz-wide-mouth-1.jpg', alt_text: 'Hydro Flask Water Bottle', is_primary: true },
      { product_id: products[27]._id, image_url: 'https://www.rei.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-rei-master-catalog/default/dw8b8b8b8b/images/hi-res/half-dome-2-plus-tent-1.jpg', alt_text: 'REI Co-op Half Dome Tent', is_primary: true },
      { product_id: products[28]._id, image_url: 'https://www.blackdiamondequipment.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-bde-master-catalog/default/dw8b8b8b8b/images/hi-res/spot-400-headlamp-1.jpg', alt_text: 'Black Diamond Headlamp', is_primary: true },
      { product_id: products[29]._id, image_url: 'https://www.camelbak.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-camelbak-master-catalog/default/dw8b8b8b8b/images/hi-res/mule-3l-hydration-pack-1.jpg', alt_text: 'CamelBak Hydration Pack', is_primary: true },
      { product_id: products[30]._id, image_url: 'https://www.thermarest.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-thermarest-master-catalog/default/dw8b8b8b8b/images/hi-res/neoair-xlite-sleeping-pad-1.jpg', alt_text: 'Therm-a-Rest Sleeping Pad', is_primary: true },
      { product_id: products[31]._id, image_url: 'https://www.msrgear.com/dw/image/v2/BDJB_PRD/on/demandware.static/-/Sites-msr-master-catalog/default/dw8b8b8b8b/images/hi-res/pocketrocket-2-stove-1.jpg', alt_text: 'MSR PocketRocket Stove', is_primary: true }
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
