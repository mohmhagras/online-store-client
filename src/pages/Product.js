import React from "react";
import { Query } from "@apollo/client/react/components";
import Gallery from "../components/Product/Gallery";
import Details from "../components/Product/Details";
import { withRouter } from "react-router-dom";
import { QUERY } from "../queries/productById";
import Loader from "../components/Loader";
class Product extends React.Component {
  state = {
    id: "",
  };
  componentDidMount() {
    this.setState({ id: this.props.match.params.productId });
  }
  render() {
    if (this.state.id === "") return null;
    return (
      <Query query={QUERY} variables={{ id: this.state.id }}>
        {({ loading, error, data }) => {
          if (error) return <h1>{error.message}</h1>;
          if (loading || !data) return <Loader />;
          // const { name, brand, description, gallery, attributes } = data.product;
          return (
            <main className="product">
              <Gallery images={data.product.gallery} />
              <Details product={data.product} />
            </main>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Product);
