import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import WhiteCart from "../../images/whiteCart.svg";
import checkmark from "../../images/checkmark.png";
import CardAttributes from "./CardAttributes";

export default class ProductCard extends React.Component {
  static contextType = GlobalContext;
  state = {
    isAttributesOpen: false,
    showCheckMark: false,
  };
  onAddToCartClick = (event) => {
    event.preventDefault();
    const { attributes } = this.props.product;
    const { addItemToCart } = this.context;
    if (!attributes.length) {
      addItemToCart(this.props.product, {});
      this.setState({ showCheckMark: true });
      setTimeout(() => {
        this.setState({ showCheckMark: false });
      }, 3000);
    } else {
      this.setState({ isAttributesOpen: true });
    }
  };

  onAddingToCart = () => {
    this.setState({ isAttributesOpen: false });
  };
  render() {
    const { name, gallery, prices, stock, brand, id, attributes } =
      this.props.product;
    const { selectedCurrency } = this.context;
    //display the item's price in the currency set by the user
    const itemPrice = prices.find(
      (price) => price.currency.label === selectedCurrency.label
    );
    return (
      <Link
        className={`product-card ${!stock && `out-of-stock`}`}
        id={this.state.isAttributesOpen ? "card-highlight" : ""}
        to={`/product/${id}`}
      >
        <img src={gallery[0]} width={350} height={330} alt="" />
        {!this.state.isAttributesOpen && (
          <div className="mini-cart-icon" onClick={this.onAddToCartClick}>
            {this.state.showCheckMark ? (
              <img src={checkmark} width={32} height={32} alt="" />
            ) : (
              <img src={WhiteCart} alt="" />
            )}
          </div>
        )}
        {!stock && <h3 className="out-of-stock-text">OUT OF STOCK</h3>}
        <h3>{brand + " " + name}</h3>
        <h3 className="price">
          {selectedCurrency.symbol + "   " + itemPrice.amount.toFixed(2)}
        </h3>
        {this.state.isAttributesOpen && (
          <div
            className="card-attributes"
            onClick={(event) => event.preventDefault()}
          >
            <h4 style={{ marginBottom: "6px" }}>Select product attributes</h4>
            <CardAttributes
              attributes={attributes}
              product={this.props.product}
              onAddingToCart={this.onAddingToCart}
            />
            <button
              id="cancel"
              onClick={() => this.setState({ isAttributesOpen: false })}
            >
              X
            </button>
          </div>
        )}
        {!this.state.isAttributesOpen && stock < 5 && stock > 0 && (
          <p id="limited-stock">Limited Stock!</p>
        )}
      </Link>
    );
  }
}
