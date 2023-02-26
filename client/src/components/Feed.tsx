import React from 'react';
import s from '@/styles/Feed.module.scss';
import Stories from './Stories';
import Posts from './Posts';
type Props = {};

const Feed = (props: Props) => {
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
