import { render, screen } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { useLocale, useT } from "~/lib/i18n/use-t";
import Home, { loader as homeLoader } from "./home";
import LangLayout, { loader as langLoader } from "./lang";

function NavProbe() {
  const t = useT();
  return (
    <p>
      {useLocale()}: {t.nav.about}
    </p>
  );
}

// The stub passes untyped params; route loaders expect their generated types.
const stubLoader =
  <Args, Result>(loader: (args: Args) => Result) =>
  (args: unknown) =>
    loader(args as Args);

function renderAt(path: string) {
  const Stub = createRoutesStub([
    {
      path: "/:lang",
      Component: LangLayout,
      loader: stubLoader(langLoader),
      children: [
        {
          index: true,
          Component: NavProbe,
        },
        { path: "b", Component: Home, loader: stubLoader(homeLoader) },
      ],
    },
  ]);
  render(<Stub initialEntries={[path]} />);
}

describe(":lang route", () => {
  it("provides the locale dictionary to useT()", async () => {
    renderAt("/lv/");
    expect(await screen.findByText("lv: Par mums")).toBeInTheDocument();
  });

  it("renders localized content through the content layer", async () => {
    renderAt("/ru/b");
    expect(
      await screen.findByRole("heading", {
        name: "Понятные юридические консультации для бизнеса и частных лиц",
      }),
    ).toBeInTheDocument();
  });

  it("responds 404 to an unknown locale", async () => {
    const error = await langLoader({
      params: { lang: "de" },
    } as Parameters<typeof langLoader>[0]).catch((e: unknown) => e);
    expect(error).toMatchObject({ init: { status: 404 } });
  });
});
