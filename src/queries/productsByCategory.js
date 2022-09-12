import { gql } from "@apollo/client";

export const QUERY = gql`
  query getCategoryProducts($input: CategoryInput!) {
    category(input: $input) {
      name
      products {
        id
        name
        stock
        brand
        gallery
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
  }
`;
