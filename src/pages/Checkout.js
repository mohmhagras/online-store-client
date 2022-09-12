import React from "react";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import MiniCartProducts from "../components/MiniCart/MiniCartProducts";
import { GlobalContext } from "../context/GlobalContext";
export default class Checkout extends React.Component {
  static contextType = GlobalContext;
  render() {
    return (
      <main>
        <h2>
          <strong>CHECKOUT AS A GUEST</strong>
        </h2>
        <section id="checkout-wrapper">
          <CheckoutForm />
          <div style={{ width: "90%", maxWidth: "600px" }}>
            <div>
              <h4>Your Order ({this.context.totalQuantity} items): </h4>
            </div>
            <MiniCartProducts isInCheckOut={true} />
          </div>
        </section>
      </main>
    );
  }
}
