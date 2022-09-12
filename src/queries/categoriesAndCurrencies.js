import { gql } from "@apollo/client";

export const QUERY = gql`
  query getCategoriesAndCurrencies {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;
