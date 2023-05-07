import s from '@/styles/Comments.module.scss';
import profilePic from '../../public/undraw_Reading_book_re_kqpk.png';
import React from 'react';
import Image from 'next/image';
import { PostType } from './Posts';
import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../services/commentService';
import moment from 'moment';

type Props = {
  post: PostType;
};

const Comments = ({ post }: Props) => {
  //get comments based on post id ? 
  const { isLoading, data } = useQuery(['comments'], fetchComments);
  const comments = [
    {
      id: 1,
      desc: 'comments description',
      name: 'o',
      userId: 1,
      profilePicture: profilePic,
      createdAt: 'hello',
    },
    {
      id: 2,
      desc: 'loremasdfja;sdfjas;ldjf;aklsdj;alksjfasd;kfjas;kfjasd;fkj;adsfjads;jf;',
      name: 'o',
      userId: 1,
      profilePicture: profilePic,
    },
    {
      id: 3,
      desc: 'ayo',
      name: 'o',
      userId: 1,
      profilePicture: profilePic,
    },
  ];
  return (
    <>
      <div className={s.comments}>
        <div className={s.write}>
          <Image src={profilePic} alt='profile pic' />
          <input type='text' placeholder='Write a comment' />
          <button>Send</button>
        </div>
        {comments.map((comment) => ( //change to data.map
          <div className={s.comment}>
            <Image src={profilePic} alt='profile pic' />
            <div className='info'>
              <span>users name</span>
              <p>{comment.desc}</p>
            </div>
            <span className={s.date}>
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Comments;
