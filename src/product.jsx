import React, { Component } from 'react';
import cart from './images/EmptyCart.svg'
import { Link } from 'react-router-dom';
class Product extends Component {

    render() { 
        
        const { id, name, price, currency, mainImage, inStock, category, all, addToCart, attributes } = this.props;
        const imageStyle = !inStock?{opacity: '0.4', filter: 'alpha(opacity=40)'} : {}
        const stockStyle = inStock? {display: 'none'} : {}
        const quickShopStyle = !inStock? {display: 'none'}:{}

        const selectedAttributes = attributes.reduce((acc, attributeSet)=>{
            if(attributeSet.items && attributeSet.items.length >0){
                acc[attributeSet.name] = attributeSet.items[0].value;
            }
            return acc;
        },{});
        
        const allAttributes = attributes.reduce((acc, attributeSet)=>{
            acc[attributeSet.name] = attributeSet.items.map(item=>item.value);
            return acc;
        }, {})

        return (
                
                <div className = "col-4">
                    <Link to={all? category+"/pdp/"+id: "pdp/"+id}>
                    <ul className = "product" data-testid={`product-${name}`}>
                        <li onClick={(event)=>{event.preventDefault(); event.stopPropagation(); addToCart(id, name, mainImage, price, currency, allAttributes, selectedAttributes)}} className = "quickShop" style={quickShopStyle}><img src={cart} className= "cart2"></img></li>
                        <li className = "outofstock" style={stockStyle}>OUT OF STOCK</li>
                        <img className ="product-image" src = {mainImage} style = {imageStyle} alt = "product-picture"></img>
                        <li className ="product-name">{name}</li>
                        <li className ="product-price">{currency}{price.toFixed(2)}</li>
                    </ul>
                    </Link>
                </div>
    );
    }
}
 

export default Product;