import { screen } from "@testing-library/react";
import { ServicesSection } from "./services-section";
import { renderAt } from "./test-utils";

describe("ServicesSection", () => {
  it("renders the localized heading and one card per service", () => {
    renderAt(
      "/lv/",
      <ServicesSection
        services={[
          { title: "Līgumi", description: "Lorem ipsum." },
          { title: "Darba tiesības", description: "Dolor sit amet." },
        ]}
      />,
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Kā mēs varam palīdzēt" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(2);
    expect(
      screen.getByRole("heading", { level: 3, name: "Līgumi" }),
    ).toBeInTheDocument();
  });
});
