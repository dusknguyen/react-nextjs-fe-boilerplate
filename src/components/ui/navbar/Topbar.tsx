'use client';
import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { AlertsDropdown } from '../dropdown/AlertsDropdown';
import { MessagesDropdown } from '../dropdown/MessagesDropdown';
import { UserDropdown } from '../dropdown/UserDropdown';
import { SearchBar } from '../SearchBar';
import LocaleSwitcher from '@/modules/i18n/LocaleSwitcher';

/**
 * TopBar component with Navbar, Search, and User Information.
 */
export const TopBar = React.memo(() => {
  return (
    <Navbar expand="lg" bg="white" className="mb-4 static-top shadow">
      <LocaleSwitcher />
      <Button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
        <i className="bi bi-list"></i>
      </Button>
      <SearchBar />
      <Nav className="ml-auto">
        <AlertsDropdown />
        <MessagesDropdown />
        <div className="topbar-divider d-none d-sm-block"></div>
        <UserDropdown />
      </Nav>
    </Navbar>
  );
});
