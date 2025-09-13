import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState('products');

  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item._id === product._id);
    
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item._id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item._id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.prices?.[0]?.price_value || 0;
      return total + (price * item.quantity);
    }, 0);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentView('product-detail');
  };

  const handleBackToProducts = () => {
    setSelectedProduct(null);
    setCurrentView('products');
  };

  const handleShowCart = () => {
    setShowCart(true);
    setCurrentView('cart');
  };

  const handleCloseCart = () => {
    setShowCart(false);
    setCurrentView('products');
  };

  return (
    <div className="App">
      <Header 
        cartItemCount={getCartItemCount()}
        onShowCart={handleShowCart}
        onBackToProducts={handleBackToProducts}
        currentView={currentView}
      />
      
      <main className="main">
        <div className="container">
          {currentView === 'products' && (
            <ProductList onProductClick={handleProductClick} />
          )}
          
          {currentView === 'product-detail' && selectedProduct && (
            <ProductDetail 
              product={selectedProduct}
              onAddToCart={addToCart}
              onBack={handleBackToProducts}
            />
          )}
          
          {currentView === 'cart' && (
            <Cart 
              cartItems={cartItems}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeFromCart}
              onClose={handleCloseCart}
              total={getCartTotal()}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
