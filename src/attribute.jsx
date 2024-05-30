import React, { Component } from 'react';
class Attribute extends Component {
     
    handleSelection= (selectedOption) =>{  
        this.props.SelectionFunction(this.props.AttributeName, selectedOption, this.props.AttributeOptions);
    }
    render() { 
        const { AttributeName, AttributeOptions} = this.props;
    return (    <>
                    <div className = "AttributeName">{AttributeName}:</div>
                   
                    {AttributeOptions.map((options, index)=>(
                    <div key={index} className = "AttributeOptions" data-testid={`product-attribute-${AttributeName}`}>
                    <input
                        type="radio"
                        id={AttributeName+options}
                        name={AttributeName}
                        className={AttributeName !== "Color"? "AttributeInput": "ColorInput"}
                        onChange = {()=> this.handleSelection(options)}
                    />

                    <label
                        htmlFor={AttributeName+options}
                        className={AttributeName !== "Color"? "AttributeButton": "AttributeButtonColor"}
                        style={AttributeName === "Color"? {backgroundColor: options }:{}}
                    >
                    {AttributeName !== "Color"? options: ""}
                    </label>
                    </div>
                    ))
                    }
                     
                    
                </>
            );

    }
}
 

export default Attribute;