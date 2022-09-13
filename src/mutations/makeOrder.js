import { gql } from "@apollo/client";

export const MUTATION = gql`
  mutation makeOrder($order: OrderInput!) {
    makeOrder(order: $order)
  }
`;
