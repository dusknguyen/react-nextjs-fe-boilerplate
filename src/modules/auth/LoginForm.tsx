import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SubmitButton from '@/components/ui/buttons/SubmitButton';
import FormWrapper from '@/components/ui/form/FormWrapper';
import CheckboxInput from '@/components/ui/form/CheckboxInput';
import TextInput from '@/components/ui/form/TextInput';
import { LoginValidation } from './AuthValidation';
import { useAuthApi } from './AuthApi';

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginValidation),
  });

  const { login, error, loading } = useAuthApi();

  const onSubmit = (data: any) => {
    const { username, password } = data;
    login(username, password);
  };

  return (
    <FormWrapper error={error} onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        type="text"
        placeholder="Enter Username..."
        register={register('username')}
        error={errors['username']?.message?.toString()}
      />
      <TextInput type="password" placeholder="Password" register={register('password')} error={errors['password']?.message?.toString()} />
      <CheckboxInput label="Remember Me" register={register('rememberMe')} />
      <SubmitButton label="Login" loading={loading} />
    </FormWrapper>
  );
};

export default LoginForm;
