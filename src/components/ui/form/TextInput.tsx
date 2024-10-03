import React from 'react';
import { Form } from 'react-bootstrap';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

interface TextInputProps {
  label?: string;
  type: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const TextInput: React.FC<TextInputProps> = ({ label, type, placeholder, register, error }) => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type={type}
        placeholder={placeholder}
        {...register}
        className={clsx({ 'is-invalid': error })} // Apply 'is-invalid' class if there's an error
      />
      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
    </Form.Group>
  );
};

export default TextInput;
