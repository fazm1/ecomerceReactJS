import React, { Component } from 'react';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import { withApollo } from '@apollo/client/react/hoc';

const GET_ATTRIBUTION = gql`
query getAttributionID($attribute: String!, $set: String!){
  getAttributionID(attribute: $attribute, set: $set )
  }
  `
const PLACE_ORDER = gql`
mutation placeOrder($total: Float!){
  placeOrder(total: $total)
}
`
const ORDER_ITEMS = gql`
mutation OrderItems($product: String!, $item:[Int]!){
  OrderItems(product: $product, item: $item)
}
`

class Cart extends Component {
    componentDidMount(){
       
      }
    state = { 
        cartItems: this.props.cartItems.reduce((acc,item)=>{
          const key = item.product + Object.values(item.attribute).join('');
          const existingItem = acc.find((i)=> i.key === key);
          if(existingItem){
            existingItem.quantity++;
          } else{
            acc.push({ ...item, quantity: 1, key});
          }
          return acc;
        }, []),
     };

     calculateTotal=()=>{
      return this.state.cartItems.reduce((total, item)=>{
        return total + (item.price * item.quantity);
      }, 0);
     };

     incrementItem=(id, itemKey, product, image, price, currency, allAttributes,  selectedAttributes)=>{
      this.setState((prevState)=>({
        cartItems: prevState.cartItems.map((item)=>
        item.key === itemKey? {...item, quantity: item.quantity +1}:item
      ),
      }));
      const {addToCart} = this.props;
      addToCart(id, product, image, price, currency, allAttributes,  selectedAttributes);

     };

     decrementItem=(itemKey, index)=>{
      this.setState((prevState)=>({
        cartItems: prevState.cartItems.map((item)=>
          item.key === itemKey? {...item, quantity: Math.max(item.quantity -1,0)}:item
        ).filter((item)=> item.quantity > 0),
     }));
     
      const {removeFromCart} = this.props;
      removeFromCart(index);

     }

     getAttributionID = async (attribute, set)=>{
      const {data} = await this.props.client.query({
        query: GET_ATTRIBUTION,
        variables: {attribute, set}
      });
      return data.getAttributionID
    };

    placeOrder = async () => {
      const {cartItems} = this.state;
      const orders = [];

      for (const item of cartItems){
        const attributionIDs = await Promise.all(
          Object.keys(item.allAttributes).map(async(attributeSetName) => {
            const value = item.attribute[attributeSetName];
            return await this.getAttributionID(value, attributeSetName);
          })
        );
        orders.push({
          product: item.id,
          item: attributionIDs,
          quantity: item.quantity
        })
      }
      
      const {data} = await this.props.client.mutate({
        mutation: PLACE_ORDER,
        variables: {
          total: this.calculateTotal(),
        },
      });

      for(const order of orders){
        console.log(order.item);
        if(order.item.length === 0){
          order.item = [57];
        }
        for(let i=0; i < order.quantity; i++){
        const {data} = await this.props.client.mutate({
          mutation: ORDER_ITEMS,
          variables: {
            product: order.product,
            item: order.item,
          },
        });
        
      }
    }

      return alert("Order placed.")
    };
    render() { 
        const {cartItems} = this.state;
        const total = this.calculateTotal();
        const currency = cartItems.map((item)=>(item.currency));
        const cartAmount = cartItems.reduce((total, item)=> total + item.quantity, 0);
        return (
        <div className="CartOverlay">
          <div className="MyBag">My bag, <span className="ItemCount" data-testid='cart-item-amount'>{cartAmount!==1? `${cartAmount} items`:`${cartAmount} item`}</span></div>
          <div className="CartContent">
            <div className="AllCartItems">
                {cartItems.map((item, index)=>(
                    <div className= "CartItem" key={index}>
                      <div className="CartItemContent">
                        <div className="CartItemName">{item.product}</div>
                        <div className="CartItemPrice">{item.currency}{item.price}</div>
                        <div className="Counter">
                          <div className="Increment" data-testid='cart-item-amount-increase' onClick={()=> this.incrementItem(item.id, item.key, item.product, item.image, item.price, item.currency, item.allAttributes, item.attribute)}>+</div>
                          <span className="CounterValue">{item.quantity}</span>
                          <div className="Decrement" data-testid='cart-item-amount-decrease' onClick={()=> this.decrementItem(item.key, index) }>-</div>
                        </div>
                            {Object.entries(item.allAttributes).map(([attributeName, options],idx)=>(
                            <div className="CartItemAttribute" key={idx}>
                                <div className="CartItemAttributeName" data-testid={`cart-item-attribute-${attributeName}`}>{attributeName+":"}</div>
                                {options.map((option, index)=>(
                                <div className="CartAttributeOptions" key= {index}>
                                  <div className={attributeName !== "Color"? "CartAttribute": "CartAttributeColor"}
                                  data-testid={item.attribute[attributeName]===option? `cart-item-attribute-${attributeName}-${attributeName}-selected`: `cart-item-attribute-${attributeName}-${attributeName}`}
                                  style={
                                  item.attribute[attributeName]===option && attributeName !== "Color" ? {backgroundColor: 'black', color: 'white'}: 
                                  item.attribute[attributeName]===option && attributeName === "Color" ? {backgroundColor:option, border: '3px solid rgba(94, 206, 123, 1)', outline:'1px solid white ', outlineOffset:"-2px "}:
                                  item.attribute[attributeName]!==option && attributeName === "Color" ? {backgroundColor:option}:
                                  {}
                                  }>
                                    {attributeName !== "Color"? option: ""}
                                  </div>
                                </div>))}
                            </div>))}
                        </div>
                            <img className= "CartItemImage" src={item.image}></img>
                        </div>
                ))}
              </div>       
          </div>
          <div className="Total">Total<span className="TotalPrice" data-testid='cart-total'>{currency[0]}{total.toFixed(2)}</span></div>
          <button onClick = {()=> this.placeOrder()} className="PlaceOrder" disabled = {cartAmount > 0? false : true} style={cartAmount > 0? {}:{opacity: "0.5", filter: "alpha(opacity=50)"}}>Place Order</button>
        </div>
    
    );
    }
}
 
export default withApollo(Cart);