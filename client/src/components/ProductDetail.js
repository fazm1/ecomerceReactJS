import React, { useState } from 'react';
import ImageCarousel from './ImageCarousel';

const ProductDetail = ({ product, onAddToCart, onBack }) => {
  const [quantity, setQuantity] = useState(1);

  const price = product.prices?.[0];
  const currency = price?.currency?.currency_symbol || '$';

  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency === '$' ? 'USD' : 'EUR',
      minimumFractionDigits: 2
    }).format(value);
  };

  const getAttributeGroups = () => {
    const groups = {};
    product.attributes?.forEach(attr => {
      const attrName = attr.attribute?.attribute_name;
      const subAttrName = attr.subattribute?.subattribute_name;
      
      if (attrName && subAttrName) {
        if (!groups[attrName]) {
          groups[attrName] = [];
        }
        groups[attrName].push(subAttrName);
      }
    });
    return groups;
  };

  const attributeGroups = getAttributeGroups();

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
    alert(`Added ${quantity} ${product.name}(s) to cart!`);
  };

  return (
    <div>
      <button className="back-btn" onClick={onBack}>
        Back to Products
      </button>

      <div className="product-detail">
        <div className="product-detail-content">
          <div>
            <ImageCarousel 
              images={product.images || []} 
              productName={product.name}
            />
          </div>

          <div className="product-detail-info">
            <h1>{product.name}</h1>
            <p className="product-detail-brand">by {product.brand}</p>
            <p className="product-detail-description">{product.description}</p>

            {price && (
              <div className="product-detail-price">
                {formatPrice(price.price_value)}
              </div>
            )}

            {Object.keys(attributeGroups).length > 0 && (
              <div className="product-detail-attributes">
                <h3 className="attributes-title">Product Details</h3>
                {Object.entries(attributeGroups).map(([attrName, values]) => (
                  <div key={attrName} className="attribute-group">
                    <div className="attribute-group-name">{attrName}:</div>
                    <div className="attribute-values">
                      {values.map((value, index) => (
                        <span key={index} className="attribute-value">
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              marginTop: '2rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <label htmlFor="quantity" style={{ fontWeight: '600' }}>
                  Quantity:
                </label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max="10"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  style={{
                    width: '60px',
                    padding: '0.5rem',
                    border: '2px solid #ecf0f1',
                    borderRadius: '5px',
                    textAlign: 'center'
                  }}
                />
              </div>

              <button
                className="add-to-cart"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                style={{ flex: 1 }}
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <div style={{ 
              marginTop: '1rem',
              padding: '1rem',
              backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
              border: `1px solid ${product.inStock ? '#c3e6cb' : '#f5c6cb'}`,
              borderRadius: '5px',
              color: product.inStock ? '#155724' : '#721c24'
            }}>
              <strong>Availability:</strong> {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>

            {product.categories?.length > 0 && (
              <div style={{ 
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#e9ecef',
                borderRadius: '5px'
              }}>
                <strong>Category:</strong> {product.categories[0].category_name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
