import { StaticImageData } from 'next/image';
import React from 'react';

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
  return <div>{post.name}</div>;
};

export default Post;
