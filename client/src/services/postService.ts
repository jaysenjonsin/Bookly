import axios from 'axios';
const URL = process.env.NEXT_PUBLIC_API_URL + 'posts';

export const fetchPosts = async () => {
  const { data } = await axios.get(URL, { withCredentials: true });
  return data;
};
