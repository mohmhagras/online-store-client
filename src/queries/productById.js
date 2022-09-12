import { gql } from "@apollo/client";

export const QUERY = gql`
  query getProductDetails($id: String!) {
    product(id: $id) {
      name
      stock
      brand
      id
      gallery
      description
      prices {
        currency {
          label
        }
        amount
      }
      attributes {
        id
        name
        type
        # Disable  caching for attributes to avoid mixing products with same attribute ID
        __typename @skip(if: true)
        items {
          displayValue
          id
          value
        }
      }
    }
  }
`;
