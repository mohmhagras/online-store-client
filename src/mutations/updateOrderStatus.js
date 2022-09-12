import { gql } from "@apollo/client";

export const MUTATION = gql`
  mutation ($orderUpdate: OrderUpdateInput!) {
    updateOrderStatus(orderUpdate: $orderUpdate)
  }
`;
