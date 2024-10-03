import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import clsx from 'clsx';

interface SubmitButtonProps {
  label: string;
  loading: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, loading }) => {
  return (
    <Button
      variant="primary"
      type="submit"
      className={clsx('btn-user', 'btn-block', { 'btn-loading': loading })} // Add class if loading
      disabled={loading}>
      {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : label}
    </Button>
  );
};

export default SubmitButton;
