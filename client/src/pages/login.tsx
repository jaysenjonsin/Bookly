import styles from '@/styles/login.module.scss';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUser } from '../services/authService';

const formSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(1, { message: 'Please enter your username or email' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

export type formSchemaType = z.infer<typeof formSchema>;

const onSubmit: SubmitHandler<formSchemaType> = async (formInput) => {
  try {
    return await loginUser(formInput);
  } catch (err: any) {
    const message = err.response?.data.message || err.toString();
    window.alert(message);
  }
};

// type Props = {};
const login = (props: {}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <>
      <div className={styles.login}>
        <div className={styles.card}>
          <div className={styles.left}>
            <h1>Bookly</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              vitae.
            </p>
            <span>Don't have an account?</span>
            <button>Register</button>
          </div>
          <div className={styles.right}>
            <h1>Put logo here Oauth stuff ? </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type='text'
                placeholder='username or email'
                {...register('usernameOrEmail')}
                disabled={isSubmitting}
              />
              <p className={styles.errorMessage}>
                {errors.usernameOrEmail?.message}
              </p>
              <input
                type='password'
                placeholder='password'
                {...register('password')}
                disabled={isSubmitting}
              />
              <p className={styles.errorMessage}>{errors.password?.message}</p>

              <button type='submit'>Login</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default login;
