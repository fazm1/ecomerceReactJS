import React from 'react';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveItem, onClose, total }) => {
  const formatPrice = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="cart">
      <div className="cart-header">
        <h2 className="cart-title">Shopping Cart</h2>
        <button className="cart-close" onClick={onClose}>
          Close
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
        </div>
      ) : (
        <>
          {cartItems.map(item => {
            const price = item.prices?.[0]?.price_value || 0;
            const primaryImage = item.images?.find(img => img.is_primary) || item.images?.[0];

            return (
              <div key={item._id} className="cart-item">
                {primaryImage ? (
                  <img
                    src={primaryImage.image_url}
                    alt={primaryImage.alt_text || item.name}
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="cart-item-image" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#f8f9fa',
                    color: '#6c757d',
                    fontSize: '0.8rem'
                  }}>
                    No Image
                  </div>
                )}

                <div className="cart-item-info">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{formatPrice(price)} each</p>
                </div>

                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ 
                      fontSize: '1.1rem', 
                      fontWeight: '600', 
                      color: '#2c3e50',
                      marginBottom: '0.5rem'
                    }}>
                      {formatPrice(price * item.quantity)}
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => onRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="cart-total">
            <div className="cart-total-amount">
              Total: {formatPrice(total)}
            </div>
          </div>

          <div style={{ 
            marginTop: '2rem',
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center'
          }}>
            <button
              style={{
                background: '#27ae60',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#219a52'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
            >
              Proceed to Checkout
            </button>
            
            <button
              style={{
                background: '#95a5a6',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#7f8c8d'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#95a5a6'}
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
