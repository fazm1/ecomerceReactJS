import React, { Component } from 'react';
import Product from './product';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';


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
class AllProducts extends Component {

    render() { 
     const {addToCart} = this.props;
        return (<>
        
        <Query query={ALL_PRODUCTS}>
        {({ loading, error, data})=>{
        if (loading) return <div className = "PageTitle">Loading...</div>;
        if (error) return <div className = "PageTitle"> {error.message}</div>;
            return(
                    <div className='row'>
                    <div className="PageTitle">All</div>
                    {data.products.map((product)=>{
                        return(<Product
                          key={product.id}
                          id={product.id}
                          name={product.name}
                          price={product.prices[0].amount}
                          currency={product.prices[0].currency[0].symbol}
                          mainImage={product.gallery[0]} inStock ={product.inStock}
                          category={product.category}
                          all={true}
                          addToCart={addToCart}
                          attributes={product.attributes}
                          />);
                    })}
                    
                    </div>
        );
        }}
        </Query>
        </>
    );

    
    }
}
 
export default AllProducts;