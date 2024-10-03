import React from 'react';
import { Form, Alert } from 'react-bootstrap';

interface FormWrapperProps {
  error?: string | null;
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ error, onSubmit, children }) => {
  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={onSubmit}>{children}</Form>
    </>
  );
};

export default FormWrapper;
