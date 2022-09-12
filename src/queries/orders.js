import { gql } from "@apollo/client";

export const QUERY = gql`
  query getOrders {
    orders {
      clientname
      country
      address
      phone
      email
      status
      date
      orderId
      items {
        productId
        productQuantity
        selectedAttributes
      }
    }
  }
`;
