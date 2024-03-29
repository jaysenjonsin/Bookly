import axios from 'axios';
const URL = process.env.NEXT_PUBLIC_API_URL + 'posts';

export const fetchPosts = async () => {
  const { data } = await axios.get(URL, { withCredentials: true });
  return data;
};

export const createPost = async (userInput: any) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  };
  console.log('USER INPUT: ', userInput);
  const { data } = await axios.post(URL, userInput, config);

  return data;
};


