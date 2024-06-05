import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './images/BrandIcon.svg'
import cart from './images/EmptyCart.svg'
import { Link } from 'react-router-dom';
import { Query } from '@apollo/client/react/components';
import { gql } from '@apollo/client';
import Cart from './Cart';


const ALL_CATEGORIES = gql`
query getAllCategories{
  categories{
    name
  }
}
  `

function withRouterNew(Component){
    return function Wrapper(props){
        const location = useLocation();
        const pathParts = location.pathname.split('/'); 
        const categoryName = pathParts[1];
        const match = { params: { categoryName } };
        return <Component {...props} categoryName = {categoryName} />
    } ;
}
class NavigationBar extends Component {
  
  state= {
    activeTab:null,
    showCart: false,
  }

  componentDidMount(){
    window.addEventListener('click', this.handleOutsideClick);
  }

  componentWillUnmount(){
    window.addEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event) =>{
    if(this.state.showCart && this.cartRef && !this.cartRef.contains(event.target)){
      this.setState({ showCart: false })

      const mainContent = document.getElementById("main-content");
      mainContent.style.opacity = "unset";
      mainContent.style.filter = "unset";
      mainContent.style.backgroundColor = "unset";
      
  
    }
  }

  handleClick = (event) => {
    event.stopPropagation();
    const mainContent = document.getElementById("main-content");
    mainContent.style.opacity = "0.4";
    mainContent.style.filter = "alpha(opacity=40)";
    mainContent.style.backgroundColor = "rgba(57, 55, 72, 0.22)";
   
    this.setState({showCart: true})
  }

  setCartRef = (node) => {
    this.cartRef = node;
  }

    render() { 
        const { categoryName, cartItems, addToCart, removeFromCart, emptyCart} = this.props;
        return (<>
        <nav className="navbar">
        
        <ul>
        <Query query={ALL_CATEGORIES}>
        {({loading, error, data}) =>{
            if(loading) return ' ';
            if(error) return `Error: ${error.message}`;
            const categories = data.categories;
            return categories.map((category)=>(
              <li className={categoryName === category.name || (categoryName === "" && category.name ==="all") ? "active": ""} key = {category.name} data-testid={categoryName === category.name || (categoryName === "" && category.name ==="all")?'active-category-link':'category-link'}>
              <Link  
              to = {category.name !== "all"? `/${category.name}`: `/`}
              >{category.name}
              </Link>
              </li>         
            ));
          }}
          </Query>
          
        </ul>
        
        <Link to= "/" className='logo'><img src={logo}></img></Link>
        <a onClick={this.handleClick} className='cart' data-testid= 'cart-btn'>
        <div style={cartItems.length==0?{display:"none"}:{}}className={this.state.showCart==false?"CountBubble":"CountBubbleWithCart"}><span className="CountBubbleNumber">{cartItems.length}</span></div>
          {this.state.showCart && (
          <div ref={this.setCartRef}>
            <Cart
            cartItems={cartItems}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            emptyCart={emptyCart}/>
            </div>)}
            <img src={cart}></img>
        </a>
        
      </nav>
      
      </>
        );
    }
}



 
export default withRouterNew(NavigationBar);