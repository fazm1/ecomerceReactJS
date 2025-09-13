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

const resolvers = {
  Date: {
    serialize: (date) => date.toISOString(),
    parseValue: (date) => new Date(date),
    parseLiteral: (ast) => new Date(ast.value)
  },

  Query: {
    // Product queries
    products: async () => {
      try {
        return await Product.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error('Failed to fetch products');
      }
    },

    product: async (_, { id }) => {
      try {
        return await Product.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch product');
      }
    },

    productsByCategory: async (_, { categoryId }) => {
      try {
        const productCategories = await ProductCategory.find({ category_id: categoryId })
          .populate('product_id');
        return productCategories.map(pc => pc.product_id);
      } catch (error) {
        throw new Error('Failed to fetch products by category');
      }
    },

    productsByBrand: async (_, { brand }) => {
      try {
        return await Product.find({ brand: new RegExp(brand, 'i') });
      } catch (error) {
        throw new Error('Failed to fetch products by brand');
      }
    },

    productsInStock: async () => {
      try {
        return await Product.find({ inStock: true });
      } catch (error) {
        throw new Error('Failed to fetch products in stock');
      }
    },

    // Category queries
    categories: async () => {
      try {
        return await Category.find().sort({ category_name: 1 });
      } catch (error) {
        throw new Error('Failed to fetch categories');
      }
    },

    category: async (_, { id }) => {
      try {
        return await Category.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch category');
      }
    },

    // Attribute queries
    attributes: async () => {
      try {
        return await Attribute.find().sort({ attribute_name: 1 });
      } catch (error) {
        throw new Error('Failed to fetch attributes');
      }
    },

    attribute: async (_, { id }) => {
      try {
        return await Attribute.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch attribute');
      }
    },

    subattributes: async (_, { attributeId }) => {
      try {
        return await SubAttribute.find({ attribute_id: attributeId });
      } catch (error) {
        throw new Error('Failed to fetch subattributes');
      }
    },

    // Price queries
    prices: async () => {
      try {
        return await Price.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error('Failed to fetch prices');
      }
    },

    price: async (_, { id }) => {
      try {
        return await Price.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch price');
      }
    },

    pricesByCurrency: async (_, { currencyId }) => {
      try {
        return await Price.find({ price_currency_id: currencyId });
      } catch (error) {
        throw new Error('Failed to fetch prices by currency');
      }
    },

    // Order queries
    orders: async () => {
      try {
        return await Order.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error('Failed to fetch orders');
      }
    },

    order: async (_, { id }) => {
      try {
        return await Order.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch order');
      }
    },

    ordersByStatus: async (_, { status }) => {
      try {
        return await Order.find({ status });
      } catch (error) {
        throw new Error('Failed to fetch orders by status');
      }
    },

    // Currency queries
    currencies: async () => {
      try {
        return await Currency.find().sort({ currency_name: 1 });
      } catch (error) {
        throw new Error('Failed to fetch currencies');
      }
    },

    currency: async (_, { id }) => {
      try {
        return await Currency.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch currency');
      }
    },

    // Image queries
    images: async () => {
      try {
        return await Image.find().sort({ createdAt: -1 });
      } catch (error) {
        throw new Error('Failed to fetch images');
      }
    },

    image: async (_, { id }) => {
      try {
        return await Image.findById(id);
      } catch (error) {
        throw new Error('Failed to fetch image');
      }
    },

    imagesByProduct: async (_, { productId }) => {
      try {
        return await Image.find({ product_id: productId });
      } catch (error) {
        throw new Error('Failed to fetch images by product');
      }
    }
  },

  Mutation: {
    // Product mutations
    createProduct: async (_, { input }) => {
      try {
        const product = new Product(input);
        return await product.save();
      } catch (error) {
        throw new Error('Failed to create product');
      }
    },

    updateProduct: async (_, { id, input }) => {
      try {
        return await Product.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update product');
      }
    },

    deleteProduct: async (_, { id }) => {
      try {
        await Product.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete product');
      }
    },

    // Category mutations
    createCategory: async (_, { input }) => {
      try {
        const category = new Category(input);
        return await category.save();
      } catch (error) {
        throw new Error('Failed to create category');
      }
    },

    updateCategory: async (_, { id, input }) => {
      try {
        return await Category.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update category');
      }
    },

    deleteCategory: async (_, { id }) => {
      try {
        await Category.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete category');
      }
    },

    // Attribute mutations
    createAttribute: async (_, { input }) => {
      try {
        const attribute = new Attribute(input);
        return await attribute.save();
      } catch (error) {
        throw new Error('Failed to create attribute');
      }
    },

    updateAttribute: async (_, { id, input }) => {
      try {
        return await Attribute.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update attribute');
      }
    },

    deleteAttribute: async (_, { id }) => {
      try {
        await Attribute.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete attribute');
      }
    },

    // SubAttribute mutations
    createSubAttribute: async (_, { input }) => {
      try {
        const subAttribute = new SubAttribute(input);
        return await subAttribute.save();
      } catch (error) {
        throw new Error('Failed to create subattribute');
      }
    },

    updateSubAttribute: async (_, { id, input }) => {
      try {
        return await SubAttribute.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update subattribute');
      }
    },

    deleteSubAttribute: async (_, { id }) => {
      try {
        await SubAttribute.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete subattribute');
      }
    },

    // Currency mutations
    createCurrency: async (_, { input }) => {
      try {
        const currency = new Currency(input);
        return await currency.save();
      } catch (error) {
        throw new Error('Failed to create currency');
      }
    },

    updateCurrency: async (_, { id, input }) => {
      try {
        return await Currency.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update currency');
      }
    },

    deleteCurrency: async (_, { id }) => {
      try {
        await Currency.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete currency');
      }
    },

    // Price mutations
    createPrice: async (_, { input }) => {
      try {
        const price = new Price(input);
        return await price.save();
      } catch (error) {
        throw new Error('Failed to create price');
      }
    },

    updatePrice: async (_, { id, input }) => {
      try {
        return await Price.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update price');
      }
    },

    deletePrice: async (_, { id }) => {
      try {
        await Price.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete price');
      }
    },

    // Order mutations
    createOrder: async (_, { input }) => {
      try {
        const order = new Order(input);
        return await order.save();
      } catch (error) {
        throw new Error('Failed to create order');
      }
    },

    updateOrder: async (_, { id, input }) => {
      try {
        return await Order.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update order');
      }
    },

    deleteOrder: async (_, { id }) => {
      try {
        await Order.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete order');
      }
    },

    // Image mutations
    createImage: async (_, { input }) => {
      try {
        const image = new Image(input);
        return await image.save();
      } catch (error) {
        throw new Error('Failed to create image');
      }
    },

    updateImage: async (_, { id, input }) => {
      try {
        return await Image.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error('Failed to update image');
      }
    },

    deleteImage: async (_, { id }) => {
      try {
        await Image.findByIdAndDelete(id);
        return true;
      } catch (error) {
        throw new Error('Failed to delete image');
      }
    },

    // Relationship mutations
    addProductToCategory: async (_, { input }) => {
      try {
        const productCategory = new ProductCategory(input);
        return await productCategory.save();
      } catch (error) {
        throw new Error('Failed to add product to category');
      }
    },

    removeProductFromCategory: async (_, { input }) => {
      try {
        await ProductCategory.findOneAndDelete(input);
        return true;
      } catch (error) {
        throw new Error('Failed to remove product from category');
      }
    },

    addAttributeToProduct: async (_, { input }) => {
      try {
        const productAttribute = new ProductAttribute(input);
        return await productAttribute.save();
      } catch (error) {
        throw new Error('Failed to add attribute to product');
      }
    },

    removeAttributeFromProduct: async (_, { input }) => {
      try {
        await ProductAttribute.findOneAndDelete(input);
        return true;
      } catch (error) {
        throw new Error('Failed to remove attribute from product');
      }
    },

    addPriceToProduct: async (_, { input }) => {
      try {
        const productPrice = new ProductPrice(input);
        return await productPrice.save();
      } catch (error) {
        throw new Error('Failed to add price to product');
      }
    },

    removePriceFromProduct: async (_, { input }) => {
      try {
        await ProductPrice.findOneAndDelete(input);
        return true;
      } catch (error) {
        throw new Error('Failed to remove price from product');
      }
    },

    addProductToOrder: async (_, { input }) => {
      try {
        const productOrder = new ProductOrder(input);
        return await productOrder.save();
      } catch (error) {
        throw new Error('Failed to add product to order');
      }
    },

    removeProductFromOrder: async (_, { input }) => {
      try {
        await ProductOrder.findOneAndDelete(input);
        return true;
      } catch (error) {
        throw new Error('Failed to remove product from order');
      }
    }
  },

  // Field resolvers for nested relationships
  Product: {
    categories: async (parent) => {
      try {
        const productCategories = await ProductCategory.find({ product_id: parent._id })
          .populate('category_id');
        return productCategories.map(pc => pc.category_id);
      } catch (error) {
        return [];
      }
    },

    attributes: async (parent) => {
      try {
        return await ProductAttribute.find({ product_id: parent._id })
          .populate('attribute_id')
          .populate('subattribute_id');
      } catch (error) {
        return [];
      }
    },

    prices: async (parent) => {
      try {
        const productPrices = await ProductPrice.find({ product_id: parent._id })
          .populate('price_id');
        return productPrices.map(pp => pp.price_id);
      } catch (error) {
        return [];
      }
    },

    images: async (parent) => {
      try {
        return await Image.find({ product_id: parent._id });
      } catch (error) {
        return [];
      }
    },

    orders: async (parent) => {
      try {
        const productOrders = await ProductOrder.find({ product_id: parent._id })
          .populate('order_id');
        return productOrders.map(po => po.order_id);
      } catch (error) {
        return [];
      }
    }
  },

  Category: {
    products: async (parent) => {
      try {
        const productCategories = await ProductCategory.find({ category_id: parent._id })
          .populate('product_id');
        return productCategories.map(pc => pc.product_id);
      } catch (error) {
        return [];
      }
    }
  },

  Attribute: {
    subattributes: async (parent) => {
      try {
        return await SubAttribute.find({ attribute_id: parent._id });
      } catch (error) {
        return [];
      }
    },

    products: async (parent) => {
      try {
        const productAttributes = await ProductAttribute.find({ attribute_id: parent._id })
          .populate('product_id');
        return productAttributes.map(pa => pa.product_id);
      } catch (error) {
        return [];
      }
    }
  },

  SubAttribute: {
    attribute: async (parent) => {
      try {
        return await Attribute.findById(parent.attribute_id);
      } catch (error) {
        return null;
      }
    }
  },

  ProductAttribute: {
    product: async (parent) => {
      try {
        return await Product.findById(parent.product_id);
      } catch (error) {
        return null;
      }
    },

    attribute: async (parent) => {
      try {
        return await Attribute.findById(parent.attribute_id);
      } catch (error) {
        return null;
      }
    },

    subattribute: async (parent) => {
      try {
        return await SubAttribute.findById(parent.subattribute_id);
      } catch (error) {
        return null;
      }
    }
  },

  Currency: {
    prices: async (parent) => {
      try {
        return await Price.find({ price_currency_id: parent._id });
      } catch (error) {
        return [];
      }
    }
  },

  Price: {
    currency: async (parent) => {
      try {
        return await Currency.findById(parent.price_currency_id);
      } catch (error) {
        return null;
      }
    },

    products: async (parent) => {
      try {
        const productPrices = await ProductPrice.find({ price_id: parent._id })
          .populate('product_id');
        return productPrices.map(pp => pp.product_id);
      } catch (error) {
        return [];
      }
    },

    orders: async (parent) => {
      try {
        return await Order.find({ price_id: parent._id });
      } catch (error) {
        return [];
      }
    }
  },

  Order: {
    price: async (parent) => {
      try {
        return await Price.findById(parent.price_id);
      } catch (error) {
        return null;
      }
    },

    products: async (parent) => {
      try {
        const productOrders = await ProductOrder.find({ order_id: parent._id })
          .populate('product_id');
        return productOrders.map(po => po.product_id);
      } catch (error) {
        return [];
      }
    }
  },

  ProductOrder: {
    product: async (parent) => {
      try {
        return await Product.findById(parent.product_id);
      } catch (error) {
        return null;
      }
    },

    order: async (parent) => {
      try {
        return await Order.findById(parent.order_id);
      } catch (error) {
        return null;
      }
    }
  },

  Image: {
    product: async (parent) => {
      try {
        return await Product.findById(parent.product_id);
      } catch (error) {
        return null;
      }
    }
  },

  ProductCategory: {
    product: async (parent) => {
      try {
        return await Product.findById(parent.product_id);
      } catch (error) {
        return null;
      }
    },

    category: async (parent) => {
      try {
        return await Category.findById(parent.category_id);
      } catch (error) {
        return null;
      }
    }
  },

  ProductPrice: {
    product: async (parent) => {
      try {
        return await Product.findById(parent.product_id);
      } catch (error) {
        return null;
      }
    },

    price: async (parent) => {
      try {
        return await Price.findById(parent.price_id);
      } catch (error) {
        return null;
      }
    }
  }
};

module.exports = resolvers;
