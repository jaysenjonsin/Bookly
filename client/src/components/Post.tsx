import { StaticImageData } from 'next/image';
import React from 'react';
import s from '@/styles/Post.module.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import Link from 'next/link';
import profilePic from '../../public/undraw_Reading_book_re_kqpk.png';

type Props = {
  post: {
    id: number;
    name: string;
    userId: number;
    profilePic: StaticImageData;
    desc: string;
    img: StaticImageData;
  }; //copy pasted type from hovering over post in the map method of Posts.tsx
};

const Post = ({ post }: Props) => {
  const liked = false;
  return (
    <>
      <div className={s.post}>
        <div className={s.container}>
          <div className={s.user}>
            <div className={s.userInfo}>
              <Image src={profilePic} alt='post' />
              <div className={s.details}>
                <Link
                  href='/'
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <span className={s.name}>post.name</span>
                </Link>
                <span className={s.date}>1 minute ago</span>
              </div>
            </div>
            <MoreHorizIcon />
          </div>
          <div className={s.content}>
            <p>post.description</p>
            <Image src={profilePic} alt='post image' />
          </div>
          <div className={s.info}>
            <div className={s.item}>
              {liked ? (
                <FavoriteOutlinedIcon />
              ) : (
                <FavoriteBorderOutlinedIcon />
              )}
              12 likes
            </div>
            <div className={s.item}>
              <TextsmsOutlinedIcon />
              12 comments
            </div>
            <div className={s.item}>
              <ShareOutlinedIcon />
              Share
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
