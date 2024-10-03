import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';

export const MessagesDropdown = React.memo(() => (
  <Dropdown as={Nav.Item}>
    <Dropdown.Toggle as={Nav.Link} className="nav-link">
      <i className="bi bi-envelope"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-right shadow animated--grow-in">
      <Dropdown.Header>Message Center</Dropdown.Header>
      <Dropdown.Item>
        <div className="dropdown-list-image mr-3">
          <div className="status-indicator bg-success"></div>
        </div>
        <div className="font-weight-bold">
          <div className="text-truncate">Hi there! I am wondering if you can help me with a problem I've been having.</div>
          <div className="small text-gray-500">Emily Fowler · 58m</div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item>
        <div className="dropdown-list-image mr-3">
          <div className="status-indicator"></div>
        </div>
        <div className="text-truncate">I have the photos that you ordered last month, how would you like them sent to you?</div>
        <div className="small text-gray-500">Jae Chun · 1d</div>
      </Dropdown.Item>
      <Dropdown.Item>
        <div className="dropdown-list-image mr-3">
          <div className="status-indicator bg-warning"></div>
        </div>
        <div className="text-truncate">
          Last month's report looks great, I am very happy with the progress so far, keep up the good work!
        </div>
        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
      </Dropdown.Item>
      <Dropdown.Item className="text-center small text-gray-500">Read More Messages</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
));
