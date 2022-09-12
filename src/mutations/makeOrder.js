import { gql } from "@apollo/client";

export const MUTATION = gql`
  mutation ($order: OrderInput!) {
    makeOrder(order: $order)
  }
`;
