import React from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { Query } from "@apollo/client/react/components";
import ProductCard from "./ProductCard";
import { QUERY } from "../../queries/productsByCategory";
import Loader from "../Loader";
export default class ProductsList extends React.Component {
  static contextType = GlobalContext;

  render() {
    const { selectedCategory } = this.context;

    return (
      <Query query={QUERY} variables={{ input: { title: selectedCategory } }}>
        {({ loading, error, data }) => {
          if (error) return <h1>{error.message}</h1>;
          if (loading || !data) return <Loader />;
          const { category } = data;
          return (
            <section className="products-list">
              {category.products.map((product) => {
                return <ProductCard product={product} key={product.id} />;
              })}
            </section>
          );
        }}
      </Query>
    );
  }
}
