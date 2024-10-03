import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';

export const UserDropdown = React.memo(() => (
  <Dropdown as={Nav.Item}>
    <Dropdown.Toggle as={Nav.Link} className="nav-link">
      <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-right shadow animated--grow-in">
      <Dropdown.Item>
        <i className="bi bi-person"></i>
        Profile
      </Dropdown.Item>
      <Dropdown.Item>
        <i className="bi bi-gear"></i>
        Settings
      </Dropdown.Item>
      <Dropdown.Item>
        <i className="bi bi-list"></i>
        Activity Log
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item data-toggle="modal" data-target="#logoutModal">
        <i className="bi bi-box-arrow-right"></i>
        Logout
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
));
