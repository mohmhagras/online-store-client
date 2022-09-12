import React from "react";
import ArrowDown from "../../images/arrow.svg";
import { Mutation } from "@apollo/client/react/components";
import { GlobalContext } from "../../context/GlobalContext";
import { withRouter } from "react-router-dom";
import { MUTATION } from "../../mutations/makeOrder";
import { QUERY as Orders } from "../../queries/orders";
class CheckoutForm extends React.Component {
  state = {
    clientname: "",
    country: "",
    address: "",
    phoneNumber: "",
    email: "",
    isCountriesListOpen: false,
    countries: [],
    displayedCountries: [],
    buttonText: "PLACE ORDER",
  };
  static contextType = GlobalContext;

  async componentDidMount() {
    const countries = await fetch(
      "https://restcountries.com/v2/all?fields=name,alpha2Code,callingCodes,flags"
    );
    const countriesJSON = await countries.json();
    this.setState({
      countries: countriesJSON,
      displayedCountries: countriesJSON,
    });
  }

  searchInCountries = (event) => {
    this.setState({
      displayedCountries: this.state.countries.filter((country) =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      ),
      country: event.target.value,
      isCountriesListOpen: true,
    });
  };

  validateOrder = () => {
    let orderInvalid = false;
    this.context.cart.forEach((item) => {
      if (item.productData.stock < item.quantity || !item.productData.stock) {
        orderInvalid = true;
        return;
      }
      console.log(item.productData.stock, item.quantity);
    });
    return !orderInvalid;
  };

  render() {
    const { cart, clearCartItems } = this.context;
    return (
      <Mutation
        mutation={MUTATION}
        refetchQueries={[{ query: Orders }]}
        variables={{
          order: {
            clientname: this.state.clientname,
            address: this.state.address,
            country: this.state.country,
            phone: this.state.phoneNumber,
            email: this.state.email,
            items: cart.map((item) => ({
              productId: item.productData.id,
              productQuantity: item.quantity,
              selectedAttributes: JSON.stringify(item.selectedAttributes),
            })),
          },
        }}
      >
        {(mutate) => (
          <form
            id="form"
            onSubmit={async (event) => {
              event.preventDefault();
              if (this.validateOrder()) {
                this.setState({ buttonText: "PLACING YOUR ORDER" });
                const response = await mutate();
                if (response.data) {
                  this.setState({
                    buttonText: "ORDER MADE!",
                  });
                  clearCartItems();
                  setTimeout(() => {
                    this.props.history.push("/");
                  }, 3000);
                }
              } else {
                alert("Order Invalid");
              }
            }}
          >
            <label for="name">
              Full Name
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="text"
              name="name"
              required
              pattern="\D{0,99}"
              placeholder="John Doe"
              onChange={(event) =>
                this.setState({ clientname: event.target.value })
              }
            />
            <label for="email">
              Email
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="john@mail.net"
              onChange={(event) => this.setState({ email: event.target.value })}
            />
            <label for="country">
              Country
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <div
              className="input-container"
              onClick={() =>
                this.setState((prevState) => ({
                  isCountriesListOpen: !prevState.isCountriesListOpen,
                }))
              }
            >
              <input
                type="text"
                name="country"
                required
                value={this.state.country}
                onChange={this.searchInCountries}
                placeholder="Type to search or choose"
              />
              <img
                src={ArrowDown}
                alt="arrow down"
                width={12}
                height={6}
                className={`input-arrow-down ${
                  this.state.isCountriesListOpen ? "rotate" : ""
                }`}
              />
              {this.state.isCountriesListOpen && (
                <div className="dropdown">
                  <ul>
                    {this.state.displayedCountries.map((country, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() =>
                            this.setState({
                              country: country.name,
                              phoneNumber: `+${country.callingCodes[0]}`,
                            })
                          }
                        >
                          <img
                            src={country.flags.svg}
                            alt={country.name}
                            width={20}
                            height={10}
                            style={{ marginRight: "10px" }}
                          />
                          {country.name}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
            <label for="phone">
              Phone Number
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="tel"
              name="phone"
              required
              pattern="^[\+]\d{11,13}"
              placeholder="+1 555 555 1234"
              value={`${this.state.phoneNumber}`}
              onChange={(event) =>
                this.setState({ phoneNumber: event.target.value })
              }
            />
            <label for="address">
              Address
              <sup style={{ color: "red" }}>*</sup>
            </label>
            <input
              type="text"
              name="adress"
              required
              placeholder="500 5TH Ave , New York, NY"
              onChange={(event) =>
                this.setState({ address: event.target.value })
              }
            />
            <div style={{ display: "flex", alignItems: "center" }}>
              <h4>Payment method:</h4>
              <div id="custom-radio"></div>
              <h4>
                <strong>Cash on Delivery</strong>
              </h4>
            </div>
            <button
              style={{ marginTop: "20px", marginBottom: "50px" }}
              className={`green-large-button ${cart.length ? "" : "disabled"}`}
              type="submit"
              disabled={!cart.length}
            >
              {this.state.buttonText}
            </button>
          </form>
        )}
      </Mutation>
    );
  }
}

export default withRouter(CheckoutForm);
