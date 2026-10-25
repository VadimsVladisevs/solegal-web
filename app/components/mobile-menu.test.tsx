import { act, fireEvent, screen } from "@testing-library/react";
import { MobileMenu } from "./mobile-menu";
import { renderAt } from "./test-utils";

/** A controllable `matchMedia` (jsdom has none). */
function mockMatchMedia() {
  const listeners = new Set<() => void>();
  const query = {
    matches: false,
    addEventListener: (_: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_: string, listener: () => void) =>
      listeners.delete(listener),
  };
  vi.stubGlobal("matchMedia", () => query);
  return {
    resizeToDesktop() {
      query.matches = true;
      act(() => listeners.forEach((listener) => listener()));
    },
  };
}

function setup() {
  const media = mockMatchMedia();
  renderAt("/en/", <MobileMenu />);
  const button = screen.getByRole("button", { name: "Menu" });
  const panel = document.getElementById(button.getAttribute("aria-controls")!)!;
  return { media, button, panel };
}

afterEach(() => vi.unstubAllGlobals());

describe("MobileMenu", () => {
  it("toggles the panel with the button", () => {
    const { button, panel } = setup();
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(panel).not.toBeVisible();

    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAccessibleName("Close");
    expect(panel).toBeVisible();

    fireEvent.click(button);
    expect(panel).not.toBeVisible();
  });

  it("holds the nav links and the language switcher", () => {
    const { button } = setup();
    fireEvent.click(button);
    expect(screen.getByRole("link", { name: "Team" })).toHaveAttribute(
      "href",
      "#team",
    );
    expect(
      screen.getByRole("navigation", { name: "Language" }),
    ).toBeInTheDocument();
  });

  it("closes when a link is followed", () => {
    const { button, panel } = setup();
    fireEvent.click(button);
    fireEvent.click(screen.getByRole("link", { name: "Contact" }));
    expect(panel).not.toBeVisible();
  });

  it("closes on Escape and returns focus to the button", () => {
    const { button, panel } = setup();
    fireEvent.click(button);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(panel).not.toBeVisible();
    expect(button).toHaveFocus();
  });

  it("closes when the viewport grows past the breakpoint", () => {
    const { media, button, panel } = setup();
    fireEvent.click(button);
    media.resizeToDesktop();
    expect(panel).not.toBeVisible();
  });
});
