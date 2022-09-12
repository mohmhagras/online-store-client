import NotFound from "../NotFound";
import { getAllByRole, render, screen } from "@testing-library/react";

test("Not found component displays proper text", () => {
  render(<NotFound />);
  const heading = screen.getByRole("heading");
  expect(heading).toHaveTextContent(
    "Sorry, the page you're looking for does not exist."
  );
});
