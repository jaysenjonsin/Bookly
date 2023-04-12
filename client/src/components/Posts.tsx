import React from 'react';
import profilePic from '../../public/undraw_Book_reading_re_fu2c.png';
import Post from './Post';
import s from '@/styles/Posts.module.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postService';
import { StaticImageData } from 'next/image';

type Props = {};

// created_at: "2023-03-12T05:13:28.088Z"
// desc: "new post"
// id: 3
// img: null
// updated_at: "2023-03-12T05:13:28.088Z"
// user:
// id: 13
// name: "tester"
// profile_pic: null

export type PostType = {
  created_at: string;
  desc: string;
  id: number;
  image_name: string | null | StaticImageData; //take out static img later?
  image_url: string | null | StaticImageData;
  updated_at: String; //maybe convert to Date type later? currently coming back as a string. maybe jsut recieve as string and turn into date using moment when displaying it?
  user: {
    id: number;
    name: string;
    profile_pic: string | null | StaticImageData;
  };
};

const Posts = (props: Props) => {
  const { isLoading, /*isError, error,*/ data } = useQuery(
    ['posts'],
    fetchPosts
  );

  let content;
  if (isLoading) content = 'loading...'; //change to spinner
  else if (data?.message) content = data?.message;
  /*  throwing message in backend if error, so display the error message if error */ else
    content = data.map((post: PostType) => <Post post={post} key={post.id} />);

  return <div className={s.posts}>{content}</div>;
};

export default Posts;
