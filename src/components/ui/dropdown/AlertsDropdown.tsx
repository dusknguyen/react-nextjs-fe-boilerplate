import React from 'react';
import { Dropdown, Nav } from 'react-bootstrap';

export const AlertsDropdown = React.memo(() => (
  <Dropdown as={Nav.Item}>
    <Dropdown.Toggle as={Nav.Link} className="nav-link">
      <i className="bi bi-bell"></i>
    </Dropdown.Toggle>
    <Dropdown.Menu className="dropdown-menu-right shadow animated--grow-in">
      <Dropdown.Header>Alerts Center</Dropdown.Header>
      <Dropdown.Item>
        <div className="d-flex align-items-center">
          <div className="icon-circle bg-primary">
            <i className="bi bi-file-earmark-text text-white"></i>
          </div>
          <div>
            <div className="small text-gray-500">December 12, 2019</div>
            <span className="font-weight-bold">A new monthly report is ready to download!</span>
          </div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item>
        <div className="d-flex align-items-center">
          <div className="icon-circle bg-success">
            <i className="bi bi-cash-coin text-white"></i>
          </div>
          <div className="small text-gray-500">December 7, 2019</div>
          $290.29 has been deposited into your account!
        </div>
      </Dropdown.Item>
      <Dropdown.Item>
        <div className="d-flex align-items-center">
          <div className="icon-circle bg-warning">
            <i className="bi bi-exclamation-triangle text-white"></i>
          </div>
          <div className="small text-gray-500">December 2, 2019</div>
          Spending Alert: We've noticed unusually high spending for your account.
        </div>
      </Dropdown.Item>
      <Dropdown.Item className="text-center small text-gray-500">Show All Alerts</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
));
