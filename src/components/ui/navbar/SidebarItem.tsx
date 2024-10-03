'use client';
import React from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';
import { RouteItem, RouteWithChildren } from '@/routes';

const SidebarItem = ({ routeName, routeObj }: { routeName: string; routeObj: RouteItem | RouteWithChildren | undefined }) => {
  if (!routeObj) {
    return null; // Handle undefined case by rendering nothing
  }

  return (
    <Link href={routeObj.url} passHref legacyBehavior>
      <Nav.Link as="button" className="nav-link">
        <i className={routeObj.icon}></i>
        <span>{routeName.charAt(0).toUpperCase() + routeName.slice(1)}</span>
      </Nav.Link>
    </Link>
  );
};

export default React.memo(SidebarItem);
