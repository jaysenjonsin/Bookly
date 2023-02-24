import React from 'react';
import profilePic from '../../public/undraw_Book_reading_re_fu2c.png';
import Image from 'next/image';
import s from '@/styles/Stories.module.scss';
type Props = {};

const Stories = (props: Props) => {
  const stories = [
    {
      id: 1,
      name: 'hi',
      img: profilePic,
    },
    {
      id: 2,
      name: 'bye',
      img: profilePic,
    },
    {
      id: 3,
      name: 'hey',
      img: profilePic,
    },
  ];

  return (
    <>
      <div className={s.stories}>
        {stories.map((story) => (
          <div className={s.story}>
            <Image src={story.img} alt='profile picture' />
          </div>
        ))}
      </div>
    </>
  );
};

export default Stories;
