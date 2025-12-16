import React, { Component } from 'react';
import Product from './product';
import dataService from './dataService';

class AllProducts extends Component {

    render() { 
     const {addToCart} = this.props;
     const products = dataService.getProducts();
        return (
            <div className='row'>
            <div className="PageTitle">All</div>
            {products.map((product)=>{
                return(<Product
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.prices[0].amount}
                  currency={product.prices[0].currency.symbol}
                  mainImage={product.gallery[0]} inStock ={product.inStock}
                  category={product.category}
                  all={true}
                  addToCart={addToCart}
                  attributes={product.attributes}
                  />);
            })}
            
            </div>
    );

    
    }
}
 
export default AllProducts;