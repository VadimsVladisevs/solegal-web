import { screen, within } from "@testing-library/react";
import { LanguageSwitcher } from "./language-switcher";
import { renderAt } from "./test-utils";

function links() {
  const nav = screen.getByRole("navigation", { name: "Valoda" });
  return within(nav).getAllByRole("link");
}

describe("LanguageSwitcher", () => {
  it("links to the same page in each locale, keeping the variant", () => {
    renderAt("/lv/b/", <LanguageSwitcher />);
    expect(links().map((link) => link.getAttribute("href"))).toEqual([
      "/en/b/",
      "/lv/b/",
      "/ru/b/",
    ]);
  });

  it("uses the trailing-slash form", () => {
    renderAt("/lv/c", <LanguageSwitcher />);
    expect(links()[2]).toHaveAttribute("href", "/ru/c/");
  });

  it("marks the current locale and labels each link with its language", () => {
    renderAt("/lv/", <LanguageSwitcher />);
    const [en, lv] = links();
    expect(lv).toHaveAttribute("aria-current", "page");
    expect(en).not.toHaveAttribute("aria-current");
    expect(en).toHaveAttribute("lang", "en");
    expect(en).toHaveAttribute("hreflang", "en");
    expect(en).toHaveTextContent("en");
  });
});
