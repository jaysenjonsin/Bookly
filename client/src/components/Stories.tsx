import s from '@/styles/Stories.module.scss';
import Image from 'next/image';
import profilePic from '../../public/undraw_Book_reading_re_fu2c.png';
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
          <span>User story</span>
          <button>+</button>
        </div>
        {stories.map((story) => (
          <div className={s.story}>
            <Image src={story.img} alt='profile picture' />
            <span>Story name</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stories;
