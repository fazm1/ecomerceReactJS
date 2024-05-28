import React, { Component } from 'react';
import Product from './product';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import NavigationBar from './NavigationBar';
const ALL_PRODUCTS = gql`
query getAllProducts{
    products{
      id,
      name,
      inStock,
      gallery,
      category,
      attributes{
        name,
        items{
          displayValue,
          value,
        }  
      },
      prices{
        amount,
        currency{
          symbol
        }
      }
    }
  }
`

class ClothesProduct extends Component {
    state = { 
        activeProduct: null,
       } 
        toggleActive = (id) => {
        this.setState({ activeProduct: id })
     }
      render() { 
        const {addToCart} = this.props;
          return (<>
          <Query query={ALL_PRODUCTS}>
          {({ loading, error, data})=>{
          if (loading) return <div className = "PageTitle">Loading...</div>;
          if (error) return <div className = "PageTitle"> {error.message}</div>;
              return(
                      <div className='row'>
                      <div className="PageTitle">Clothes</div>
                      {data.products.map((product)=>{
                        if(product.category === "clothes"){
                            return(<Product
                              key={product.id}
                              id={product.id}
                              name={product.name}
                              price={product.prices[0].amount}
                              currency={product.prices[0].currency[0].symbol}
                              mainImage={product.gallery[0]}
                              isActive={this.state.activeProduct === product.id}
                              toggleActive={()=>this.toggleActive(product.id)}
                              inStock ={product.inStock}
                              category={product.category}
                              addToCart={addToCart}
                              attributes={product.attributes}
                              />);
                        }
                          
                      })}
                      
                      </div>
          );
          }}
          </Query>
          </>
      );
      }
}
 
export default ClothesProduct;