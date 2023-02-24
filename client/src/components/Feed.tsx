import React from 'react';
import s from '@/styles/Feed.module.scss';
import Stories from './Stories';
type Props = {};

const Feed = (props: Props) => {
  return (
    <>
      <div className={s.feed}>
        <Stories />
      </div>
    </>
  );
};

export default Feed;
