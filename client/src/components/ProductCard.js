import React from 'react';

const ProductCard = ({ product, onClick, onAddToCart }) => {
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

  return (
    <div className="product-card" onClick={onClick}>
      {!product.inStock && (
        <div className="out-of-stock">OUT OF STOCK</div>
      )}
      
      {primaryImage ? (
        <img
          src={primaryImage.image_url}
          alt={primaryImage.alt_text || product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/354x330?text=No+Image';
          }}
        />
      ) : (
        <div className="product-image" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          color: '#6c757d',
          fontSize: '18px'
        }}>
          No Image
        </div>
      )}

      <h3 className="product-name">{product.name}</h3>
      
      {price && (
        <div className="product-price">
          {formatPrice(price.price_value)}
        </div>
      )}

      <div className="quick-shop" onClick={(e) => {
        e.stopPropagation();
        if (onAddToCart && product.inStock) {
          onAddToCart(product, 1);
        }
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 18.3333C7.95833 18.3333 8.33333 17.9583 8.33333 17.5C8.33333 17.0417 7.95833 16.6667 7.5 16.6667C7.04167 16.6667 6.66667 17.0417 6.66667 17.5C6.66667 17.9583 7.04167 18.3333 7.5 18.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16.6667 18.3333C17.125 18.3333 17.5 17.9583 17.5 17.5C17.5 17.0417 17.125 16.6667 16.6667 16.6667C16.2083 16.6667 15.8333 17.0417 15.8333 17.5C15.8333 17.9583 16.2083 18.3333 16.6667 18.3333Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M0.833374 0.833374H4.16671L6.40004 11.9917C6.47587 12.3753 6.64547 12.7353 6.89171 13.0359C7.13795 13.3365 7.45327 13.5678 7.80837 13.7084C8.16347 13.8489 8.54737 13.8948 8.92004 13.8417C9.29271 13.7886 9.64271 13.6385 9.93337 13.4067H15.4917C15.7824 13.6385 16.1324 13.7886 16.505 13.8417C16.8777 13.8948 17.2616 13.8489 17.6167 13.7084C17.9718 13.5678 18.2871 13.3365 18.5334 13.0359C18.7796 12.7353 18.9492 12.3753 19.025 11.9917L20.4167 5.00004H5.00004" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
};

export default ProductCard;
