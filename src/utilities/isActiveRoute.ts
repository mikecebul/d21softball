export const isActiveRoute = (currentRouteHref: string, providedRouteHref: string) =>
  (currentRouteHref === '/' && providedRouteHref === 'home') ||
  currentRouteHref.includes(providedRouteHref)
