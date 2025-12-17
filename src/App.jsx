import React, { Component } from 'react';
import Product from './product';
import NavigationBar from './NavigationBar';
import ClothesProduct from './ClothesProduct';
import TechProduct from './TechProduct';
import AllProducts from './AllProducts';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import ProductDetailsPage from './ProductDetailsPage';

class App extends Component {
    state = {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.cart != this.state.cart) {
            localStorage.setItem('cart', JSON.stringify(this.state.cart));
        }
    }
    emptyCart = () => {
        this.setState({ cart: [] });
        localStorage.removeItem('cart');
        toast.info(`Order placed`, { position: "bottom-right", autoClose: 2000 });

    }
    addToCart = (id, product, image, price, currency, allAttributes, selectedAttributes) => {
        const newItem = { id, product, image, price, currency, allAttributes, attribute: selectedAttributes };
        this.setState(prevState => ({
            cart: [...prevState.cart, newItem]
        }), () => {
            toast.success(`Added ${product} to cart`, { position: "bottom-right", autoClose: 2000 });
        })
    }
    removeFromCart = (index) => {
        let product = null;
        this.setState(prevState => {
             product = prevState.cart.find((item, itemIndex)=>(itemIndex === index)).product;
            const newCart = prevState.cart.filter((item, itemIndex) =>
                (itemIndex !== index)
            );
            return { cart: newCart };
        }, () => {
            toast.error(`Removed ${product} from cart`, { position: "bottom-right", autoClose: 2000 });
            
        });
    }
    render() {
        return (
            <>
                <NavigationBar cartItems={this.state.cart} addToCart={this.addToCart} removeFromCart={this.removeFromCart} emptyCart={this.emptyCart} />
                +           <ToastContainer />
                <div id="main-content">
                    <Routes>
                        <Route path="/" element={<AllProducts addToCart={this.addToCart} />} />
                        <Route path="/clothes" element={<ClothesProduct addToCart={this.addToCart} />} />
                        <Route path="/tech" element={<TechProduct addToCart={this.addToCart} />} />
                        <Route path=":category/pdp/:id" element={<ProductDetailsPage addToCart={this.addToCart} />} />
                    </Routes>
                </div>
            </>
        );
    }
}

export default App;