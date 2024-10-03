'use client';
import React from 'react';
import Link from 'next/link';
import { routes } from '@/routes';
import { Nav } from 'react-bootstrap';

const SidebarBrand = () => {
  const dashboardRoute = routes?.auth?.['dashboard'];

  return dashboardRoute ? (
    <Link href={dashboardRoute.url} passHref legacyBehavior>
      <Nav.Link as="button" className="nav-link">
        <div className="sidebar-brand d-flex align-items-center justify-content-center">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className={dashboardRoute.icon}></i>
          </div>
          <div className="sidebar-brand-text mx-3">React NextJs Boilerplate</div>
        </div>
      </Nav.Link>
    </Link>
  ) : null;
};

export default React.memo(SidebarBrand);
