import React from "react";
import { Mutation } from "@apollo/client/react/components";
import { MUTATION } from "../../mutations/updateOrderStatus";
import { QUERY as Orders } from "../../queries/orders";
import { withRouter } from "react-router-dom";

class Order extends React.Component {
  state = {
    isModalOpen: false,
  };
  closeProductModal = () => {
    this.setState({ isModalOpen: false });
  };
  render() {
    const { clientname, email, status, orderId, date, items } =
      this.props.order;
    const statusDetails = {
      processing: {
        text: "Processing",
        bg: "#edf2f7",
        color: "#19202c",
        next: "ontheway",
        action: "Mark as out for shipping",
      },
      ontheway: {
        text: "On the way",
        bg: "#e9d9fd",
        color: "#43337a",
        next: "delivered",
        action: "Mark as delivered",
      },
      delivered: {
        text: "Delivered",
        bg: "#c6f6d4",
        color: "#22543e",
        action: "",
        next: "",
      },
    };
    return (
      <>
        <Mutation
          mutation={MUTATION}
          variables={{
            orderUpdate: {
              orderId: orderId,
              email: email,
              status: statusDetails[status].next,
            },
          }}
          refetchQueries={[{ query: Orders }]}
        >
          {(mutate) => (
            <tr>
              <td>{orderId}</td>
              <td id="date">{date}</td>
              <td>
                {clientname}
                <br></br>
                <span id="email">{email}</span>
              </td>
              <td>
                <button
                  id="view-items"
                  onClick={() => {
                    this.setState({ isModalOpen: true });
                  }}
                >
                  Order Items
                </button>
              </td>
              <td>
                <h3
                  id="status"
                  style={{
                    backgroundColor: statusDetails[status].bg,
                    color: statusDetails[status].color,
                  }}
                >
                  {statusDetails[status].text}
                </h3>
                <h4
                  id="modify-status"
                  onClick={async () => {
                    console.log("yes");
                    try {
                      const response = await mutate();
                      if (response) this.props.history.go(0);
                    } catch (error) {
                      console.log(error.message);
                    }
                  }}
                >
                  {statusDetails[status].action}
                </h4>
              </td>
            </tr>
          )}
        </Mutation>
        {this.state.isModalOpen && (
          <ProductModal
            items={items}
            closeProductModal={this.closeProductModal}
          />
        )}
      </>
    );
  }
}

class ProductModal extends React.PureComponent {
  render() {
    const { items, closeProductModal } = this.props;
    return (
      <div id="product-modal">
        <table>
          <thead>
            <tr>
              <th>PRODUCT ID</th>
              <th>ATTRIBUTES</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              let attributes = Object.values(
                JSON.parse(item.selectedAttributes)
              );

              return (
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>
                    {attributes.map((attr) => {
                      return (
                        <div key={attr}>
                          {attr}
                          <br></br>
                        </div>
                      );
                    })}
                  </td>
                  <td>{item.productQuantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={closeProductModal}>Cancel</button>
      </div>
    );
  }
}

export default withRouter(Order);
