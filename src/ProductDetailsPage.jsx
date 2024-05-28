import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Attribute from "./attribute";
import ColorAttribute from './ColorAttribute';
import SizeAttribute from './SizeAttribute';
import CapacityAttribute from './CapacityAttribute';
import TIDIKAttribute from './TIDIKAttribute';
import WUSB3PAttribute from './WUSB3PAttribute';
import parse from 'html-react-parser';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import left from './images/left.svg'
import right from './images/right.svg'


const ALL_PRODUCTS = gql`
query getAllProducts{
    products{
      id,
      name,
      inStock,
      gallery,
      category,
      description,
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

  function withRouterNew(Component){
    return function Wrapper(props){
        const location = useLocation();
        const pathParts = location.pathname.split('/');
        const id = pathParts[3];
        const match = { params: { id } };
        return <Component {...props} id = {id} />
    } ;
}
class ProductDetailsPage extends Component {
    state={
        id:null,
        name: null,
        price: null,
        currency: null,
        description: null,
        attributes: null,
        colors: null,
        capacities:null,
        sizes: null,
        TIDIK: null,
        WUSB3P: null,
        inStock: null,
        images: null,
        currentImage:null,
        currentIndex:0,
        selectedAttributes: {},
        AllAttributes: {}
    }
    renderAttributeComponent= (attribute) =>{
        switch(attribute.name){
            case 'Size':
                return <SizeAttribute key={attribute.name} AttributeName = {attribute.name} AttributeOptions={this.state.sizes} SelectionFunction= {this.setSelectedAttributes} />;
            case 'Capacity':
                return <CapacityAttribute key={attribute.name} AttributeName = {attribute.name} AttributeOptions={this.state.capacities} SelectionFunction= {this.setSelectedAttributes}  />;
            case 'Color':
                return <ColorAttribute key={attribute.name} AttributeName = {attribute.name} AttributeOptions={this.state.colors} SelectionFunction= {this.setSelectedAttributes} />;
            case 'Touch ID in keyboard':
                return <TIDIKAttribute key={attribute.name} AttributeName = {attribute.name} AttributeOptions={this.state.TIDIK} SelectionFunction= {this.setSelectedAttributes} />;
            case 'With USB 3 ports':
                return <WUSB3PAttribute key={attribute.name} AttributeName = {attribute.name} AttributeOptions={this.state.WUSB3P} SelectionFunction= {this.setSelectedAttributes} />;
            default:
                return null;
        }
    }
    setSelectedAttributes = (SetName, SelectedItem, AllAttributes) => {
      this.setState(prevState=>({

        selectedAttributes: {
          ...prevState.selectedAttributes,
          [SetName]: SelectedItem
        }, 
        AllAttributes: {
          ...prevState.AllAttributes,
          [SetName]: AllAttributes
        }
      }),()=>{
        
      })
    }

    allAttributesSelected = () =>{
      const { attributes, selectedAttributes} = this.state;
      return attributes.every(attribute => selectedAttributes.hasOwnProperty(attribute.name))
    }
    
    handleAddToCart = () =>{
      const { addToCart } = this.props;
      addToCart(this.state.id, this.state.name, this.state.images[0], this.state.price, this.state.currency, this.state.AllAttributes, this.state.selectedAttributes)
    }
    
    
      render() {
        const {id} = this.props;
        const regex = /\\n|\\r\\n|\\n\\r|\\r/g;
        
        return (<>
        <Query query={ALL_PRODUCTS}>
        {({ loading, error, data})=>{
        if (loading) return <div className = "PageTitle">Loading...</div>;
        if (error) return <div className = "PageTitle"> {error.message}</div>;
        {data.products.map((product)=>{
            if(product.id === id){
                this.state.id = product.id;
                this.state.name = product.name;
                this.state.price = product.prices[0].amount;
                this.state.currency = product.prices[0].currency[0].symbol;
                this.state.description = product.description;
                this.state.attributes = product.attributes;
                this.state.inStock = product.inStock;
                this.state.images = product.gallery;
            
                for(let i = 0; i < this.state.attributes.length; i++){
                    if (this.state.attributes[i].name === "Size"){
                        this.state.sizes = product.attributes[i].items
                    }
                    else if (this.state.attributes[i].name === "Color"){
                        this.state.colors = product.attributes[i].items
                    }
                    else if (this.state.attributes[i].name === "Capacity"){
                        this.state.capacities = product.attributes[i].items
                    }
                    else if (this.state.attributes[i].name === "Touch ID in keyboard"){
                        this.state.TIDIK = product.attributes[i].items
                    }
                    else if (this.state.attributes[i].name === "With USB 3 ports"){
                        this.state.WUSB3P = product.attributes[i].items
                    }
                }
                
            }
            })}
        ;

        
          return (     
                    <div className = "PDP">
                      <div className="row">
                      <div className="col-8">
                        <div className="Gallery row" data-testid='product-gallery'>
                          <div className="ImagesSet col-2">{this.state.images.map((image, index)=>(<img key={index} onClick={()=> this.setState(({currentIndex:index}))} src ={image} className="GalleryImage"></img>))}</div>
                          <div className="Carousel col-6">
                            <button style = {this.state.images.length<2? {display:"none"} : {} } onClick={()=>{this.setState(prevState => ({currentIndex: prevState.currentIndex > 0? prevState.currentIndex - 1  : prevState.images.length-1}))}} className = "leftCursor"><img className="RightArrow" src={left}></img></button>
                            <button style = {this.state.images.length<2? {display:"none"} : {} } onClick={()=>{this.setState(prevState => ({currentIndex: prevState.currentIndex < prevState.images.length - 1? prevState.currentIndex + 1  : 0}))}} className = "rightCursor"><img className="RightArrow" src={right}></img></button>
                            <div className="CarouselImageContainer"><img src = {this.state.images[this.state.currentIndex]} className='CarouselImage'></img></div>
                          </div>
                        </div>      
                      </div>
                      <div className="col-4">
                        <div className="PDPTitle">{this.state.name}</div>
                        <div>{this.state.attributes.map((attribute)=>this.renderAttributeComponent(attribute))}</div>
                        <div className="PDPPriceText">Price:</div>
                        <div className="PDPPrice">{this.state.currency}{this.state.price}</div>
                        <button className="PDPAddToCart" data-testid='add-to-cart' onClick={this.handleAddToCart} disabled={!this.state.inStock || !this.allAttributesSelected()} style={!this.state.inStock || !this.allAttributesSelected()? {opacity: "0.5", filter: "alpha(opacity=50)"} : {}}>{this.state.inStock?"ADD TO CART": "OUT OF STOCK"}</button>
                        <div className="PDPDescription" data-testid='product-description'>{parse(this.state.description.replace(regex, '<br>'))}</div>
                    </div>

                    </div>
                    </div>
          );
        }}
        </Query>
        </>
      )}
}
 
export default withRouterNew(ProductDetailsPage);