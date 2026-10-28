import { screen, within } from "@testing-library/react";
import { Header } from "./header";
import { renderAt } from "./test-utils";

describe("Header", () => {
  it("links the logo to the top of the page", () => {
    renderAt("/en/", <Header variant="a" firmName="SO Legal" />);
    const logo = screen.getByRole("img", { name: "SO Legal" });
    expect(logo.closest("a")).toHaveAttribute("href", "#top");
  });

  it("has anchor navigation to every section, in the page locale", () => {
    renderAt("/ru/", <Header variant="a" firmName="SO Legal" />);
    // Desktop nav and the (closed) mobile menu share the same links.
    const [desktop] = screen.getAllByRole("navigation", {
      name: "Основная навигация",
    });
    const links = within(desktop!).getAllByRole("link");
    expect(
      links.map((link) => [link.textContent, link.getAttribute("href")]),
    ).toEqual([
      ["О нас", "#about"],
      ["Услуги", "#services"],
      ["Команда", "#team"],
      ["Контакты", "#contact"],
    ]);
  });

  it("is green with light text in variant B", () => {
    renderAt("/en/b/", <Header variant="b" firmName="SO Legal" />);
    expect(screen.getByRole("banner")).toHaveClass("bg-brand", "text-on-brand");
  });
});
