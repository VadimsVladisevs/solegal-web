import { DEFAULT_BASE_PATH, resolveBasePath } from "./base-path";

describe("resolveBasePath", () => {
  it("defaults to the GitHub Pages sub-path", () => {
    expect(resolveBasePath({})).toBe(DEFAULT_BASE_PATH);
  });

  it("uses BASE_PATH when set", () => {
    expect(resolveBasePath({ BASE_PATH: "/" })).toBe("/");
  });

  it("rejects a value without leading and trailing slashes", () => {
    expect(() => resolveBasePath({ BASE_PATH: "solegal-web" })).toThrow();
    expect(() => resolveBasePath({ BASE_PATH: "/solegal-web" })).toThrow();
  });
});
