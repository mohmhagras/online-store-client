import React from "react";
import Attributes from "../components/Cart/Attributes";
import Gallery from "../components/Cart/Gallery";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
export default class Cart extends React.Component {
  state = {
    orderTotalCost: 0,
  };
  static contextType = GlobalContext;

  render() {
    const { cart, selectedCurrency, totalQuantity } = this.context;
    const { label, symbol } = selectedCurrency;
    let totalOrderCost = 0;
    console.log(cart);
    return (
      <main className="cart">
        <h2>
          <strong>CART</strong>
        </h2>
        <hr></hr>
        {!cart.length && <h2>Your cart is empty.</h2>}
        {cart.map((item, index) => {
          const { name, brand, gallery, prices, attributes } = item.productData;
          const selectedAttributes = item.selectedAttributes;
          const itemPrice = prices.find(
            (price) => price.currency.label === label
          );
          totalOrderCost += itemPrice.amount * item.quantity;
          return (
            <div key={index}>
              <div className="cart-product-container">
                <div>
                  <h2 className="brand">{brand}</h2>
                  <h2>{name}</h2>
                  <h3
                    style={{
                      fontSize: "24px",
                      marginTop: "0px",
                      fontWeight: "700",
                    }}
                  >{`${symbol} ${itemPrice.amount.toFixed(2)}`}</h3>
                  <Attributes
                    attributes={attributes}
                    selectedAttributes={selectedAttributes}
                  />
                </div>
                <Gallery
                  images={gallery}
                  quantity={item.quantity}
                  productIndexInCart={index}
                />
              </div>
              <hr></hr>
            </div>
          );
        })}
        {cart.length > 0 && (
          <div id="order-details">
            <h2>
              Tax 21%:{" "}
              <strong>{`${symbol} ${(0.21 * totalOrderCost).toFixed(
                2
              )}`}</strong>
            </h2>
            <h2>
              Quantity: <strong>{totalQuantity}</strong>
            </h2>
            <h2>
              Total:{" "}
              <strong>{`${symbol} ${(
                totalOrderCost +
                0.21 * totalOrderCost
              ).toFixed(2)}`}</strong>
            </h2>
            <Link to={"/checkout"}>
              <button className="green-large-button">CHECKOUT</button>
            </Link>
          </div>
        )}
      </main>
    );
  }
}
