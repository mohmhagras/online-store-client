import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import MiniAttributes from "./MiniAttributes";
import MiniGallery from "./MiniGallery";
export default class MiniCartProducts extends React.Component {
  static contextType = GlobalContext;
  render() {
    const { cart, selectedCurrency } = this.context;
    const { label, symbol } = selectedCurrency;
    let totalOrderCost = 0;
    const { isInCheckOut } = this.props;

    return (
      <>
        {cart.map((item, index) => {
          const { name, brand, gallery, prices, attributes } = item.productData;
          const selectedAttributes = item.selectedAttributes;
          const itemPrice = prices.find(
            (price) => price.currency.label === label
          );
          totalOrderCost += itemPrice.amount * item.quantity;
          return (
            <div key={index}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  lineHeight: 0,
                  flexWrap: isInCheckOut ? "wrap" : "nowrap",
                }}
              >
                <div>
                  <h4 className="brand">{brand}</h4>
                  <h4 style={{ lineHeight: 1 }}>{name}</h4>
                  <h4
                    style={{
                      marginTop: "0px",
                      fontWeight: "700",
                    }}
                  >{`${symbol} ${itemPrice.amount.toFixed(2)}`}</h4>
                  <MiniAttributes
                    attributes={attributes}
                    selectedAttributes={selectedAttributes}
                  />
                </div>
                <MiniGallery
                  images={gallery}
                  quantity={item.quantity}
                  productIndexInCart={index}
                />
              </div>
              <hr></hr>
            </div>
          );
        })}

        {isInCheckOut ? (
          <>
            <h3>
              Tax 21%:{" "}
              <strong>{`${symbol} ${(0.21 * totalOrderCost).toFixed(
                2
              )}`}</strong>
            </h3>
            <h3>
              Total:{" "}
              <strong>{`${symbol} ${(
                totalOrderCost +
                0.21 * totalOrderCost
              ).toFixed(2)}`}</strong>
            </h3>
          </>
        ) : (
          <h4>
            Total:{" "}
            <strong>{`${symbol} ${(
              totalOrderCost +
              0.21 * totalOrderCost
            ).toFixed(2)}`}</strong>
          </h4>
        )}
      </>
    );
  }
}
