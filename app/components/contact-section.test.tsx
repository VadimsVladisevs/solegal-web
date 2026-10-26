import { screen } from "@testing-library/react";
import { ContactSection } from "./contact-section";
import { renderAt } from "./test-utils";

describe("ContactSection", () => {
  it("renders email and phone as tap-to-act links", () => {
    renderAt(
      "/en/",
      <ContactSection
        variant="a"
        contactInfo={{ email: "info@example.com", phone: "+371 2000 0000" }}
      />,
    );
    expect(
      screen.getByRole("link", { name: "info@example.com" }),
    ).toHaveAttribute("href", "mailto:info@example.com");
    // The display string keeps its spaces; the tel: link drops them.
    expect(
      screen.getByRole("link", { name: "+371 2000 0000" }),
    ).toHaveAttribute("href", "tel:+37120000000");
  });
});
