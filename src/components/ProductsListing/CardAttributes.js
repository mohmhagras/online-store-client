import React from "react";
import { GlobalContext } from "../../context/GlobalContext";

export default class CardAttributes extends React.Component {
  state = {
    attributes: {},
    buttonText: "ADD",
  };
  setAttributes = (name, value) => {
    this.setState((prevState) => ({
      attributes: { ...prevState.attributes, [name]: value },
    }));
  };
  static contextType = GlobalContext;
  onAddClick = () => {
    const selectedAttributes = this.state.attributes;
    const allAttributes = this.props.attributes;
    const { addItemToCart } = this.context;
    if (Object.keys(selectedAttributes).length === allAttributes.length) {
      addItemToCart(this.props.product, selectedAttributes);
      this.setState({ buttonText: "ADDED!" });
      setTimeout(() => {
        this.setState({ buttonText: "ADD" });
        this.props.onAddingToCart();
      }, 1500);
    } else {
      alert(
        "You must select all the attributes before adding product to cart!"
      );
    }
  };
  render() {
    const selectedAttributes = this.state.attributes;
    //console.log(this.props.product);
    const { attributes } = this.props;
    return (
      <div className="product-details small card">
        <div id="attributes-container">
          {attributes.map((attribute) => {
            const { name, type, items } = attribute;
            return (
              <div key={attribute.id}>
                <h5
                  style={{
                    lineHeight: 1,
                    marginTop: "8px",
                    marginBottom: "4px",
                  }}
                >{`${name}:`}</h5>
                {type !== "swatch" ? (
                  <ul>
                    {items.map((item) => (
                      <li
                        key={item.id}
                        onClick={() =>
                          this.setAttributes(name, item.displayValue)
                        }
                        className={`attribute small ${
                          item.displayValue === selectedAttributes[name]
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
                        onClick={() =>
                          this.setAttributes(name, item.displayValue)
                        }
                        className={`color small ${
                          item.displayValue === selectedAttributes[name]
                            ? `selected-color`
                            : ``
                        }`}
                        style={{
                          backgroundColor: item.value,
                        }}
                        key={item.id}
                      ></li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
        <div className="buttons-row">
          <button
            id="card-addtocart"
            style={{ marginRight: "auto", marginLeft: "auto" }}
            onClick={this.onAddClick}
          >
            {this.state.buttonText}
          </button>
        </div>
      </div>
    );
  }
}
