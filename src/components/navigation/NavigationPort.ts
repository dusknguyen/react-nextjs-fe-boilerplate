/** Route-independent navigation contract implemented by the host application. */
export interface NavigationPort<Route extends string = string> {
  back(): void;
  canGoBack?(): boolean;
  navigate(route: Route, params?: Readonly<Record<string, unknown>>): void;
  replace?(route: Route, params?: Readonly<Record<string, unknown>>): void;
}

/** External-link contract kept separate from in-app routing. */
export interface ExternalNavigationPort {
  open(url: URL): Promise<void> | void;
}
