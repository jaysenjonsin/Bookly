import s from '@/styles/Stories.module.scss';
import Image from 'next/image';
import { useContext } from 'react';
import profilePic from '../../public/undraw_Book_reading_re_fu2c.png';
import { AuthContext } from '../context/AuthContext';
type Props = {};

const Stories = (props: Props) => {
  const { user } = useContext(AuthContext);
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
    {
      id: 4,
      name: 'hey',
      img: profilePic,
    },
  ];

  return (
    <>
      <div className={s.stories}>
        <div className={s.story}>
          <Image src={profilePic} alt='users story here' />
          <span>{user?.email}</span>
          <button>+</button>
        </div>
        {stories.map((story) => (
          <div className={s.story} key={story.id}>
            <Image src={story.img} alt='profile picture' />
            <span>Story name</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stories;
