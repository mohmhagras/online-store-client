import React from "react";

export default class Attributes extends React.PureComponent {
  render() {
    const { attributes, selectedAttributes } = this.props;
    return (
      <div className="product-details">
        <div id="attributes-container">
          {attributes.map((attribute) => {
            const { name, type, items } = attribute;
            return (
              <div key={attribute.id}>
                <h3>{`${name}:`}</h3>
                {type !== "swatch" ? (
                  <ul>
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className={`attribute ${
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
                        className={`color ${
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
