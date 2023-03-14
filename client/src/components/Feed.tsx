import React from 'react';
import s from '@/styles/Feed.module.scss';
import Stories from './Stories';
import Posts from './Posts';

const Feed = () => {
  return (
    <>
      <div className={s.feed}>
        <Stories />
        <Posts />
      </div>
    </>
  );
};

export default Feed;
