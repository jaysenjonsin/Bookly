import axios from 'axios';
import login from '../pages/login';
import { formSchemaType as registerSchemaType } from '../pages/register';
import { formSchemaType as loginSchemaType } from '../pages/login';
const URL = process.env.NEXT_PUBLIC_API_URL + 'auth/';

export const registerUser = async (formData: registerSchemaType) => {
  const { data } = await axios.post(URL, formData, { withCredentials: true }); //withCredentials: allows cookie to be set on client
  return data;
};

export const loginUser = async (formData: loginSchemaType) => {
  const { data } = await axios.post(URL + 'login', formData, {
    withCredentials: true,
  });
  return data;
};
