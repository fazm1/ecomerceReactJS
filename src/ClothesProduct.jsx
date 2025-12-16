import React, { Component } from 'react';
import Product from './product';
import NavigationBar from './NavigationBar';
import dataService from './dataService';

class ClothesProduct extends Component {
    state = { 
        activeProduct: null,
       } 
        toggleActive = (id) => {
        this.setState({ activeProduct: id })
     }
      render() { 
        const {addToCart} = this.props;
        const products = dataService.getProductsByCategory('clothes');
          return (
            <div className='row'>
            <div className="PageTitle">Clothes</div>
            {products.map((product)=>{
                return(<Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.prices[0].amount}
                  currency={product.prices[0].currency.symbol}
                  mainImage={product.gallery[0]}
                  isActive={this.state.activeProduct === product.id}
                  toggleActive={()=>this.toggleActive(product.id)}
                  inStock ={product.inStock}
                  category={product.category}
                  addToCart={addToCart}
                  attributes={product.attributes}
                  />);
            })}
            
            </div>
      );
      }
}
 
export default ClothesProduct;