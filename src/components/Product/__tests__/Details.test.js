import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Details from "../Details";
import { GlobalContext } from "../../../context/GlobalContext";
const product = {
  name: "Nike Air Huarache Le",
  id: "huarache-x-stussy-le",
  inStock: true,
  brand: "Nike x Stussy",
  gallery: [
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
    "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
  ],
  prices: [
    {
      currency: {
        label: "USD",
      },
      amount: 144.69,
    },
    {
      currency: {
        label: "GBP",
      },
      amount: 104,
    },
    {
      currency: {
        label: "AUD",
      },
      amount: 186.65,
    },
    {
      currency: {
        label: "JPY",
      },
      amount: 15625.24,
    },
    {
      currency: {
        label: "RUB",
      },
      amount: 10941.76,
    },
  ],
  attributes: [
    {
      id: "Size",
      name: "Size",
      type: "text",
      _id: [
        {
          displayValue: "40",
          id: "40",
          value: "40",
        },
        {
          displayValue: "41",
          id: "41",
          value: "41",
        },
        {
          displayValue: "42",
          id: "42",
          value: "42",
        },
        {
          displayValue: "43",
          id: "43",
          value: "43",
        },
      ],
    },
  ],
};

const MockDetails = () => {
  return (
    <GlobalContext>
      <Details product={product} />
    </GlobalContext>
  );
};

test("product is added to cart after selecting attributes", () => {
  render(<MockDetails />);

  screen.getAllByRole("");
});
