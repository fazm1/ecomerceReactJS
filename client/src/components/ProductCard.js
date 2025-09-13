import React from 'react';

const ProductCard = ({ product, onClick }) => {
  const primaryImage = product.images?.find(img => img.is_primary) || product.images?.[0];
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

  return (
    <div className="product-card" onClick={onClick}>
      {primaryImage ? (
        <img
          src={primaryImage.image_url}
          alt={primaryImage.alt_text || product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x250?text=No+Image';
          }}
        />
      ) : (
        <div className="product-image" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          color: '#6c757d'
        }}>
          📦 No Image
        </div>
      )}

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-brand">by {product.brand}</p>
        <p className="product-description">{product.description}</p>

        {price && (
          <div className="product-price">
            {formatPrice(price.price_value)}
          </div>
        )}

        {Object.keys(attributeGroups).length > 0 && (
          <div className="product-attributes">
            {Object.entries(attributeGroups).map(([attrName, values]) => (
              <div key={attrName} style={{ marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.8rem', color: '#666' }}>
                  {attrName}:
                </strong>
                <div style={{ marginTop: '0.2rem' }}>
                  {values.map((value, index) => (
                    <span key={index} className="attribute">
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
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '1rem'
        }}>
          <span style={{ 
            color: product.inStock ? '#27ae60' : '#e74c3c',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>
            {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
          </span>
          
          {product.categories?.length > 0 && (
            <div style={{ fontSize: '0.8rem', color: '#7f8c8d' }}>
              {product.categories[0].category_name}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
