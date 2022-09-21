import React, { lazy, Suspense } from "react";
import { Query } from "@apollo/client/react/components";

import Logo from "../../images/shop.png";
import CartIcon from "../../images/cart.svg";
import CateogrySelector from "./CategorySelector";
import CurrencySelector from "./CurrencySelector";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
import { QUERY } from "../../queries/categoriesAndCurrencies";
//import MiniCart from "./MiniCart";
const MiniCart = lazy(() => import("./MiniCart"));

class Header extends React.Component {
  state = {
    isCartOpen: false,
  };

  componentDidUpdate() {
    if (this.state.isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }

  static contextType = GlobalContext;
  render() {
    const { totalQuantity } = this.context;
    return (
      <Query query={QUERY}>
        {({ loading, error, data, refetch }) => {
          if (error) {
            refetch();
          }
          if (loading || !data) return <header></header>;
          const { categories, currencies } = data;
          return (
            <>
              <header
                onClick={(event) => {
                  if (
                    event.target.id === "view-bag" ||
                    event.target.id === "check-out"
                  ) {
                    this.setState({ isCartOpen: false });
                  }
                }}
              >
                <CateogrySelector categories={categories} />
                <Link to="/">
                  <img
                    src={Logo}
                    alt="Logo"
                    width={41}
                    height={41}
                    className="logo"
                  />
                </Link>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <CurrencySelector currencies={currencies} />
                  <div
                    className="cart-icon-container"
                    onClick={() => {
                      this.setState((prevState) => ({
                        isCartOpen: !prevState.isCartOpen,
                      }));
                    }}
                    defaultValue="cart"
                  >
                    <img
                      src={CartIcon}
                      alt="Cart Icon"
                      width={20}
                      height={20}
                      className="cart-icon"
                    />
                    {totalQuantity > 0 && (
                      <div className="cart-items-counter">{totalQuantity}</div>
                    )}
                  </div>
                  {this.state.isCartOpen && (
                    <Suspense>
                      <MiniCart />
                    </Suspense>
                  )}
                </div>
              </header>
              {this.state.isCartOpen && (
                <div
                  id="overlay"
                  className="overlay-bg"
                  onClick={() => this.setState({ isCartOpen: false })}
                ></div>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default Header;
