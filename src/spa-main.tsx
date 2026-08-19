import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { Route as IndexRouteImport } from "@/routes/index";
import { Route as LabRouteImport } from "@/routes/lab";
import { Route as LoginRouteImport } from "@/routes/login";
import { Route as WatchlistRouteImport } from "@/routes/watchlist";
import { Route as DetailRouteImport } from "@/routes/d.$id";
import { Route as SpopRouteImport } from "@/routes/spop";
import "./styles.css";

const spaRoot = createRootRoute({
  component: function SpaRoot() {
    return <Outlet />;
  },
});

const indexRoute = createRoute({
  getParentRoute: () => spaRoot,
  path: "/",
  component: IndexRouteImport.options.component,
});

const labRoute = createRoute({
  getParentRoute: () => spaRoot,
  path: "lab",
  component: LabRouteImport.options.component,
});

const loginRoute = createRoute({
  getParentRoute: () => spaRoot,
  path: "login",
  component: LoginRouteImport.options.component,
});

const watchlistRoute = createRoute({
  getParentRoute: () => spaRoot,
  path: "watchlist",
  component: WatchlistRouteImport.options.component,
});

const detailRoute = createRoute({
  getParentRoute: () => spaRoot,
  path: "d/$id",
  component: DetailRouteImport.options.component,
});

const spopRoute = createRoute({
  getParentRoute: () => spaRoot,
  path: "spop",
  component: SpopRouteImport.options.component,
});

const routeTree = spaRoot.addChildren([
  indexRoute,
  labRoute,
  loginRoute,
  watchlistRoute,
  detailRoute,
  spopRoute,
]);

const router = createRouter({
  routeTree,
  basepath: "/OncoVigil",
  defaultErrorComponent: AppErrorComponent,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const root = document.getElementById("root");
if (!root) throw new Error("#root missing");

createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
