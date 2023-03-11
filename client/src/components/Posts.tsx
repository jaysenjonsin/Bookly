import React from 'react';
import profilePic from '../../public/undraw_Book_reading_re_fu2c.png';
import Post from './Post';
import s from '@/styles/Posts.module.scss';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postService';

type Props = {};

const Posts = (props: Props) => {
  const { isLoading, isError, error, data } = useQuery(['posts'], fetchPosts);

  const posts = [
    {
      id: 1,
      name: 'hello',
      userId: 1,
      profilePic: profilePic,
      desc: 'yo',
      img: profilePic,
    },
    {
      id: 2,
      name: 'hello',
      userId: 1,
      profilePic: profilePic,
      desc: 'yo',
      img: profilePic,
    },
    {
      id: 3,
      name: 'hello',
      userId: 1,
      profilePic: profilePic,
      desc: 'yo',
      img: profilePic,
    },
    {
      id: 4,
      name: 'hello',
      userId: 1,
      profilePic: profilePic,
      desc: 'yo',
      img: profilePic,
    },
  ];
  return (
    <>
      <div className={s.posts}>
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}

        {/* fetching data using data property from react query: */}
        {error /* not sure whether to use error or isError test later */
          ? 'error'   //not sure how to get error message from backend here: mayber error.message since we throw message in backend or maybe just error? test later
          : isLoading
          ? 'loading'
          : data.map((post: any) => <Post post={post} key={post.id} />)}
      </div>
    </>
  );
};

export default Posts;
