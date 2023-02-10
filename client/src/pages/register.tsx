import React from 'react';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; //from @hookform/resolvers
import axios from 'axios';

type Props = {};

const formData = z
  .object({
    name: z.string().min(1, { message: 'Name required' }),
    email: z
      .string()
      .min(1, { message: 'Email required' })
      .email({ message: 'please enter a valid email' }),
    username: z.string().min(1, { message: 'Username required' }),
    password: z.string().min(1, { message: 'password required' }),
    confirmPassword: z.string({
      invalid_type_error: 'Please confirm password',
    }),
  })
  //custom validation logic using .refine
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do no match',
  });

type formDataType = z.infer<typeof formData>;

const onSubmit: SubmitHandler<formDataType> = async (formValues) => {
  //submitHandler takes a function, which takes in the form data
  try {
    const { data } = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + 'login',
      formValues
    );
  } catch (err) {}
};

const Register = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formDataType>({
    resolver: zodResolver(formData),
  });

  return (
    <>
      <div>Register</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          id='name'
          type='text'
          className='input'
          placeholder='name'
          disabled={isSubmitting} //cannot change when form is submitting
          {...register('name')} //gives some props to (i.e registers) the named input: ex ref = {name} name = {name} onChange = {onchange}
        />
        <p className='error-message'>{errors.name?.message}</p>

        <input
          id='email'
          type='text'
          className='input'
          placeholder='email'
          disabled={isSubmitting}
          {...register('email')}
        />
        <p className='error-message'>{errors.email?.message}</p>

        <input
          id='username'
          type='text'
          className='input'
          placeholder='username'
          disabled={isSubmitting}
          {...register('username')}
        />
        <p className='error-message'>{errors.username?.message}</p>

        <input
          id='password'
          type='text'
          className='input'
          placeholder='password'
          disabled={isSubmitting}
          {...register('password')}
        />
        <p className='error-message'>{errors.password?.message}</p>

        <input
          id='confirmPassword'
          type='text'
          className='input'
          placeholder='confirm password'
          disabled={isSubmitting}
          {...register('confirmPassword')}
        />
        <p className='error-message'>{errors.confirmPassword?.message}</p>

        <button type='submit'>submit</button>
      </form>
    </>
  );
};

export default Register;
