import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import ProductCard from './ProductCard';
import { GET_PRODUCTS, GET_CATEGORIES, GET_PRODUCTS_BY_CATEGORY } from '../graphql/queries';

const ProductList = ({ onProductClick, onAddToCart, selectedCategory }) => {
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
    return <div className="page-title">Loading...</div>;
  }

  if (productsError) {
    return (
      <div className="error">
        Error loading products: {productsError.message}
      </div>
    );
  }

  let products = productsData?.products || [];

  // Filter by category if selected
  if (selectedCategory) {
    products = products.filter(product => 
      product.categories?.some(cat => cat.category_name === selectedCategory)
    );
  }

  // Filter by stock status
  if (showInStockOnly) {
    products = products.filter(product => product.inStock);
  }

  const categories = categoriesData?.categories || [];

  return (
    <div>
      <h1 className="page-title">{selectedCategory || 'All'}</h1>

      {/* Filters */}
      <div className="filters">
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
        <div className="page-title">
          {selectedCategory ? 'No products found in this category.' : 'No products available.'}
        </div>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <ProductCard
              key={product._id}
              product={product}
              onClick={() => onProductClick(product)}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
