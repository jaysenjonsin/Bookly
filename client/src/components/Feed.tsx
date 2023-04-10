import React from 'react';
import s from '@/styles/Feed.module.scss';
import Stories from './Stories';
import Posts from './Posts';
import Share from './Share';

const Feed = () => {
  return (
    <>
      <div className={s.feed}>
        <Stories />
        <Share />
        <Posts />
      </div>
    </>
  );
};

export default Feed;
