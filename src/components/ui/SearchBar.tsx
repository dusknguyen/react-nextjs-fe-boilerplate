import React from 'react';
import { Form, InputGroup, FormControl, Button } from 'react-bootstrap';

export const SearchBar = React.memo(() => (
  <Form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
    <InputGroup>
      <FormControl
        type="text"
        placeholder="Search for..."
        className="bg-light border-0 small"
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      <Button variant="primary">
        <i className="bi bi-search"></i>
      </Button>
    </InputGroup>
  </Form>
));
