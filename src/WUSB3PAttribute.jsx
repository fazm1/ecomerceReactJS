import React, { Component } from 'react';
import Attribute from './attribute';
class WUSB3PAttribute extends Component {
     
    render() { 
        const { AttributeName, AttributeOptions, SelectionFunction } = this.props;
        const attributes = AttributeOptions.map((item)=>{return(item.value)});
        return (
                <>
                    <Attribute AttributeName={AttributeName} AttributeOptions={attributes} SelectionFunction={SelectionFunction} />
                </>
               
    );
    }
}
 

export default WUSB3PAttribute;