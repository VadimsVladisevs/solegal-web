import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/root-redirect.tsx"),
  route(":lang", "routes/lang.tsx", [
    index("routes/home.tsx"),
    // Design variants B and C (same page for now; removed in step 11).
    route("b", "routes/home.tsx", { id: "routes/home-b" }),
    route("c", "routes/home.tsx", { id: "routes/home-c" }),
  ]),
] satisfies RouteConfig;
