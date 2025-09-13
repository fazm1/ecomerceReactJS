import React from 'react';

const Header = ({ cartItemCount, onShowCart, onBackToProducts, currentView }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="/" className="logo" onClick={(e) => {
            e.preventDefault();
            onBackToProducts();
          }}>
            🛍️ E-commerce Store
          </a>
          
          <nav className="nav">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onBackToProducts();
              }}
              className={currentView === 'products' ? 'active' : ''}
            >
              Products
            </a>
            
            <div 
              className="cart-icon" 
              onClick={onShowCart}
              title="Shopping Cart"
            >
              🛒
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
