import React from 'react';
import { Form } from 'react-bootstrap';
import { UseFormRegisterReturn } from 'react-hook-form';

interface CheckboxInputProps {
  label: string;
  register: UseFormRegisterReturn;
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, register }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Check type="checkbox" label={label} {...register} />
    </Form.Group>
  );
};

export default CheckboxInput;
