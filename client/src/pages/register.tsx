import React from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; //from @hookform/resolvers

type Props = {};

const formData = z.object({
  name: z.string({ invalid_type_error: 'Please enter your name' }),
  email: z.string({ invalid_type_error: 'Please enter your email' }).email(),
  username: z.string({ invalid_type_error: 'Please enter a username' }),
  password: z.string({ invalid_type_error: 'Please enter a password' }).min(3),
  confirmPassword: z.string({ invalid_type_error: 'Please confirm password' }),
});

const postRequest = async () => {
  console.log('send post request to backend');
};

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formData),
  });

  return (
    <>
      <div>Register</div>
      <form onSubmit={handleSubmit(postRequest)}>
        <input type='text' disabled={isSubmitting} {...register('name')} /> 
        <input type='text' disabled={isSubmitting} />
        <input type='text' disabled={isSubmitting} />
        <input type='text' disabled={isSubmitting} />
      </form>
    </>
  );
};

export default Register;
