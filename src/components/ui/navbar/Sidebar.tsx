'use client';
import { RouteItem, RouteWithChildren, routes } from '@/routes';
import { useSidebarStore } from '@/store';
import React from 'react';
import { Nav } from 'react-bootstrap';
import SidebarBrand from './SidebarBrand';
import SidebarItem from './SidebarItem';
import SidebarSection from './SidebarSection';

/**
 * Sidebar component with collapsible sections and Zustand for state persistence.
 * Optimized for load time using lazy loading and memoization.
 */
export const Sidebar = React.memo(() => {
  const { components, utilities, toggleSection } = useSidebarStore(); // Get Zustand state and actions

  // Type guard for sectionRoutes
  const isRouteValid = (routeObj: any): routeObj is RouteItem => {
    return routeObj && typeof routeObj.url === 'string' && typeof routeObj.icon === 'string';
  };

  const isRouteWithChildren = (routeObj: any): routeObj is RouteWithChildren => {
    return (
      routeObj &&
      typeof routeObj.url === 'string' &&
      typeof routeObj.icon === 'string' &&
      (!routeObj.children || typeof routeObj.children === 'object')
    );
  };

  return (
    <Nav className="navbar-nav sidebar sidebar-dark accordion bg-primary" id="accordionSidebar">
      {/* Sidebar Brand */}
      <SidebarBrand />

      <hr className="sidebar-divider my-0" />

      {/* Dashboard Link */}
      {isRouteValid(routes['auth']['dashboard']) && <SidebarItem routeName="dashboard" routeObj={routes['auth']['dashboard']} />}

      <hr className="sidebar-divider" />

      {/* Interface Section */}
      <div className="sidebar-heading">Interface</div>
      {isRouteWithChildren(routes['auth']['components']) && (
        <SidebarSection
          section="components"
          sectionRoutes={routes['auth']['components']}
          isOpen={components}
          toggleOpen={() => toggleSection('components')} // Use Zustand toggle
        />
      )}
      {isRouteWithChildren(routes['auth']['utilities']) && (
        <SidebarSection
          section="utilities"
          sectionRoutes={routes['auth']['utilities']}
          isOpen={utilities}
          toggleOpen={() => toggleSection('utilities')} // Use Zustand toggle
        />
      )}

      <hr className="sidebar-divider" />

      {/* Addons Section */}
      <div className="sidebar-heading">Addons</div>
      {isRouteValid(routes['auth']['charts']) && <SidebarItem routeName="charts" routeObj={routes['auth']['charts']} />}
      {isRouteValid(routes['auth']['tables']) && <SidebarItem routeName="tables" routeObj={routes['auth']['tables']} />}

      <hr className="sidebar-divider d-none d-md-block" />
    </Nav>
  );
});
