// Define the interface for individual route items
export interface RouteItem {
  url: string;
  icon: string;
}

// Define the interface for a route section that can contain nested routes (children)
export interface RouteWithChildren extends RouteItem {
  children?: Record<string, RouteItem>;
}

export interface Routes {
  auth: Record<string, RouteItem | RouteWithChildren>;
  unAuth: Record<string, RouteItem | RouteWithChildren>;
  public: Record<string, RouteItem | RouteWithChildren>;
}

// Define the actual routes object with types based on the interface
export const routes: Routes = {
  auth: {
    dashboard: { url: '/dashboard', icon: 'bi bi-speedometer2' }, // Dashboard icon
    components: {
      url: '/components',
      icon: 'bi bi-box-seam', // Components icon
      children: {
        buttons: { url: '/components/buttons', icon: 'bi bi-ui-radios-grid' }, // Button component icon
        cards: { url: '/components/cards', icon: 'bi bi-card-text' }, // Card component icon
      },
    },
    charts: { url: '/charts', icon: 'bi bi-bar-chart-line' }, // Charts icon
    tables: { url: '/tables', icon: 'bi bi-table' }, // Tables icon
    utilities: {
      url: '/utilities',
      icon: 'bi bi-tools', // Utilities icon
      children: {
        color: { url: '/utilities/color', icon: 'bi bi-palette' }, // Color utility icon
        border: { url: '/utilities/border', icon: 'bi bi-border' }, // Border utility icon
        animation: { url: '/utilities/animation', icon: 'bi bi-film' }, // Animation utility icon
        other: { url: '/utilities/other', icon: 'bi bi-gear' }, // Other utilities icon
      },
    },
  },
  unAuth: {
    login: { url: '/', icon: 'bi bi-box-arrow-in-right' }, // Login icon
    register: { url: '/register', icon: 'bi bi-person-plus' }, // Register icon
    forgot_password: { url: '/forgot_password', icon: 'bi bi-key' }, // Forgot password icon
  },
  public: {},
};
