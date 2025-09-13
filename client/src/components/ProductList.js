import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ProductCard from './ProductCard';
import { GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCTS_BY_CATEGORY } from '../graphql/queries';

const ProductList = ({ onProductClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showInStockOnly, setShowInStockOnly] = useState(false);

  const { data: productsData, loading: productsLoading, error: productsError } = useQuery(GET_PRODUCTS);
  const { data: categoriesData, loading: categoriesLoading } = useQuery(GET_CATEGORIES);
  const { data: categoryProductsData, loading: categoryLoading } = useQuery(
    GET_PRODUCTS_BY_CATEGORY,
    {
      variables: { categoryId: selectedCategory },
      skip: !selectedCategory
    }
  );

  if (productsLoading || categoriesLoading) {
    return <div className="loading">🔄 Loading products...</div>;
  }

  if (productsError) {
    return (
      <div className="error">
        ❌ Error loading products: {productsError.message}
      </div>
    );
  }

  let products = productsData?.products || [];

  // Filter by category if selected
  if (selectedCategory && categoryProductsData) {
    products = categoryProductsData.productsByCategory;
  }

  // Filter by stock status
  if (showInStockOnly) {
    products = products.filter(product => product.inStock);
  }

  const categories = categoriesData?.categories || [];

  return (
    <div>
      <div className="products-header">
        <h1 className="products-title">Our Products</h1>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label className="filter-label">Filter by Category:</label>
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label className="filter-label">
            <input
              type="checkbox"
              checked={showInStockOnly}
              onChange={(e) => setShowInStockOnly(e.target.checked)}
              style={{ marginRight: '0.5rem' }}
            />
            Show only in-stock items
          </label>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="loading">
          {selectedCategory ? 'No products found in this category.' : 'No products available.'}
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => onProductClick(product)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
