import { StaticImageData } from 'next/image';
import React, { useContext, useState } from 'react';
import s from '@/styles/Post.module.scss';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Image from 'next/image';
import Link from 'next/link';
import profilePic from '../../public/undraw_Reading_book_re_kqpk.png';
import Comments from './Comments';
import { PostType } from './Posts';
import { AuthContext } from '../context/AuthContext';
import moment from 'moment';

type props = {
  post: PostType;
};

const Post = ({ post }: props) => {
  const { user } = useContext(AuthContext);
  const [showComments, setShowComments] = useState(false);
  const liked = false;
  console.log('SUPAH POST: ', post);
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
                  <span className={s.name}>{post?.user?.name}</span>
                </Link>
                <span className={s.date}>
                  {moment(post.created_at).fromNow()}
                </span>
              </div>
            </div>
            <MoreHorizIcon />
          </div>
          <div className={s.content}>
            <p>{post.desc}</p>
            {/* PUT POST LINK HERE AFTER S3 */}
            {/* <Image src={profilePic} alt='post image' /> */}
            {/* {post.image_url && (
              <Image
                src={post.image_url}
                width={10}
                height={10}
                alt='post image'
              />
            )} */}
            {post.image_url && <img src={post.image_url} alt='' />}
            {/* <img src={post?.img} alt='post image' /> */}
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
            <div
              className={s.item}
              onClick={() => setShowComments(!showComments)}
            >
              <TextsmsOutlinedIcon />
              12 comments
            </div>
            <div className={s.item}>
              <ShareOutlinedIcon />
              Share
            </div>
          </div>
          {showComments && <Comments />}
        </div>
      </div>
    </>
  );
};

export default Post;
