import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Link } from "react-router-dom";
export default class CateogrySelector extends React.Component {
  static contextType = GlobalContext;

  render() {
    const { selectedCategory, setCategory } = this.context;
    return (
      <ul className="categories">
        {this.props.categories.map((category) => {
          return (
            <Link to="/" key={category.name}>
              <li
                onClick={() => setCategory(category.name)}
                className={selectedCategory === category.name ? "active" : ""}
              >
                {category.name}
              </li>
            </Link>
          );
        })}
      </ul>
    );
  }
}
