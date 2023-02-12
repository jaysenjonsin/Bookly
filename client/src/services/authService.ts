import axios from 'axios';
import login from '../pages/login';
import { formSchemaType as registerSchemaType } from '../pages/register';
import { formSchemaType as loginSchemaType } from '../pages/login';
const URL = process.env.NEXT_PUBLIC_API_URL + 'auth/';

export const registerUser = async (userData: registerSchemaType) => {
  const { data } = await axios.post(URL, userData);
  return data;
};

export const loginUser = async (userData: loginSchemaType) => {
  const { data } = await axios.post(URL + 'login', userData);
  return data;
};
