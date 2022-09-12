import React from "react";
import { GlobalContext } from "../context/GlobalContext";
import ProductsList from "../components/ProductsListing/ProductsList";

export default class Products extends React.Component {
  static contextType = GlobalContext;
  render() {
    const { selectedCategory } = this.context;
    return (
      <main>
        <h1>{selectedCategory}</h1>
        <ProductsList />
      </main>
    );
  }
}
