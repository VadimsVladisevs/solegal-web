import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/root-redirect.tsx"),
  route(":lang", "routes/lang.tsx", [
    index("routes/home.tsx"),
    // Design variants B and C (removed in step 11).
    route("b", "routes/home-b.tsx"),
    route("c", "routes/home-c.tsx"),
  ]),
] satisfies RouteConfig;
