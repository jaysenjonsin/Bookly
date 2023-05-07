import axios from 'axios';

const URL = process.env.NEXT_PUBLIC_API_URL + 'comments';

export const fetchComments = async () => {
  const { data } = await axios.get(URL, { withCredentials: true });
  return data;
};
