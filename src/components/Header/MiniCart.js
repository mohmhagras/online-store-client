import React from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import Cart from "../../pages/Cart";
import Attributes from "../Cart/Attributes";
import MiniCartProducts from "../MiniCart/MiniCartProducts";
export default class MiniCart extends React.Component {
  static contextType = GlobalContext;

  render() {
    const { totalQuantity } = this.context;
    return (
      <div className="mini-cart">
        <h4>
          <strong>My Bag,</strong>
          {` ${totalQuantity} items`}
        </h4>
        <MiniCartProducts />
        <div className="buttons-row">
          <Link to="/cart">
            <button id="view-bag">VIEW BAG</button>
          </Link>
          <Link to="/checkout">
            <button id="check-out">CHECK OUT</button>
          </Link>
        </div>
      </div>
    );
  }
}
