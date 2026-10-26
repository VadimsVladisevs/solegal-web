import { screen, within } from "@testing-library/react";
import { DesignSwitcher } from "./design-switcher";
import { renderAt } from "./test-utils";

describe("DesignSwitcher", () => {
  it("links to each variant in the current locale and marks the current one", () => {
    renderAt("/lv/", <DesignSwitcher />);
    const nav = screen.getByRole("navigation", { name: "Dizains" });
    const links = within(nav).getAllByRole("link");
    expect(links.map((link) => link.getAttribute("href"))).toEqual([
      "/lv/",
      "/lv/b/",
      "/lv/c/",
    ]);
    expect(links.map((link) => link.textContent)).toEqual(["A", "B", "C"]);
    expect(links[0]).toHaveAttribute("aria-current", "page");
    expect(links[1]).not.toHaveAttribute("aria-current");
  });
});
