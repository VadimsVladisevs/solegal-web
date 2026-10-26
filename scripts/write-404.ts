// GitHub Pages and Cloudflare Pages serve 404.html for unknown URLs. React
// Router's SPA fallback renders only the root route, so in the browser the root
// ErrorBoundary shows the 404 page in the URL's locale.
import { copyFileSync } from "node:fs";

copyFileSync("build/client/__spa-fallback.html", "build/client/404.html");
