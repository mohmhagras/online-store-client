import { gql } from "@apollo/client";

export const MUTATION = gql`
  mutation updateOrderStatus($orderUpdate: OrderUpdateInput!) {
    updateOrderStatus(orderUpdate: $orderUpdate)
  }
`;
