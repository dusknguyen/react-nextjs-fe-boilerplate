'use client';
import { RouteItem, RouteWithChildren } from '@/routes';
import { SidebarSectionProps, SidebarState } from '@/types/store';
import Link from 'next/link';
import React from 'react';
import { Button, Card, Nav } from 'react-bootstrap';

const hasChildren = (route: RouteItem | RouteWithChildren): route is RouteWithChildren => {
  return !!(route as RouteWithChildren).children;
};

const SidebarSection: React.FC<SidebarSectionProps> = ({ section, sectionRoutes, isOpen, toggleOpen }) => (
  <>
    <Button
      className="nav-link"
      onClick={() => toggleOpen(section as keyof SidebarState)}
      aria-controls={`collapse${section}`}
      aria-expanded={isOpen}>
      {sectionRoutes && sectionRoutes.icon && <i className={sectionRoutes.icon}></i>}
      <span>{section.charAt(0).toUpperCase() + section.slice(1)}</span>
    </Button>
    {isOpen && sectionRoutes && hasChildren(sectionRoutes) && sectionRoutes.children && (
      <Card className="collapse show" id={`collapse${section}`}>
        <Card.Body className="bg-white py-2 collapse-inner rounded">
          {Object.entries(sectionRoutes.children ?? {}).map(([key, childRoute]) => (
            <Link key={childRoute.url} href={childRoute.url} passHref legacyBehavior>
              <Nav.Link as="button" className="collapse-item">
                {childRoute.icon && <i className={childRoute.icon}></i>} {key.charAt(0).toUpperCase() + key.slice(1)}
              </Nav.Link>
            </Link>
          ))}
        </Card.Body>
      </Card>
    )}
  </>
);

export default React.memo(SidebarSection);
