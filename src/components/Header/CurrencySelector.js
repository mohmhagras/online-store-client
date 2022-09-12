import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import Arrow from "../../images/arrow.svg";

export default class CurrencySelector extends React.Component {
  static contextType = GlobalContext;

  state = {
    isCurrencyPickerOpen: false,
  };
  //open the currency selection menu
  toggleCurrencyPicker = () => {
    this.setState((prevState) => ({
      isCurrencyPickerOpen: !prevState.isCurrencyPickerOpen,
    }));
  };
  render() {
    const { selectedCurrency, setCurrency } = this.context;

    return (
      <>
        {this.state.isCurrencyPickerOpen && (
          <div
            id="overlay"
            style={{ top: 0 }}
            onClick={() => this.setState({ isCurrencyPickerOpen: false })}
          ></div>
        )}
        <div
          style={{
            position: "relative",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <div
            className="currency-switcher"
            onClick={this.toggleCurrencyPicker}
          >
            <p>{selectedCurrency.symbol}</p>
            <img
              src={Arrow}
              alt="Cart Icon"
              className={this.state.isCurrencyPickerOpen ? "rotate-arrow" : ""}
              width={6}
              height={3}
              style={{ marginTop: "auto", marginBottom: "auto" }}
            />
          </div>
          {this.state.isCurrencyPickerOpen && (
            <div className="currencies">
              <ul>
                {this.props.currencies.map((currency) => {
                  return (
                    <li
                      key={currency.label}
                      onClick={() => {
                        setCurrency(currency);
                        this.toggleCurrencyPicker();
                      }}
                    >
                      {currency.symbol + "    " + currency.label}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </>
    );
  }
}
