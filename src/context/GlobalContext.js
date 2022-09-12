import React from "react";

export const GlobalContext = React.createContext();

export class GlobalProvider extends React.Component {
  state = {
    selectedCategory:
      JSON.parse(sessionStorage.getItem("selectedCategory")) || "all",
    selectedCurrency: JSON.parse(localStorage.getItem("selectedCurrency")) || {
      label: "USD",
      symbol: "$",
    },
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    totalQuantity: JSON.parse(localStorage.getItem("totalQuantity")) || 0,
  };

  setCategory = (category) => {
    this.setState({ selectedCategory: category });
  };
  setCurrency = ({ label, symbol }) => {
    this.setState({ selectedCurrency: { label, symbol } });
  };
  componentDidUpdate() {
    //updating session and local storage with the most recent user selection
    localStorage.setItem(
      "selectedCurrency",
      JSON.stringify(this.state.selectedCurrency)
    );
    localStorage.setItem("cart", JSON.stringify(this.state.cart));
    sessionStorage.setItem(
      "selectedCategory",
      JSON.stringify(this.state.selectedCategory)
    );
    localStorage.setItem(
      "totalQuantity",
      JSON.stringify(this.state.totalQuantity)
    );
  }

  addItemToCart = (productData, selectedAttributes) => {
    //add to cart function checks if the product already exists with the same attributes, if so it just increases the quantity of the existing product
    const { cart } = this.state;
    let i;
    for (i = 0; i < cart.length; i++) {
      if (cart[i].productData.id === productData.id) {
        if (
          JSON.stringify(cart[i].selectedAttributes) ===
          JSON.stringify(selectedAttributes)
        ) {
          this.modifyItemQuantity(i, "increase");
          return;
        } else {
          console.log("in cart:" + JSON.stringify(cart[i].selectedAttributes));
          console.log(
            "about to be added:" + JSON.stringify(selectedAttributes)
          );
        }
      }
    }
    this.setState((prevState) => ({
      cart: [
        ...prevState.cart,
        { productData, selectedAttributes, quantity: 1 },
      ],
      totalQuantity: prevState.totalQuantity + 1,
    }));
  };

  removeItemFromCart = (productIndex) => {
    this.setState((prevState) => ({
      cart: prevState.cart.filter((item, index) => index !== productIndex),
      totalQuantity: prevState.totalQuantity - 1,
    }));
  };

  modifyItemQuantity = (productIndexInCart, mode) => {
    if (
      mode === "decrease" &&
      this.state.cart[productIndexInCart].quantity === 1
    ) {
      this.removeItemFromCart(productIndexInCart);
      return;
    }
    const difference = mode === "increase" ? 1 : -1;
    this.setState((prevState) => {
      const newCart = [...this.state.cart];
      newCart[productIndexInCart] = {
        ...prevState.cart[productIndexInCart],
        quantity: prevState.cart[productIndexInCart].quantity + difference,
      };
      return {
        cart: newCart,
        totalQuantity: prevState.totalQuantity + difference,
      };
    });
  };

  clearCartItems = () => {
    this.setState({ cart: [], totalQuantity: 0 });
  };

  render() {
    const { selectedCategory, selectedCurrency, cart, totalQuantity } =
      this.state;
    const {
      setCategory,
      setCurrency,
      addItemToCart,
      removeItemFromCart,
      modifyItemQuantity,
      clearCartItems,
    } = this;
    return (
      <GlobalContext.Provider
        value={{
          selectedCategory,
          selectedCurrency,
          cart,
          setCategory,
          setCurrency,
          addItemToCart,
          removeItemFromCart,
          modifyItemQuantity,
          totalQuantity,
          clearCartItems,
        }}
      >
        {this.props.children}
      </GlobalContext.Provider>
    );
  }
}
