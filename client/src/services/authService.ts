import axios from 'axios';
import { formDataType } from '../pages/register';

const URL = process.env.NEXT_PUBLIC_API_URL + 'auth/';

export const registerUser = async (userData: formDataType) => {
  const { data } = await axios.post(URL, userData);
  console.log('data ', data);
  return data;
};
