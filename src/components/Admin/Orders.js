import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { QUERY } from "../../queries/orders";
import { withRouter } from "react-router-dom";

import Order from "./Order";
import Loader from "../Loader";
class Orders extends React.Component {
  state = {
    email: "",
    password: "",
    buttonText: "LOGIN",
  };

  logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    this.props.history.go(0);
  };
  render() {
    const { data } = this.props;
    if (data.loading) return <Loader />;
    if (data.error)
      return (
        <div>
          <h1>{data.error.message}</h1>
          <button id="logout-button" onClick={this.logout}>
            LOGOUT
          </button>
        </div>
      );
    return (
      <section>
        <div id="orders-head">
          <h2>
            <strong>ORDERS</strong>
          </h2>
          <div>
            <button id="logout-button" onClick={this.logout}>
              LOGOUT
            </button>
          </div>
        </div>
        <table id="orders-table">
          <thead>
            <tr>
              <th>ORDER NO</th>
              <th>DATE</th>
              <th>CLIENT</th>
              <th>ITEMS</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order, index) => {
              return <Order order={order} key={index} />;
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

export default graphql(QUERY, {
  options: {
    context: {
      headers: {
        email: localStorage.getItem("email"),
        password: localStorage.getItem("password"),
      },
    },
    fetchPolicy: "network-only",
  },
})(withRouter(Orders));
