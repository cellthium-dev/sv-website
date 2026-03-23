import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import React from "react";

function RootComponent() {
  const { pathname } = useLocation();

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is intentionally in deps to scroll to top on route change
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Outlet />;
}

export const Route = createRootRoute({
  component: RootComponent,
});
