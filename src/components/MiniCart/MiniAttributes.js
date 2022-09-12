import React from "react";

export default class MiniAttributes extends React.PureComponent {
  render() {
    const { attributes, selectedAttributes } = this.props;
    return (
      <div className="product-details small">
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
      </div>
    );
  }
}
