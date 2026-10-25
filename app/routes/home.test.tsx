import { render, screen } from "@testing-library/react";
import Home from "./home";

describe("Home", () => {
  it("renders the main landmark", () => {
    render(<Home />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });
});
