import React from "react";

import { GlobalContext } from "../../context/GlobalContext";
import parse from "html-react-parser";

export default class Details extends React.Component {
  state = {
    attributes: {},
    price: 0,
    currency: "",
    buttonText: "ADD TO CART",
  };
  static contextType = GlobalContext;
  setAttributes = (name, value) => {
    this.setState((prevState) => ({
      attributes: { ...prevState.attributes, [name]: value },
    }));
  };
  onAddToCartClick = () => {
    const selectedAttributes = this.state.attributes;
    const allAttributes = this.props.product.attributes;
    const { addItemToCart } = this.context;
    if (Object.keys(selectedAttributes).length === allAttributes.length) {
      addItemToCart(this.props.product, selectedAttributes);
      this.setState({ buttonText: "ADDED TO YOUR CART!" });
      setTimeout(() => {
        this.setState({ buttonText: "ADD TO CART" });
      }, 3000);
    } else {
      alert(
        "You must select all the attributes before adding product to cart!"
      );
    }
  };
  render() {
    const { name, brand, description, prices, attributes, stock } =
      this.props.product;
    const { selectedCurrency } = this.context;
    const { label, symbol } = selectedCurrency;
    const itemPrice = prices.find((price) => price.currency.label === label);
    return (
      <div className="product-details">
        <h2 className="brand">{brand}</h2>
        <h2>{name}</h2>
        <div id="attributes-container">
          {attributes.map((attribute) => {
            const { name, type, items } = attribute;
            return (
              <div key={attribute.id}>
                <h3>{`${name}:`}</h3>
                {type !== "swatch" ? (
                  <ul>
                    {items.map((item) => (
                      <li
                        onClick={() =>
                          this.setAttributes(name, item.displayValue)
                        }
                        key={item.id}
                        className={`attribute ${
                          item.displayValue === this.state.attributes[name]
                            ? `selected-attribute`
                            : ``
                        }`}
                      >
                        {item.value}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul>
                    {items.map((item) => (
                      <li
                        className={`color ${
                          item.displayValue === this.state.attributes[name]
                            ? `selected-color`
                            : ``
                        }`}
                        style={{
                          backgroundColor: item.value,
                        }}
                        onClick={() =>
                          this.setAttributes(name, item.displayValue)
                        }
                        key={item.id}
                      ></li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <h3>Price:</h3>
        <h3
          style={{ fontSize: "24px", marginTop: "0px" }}
        >{`${symbol} ${itemPrice.amount.toFixed(2)}`}</h3>
        <button
          className={`green-large-button ${!stock ? "disabled" : ""}`}
          onClick={this.onAddToCartClick}
          disabled={!stock}
        >
          {this.state.buttonText}
        </button>
        {!stock && <h4>This product is currently out of stock.</h4>}
        <div id="product-description">{parse(description)}</div>
      </div>
    );
  }
}
