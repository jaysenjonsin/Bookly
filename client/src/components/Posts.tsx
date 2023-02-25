import React from 'react';
import profilePic from '../../public/undraw_Book_reading_re_fu2c.png';
import Post from './Post';

type Props = {};

const Posts = (props: Props) => {
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
      id: 1,
      name: 'hello',
      userId: 1,
      profilePic: profilePic,
      desc: 'yo',
      img: profilePic,
    },
    {
      id: 1,
      name: 'hello',
      userId: 1,
      profilePic: profilePic,
      desc: 'yo',
      img: profilePic,
    },
    {
      id: 1,
      name: 'hello',
      userId: 1,
      profilePic: profilePic,
      desc: 'yo',
      img: profilePic,
    },
  ];
  return (
    <>
    {posts.map(post=>(
      <Post post = {post}/>
    ))}
    </>
  )
};

export default Posts;
