import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        desc: true,
        img: true,
        created_at: true,
        updated_at: true,
        user: {
          select: {
            id: true,
            name: true,
            profile_pic: true,
          },
        },
      },
      where: {
        OR: [
          {
            user: {
              //grabbing all posts from 'followed' relation in which the follower is the current user
              followed: {
                some: {
                  follower_user_id: req.session.userId,
                },
              },
            },
          },
          {
            user_id: req.session.userId,
          },
        ],
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { desc, img } = req.body;
  try {
    if (!desc) {
      res.status(400);
      throw new Error('Text required');
    }
    const newPost = await prisma.post.create({
      data: {
        desc,
        img, //auto set to null if no img input
        user: {
          connect: {
            id: req.session.userId,
          },
        },
      },
    });
    res.status(201).json(newPost);
  } catch (err) {
    return next(err);
  }
  // const time = moment(Date.now()).format('YYY-MM-DD HH:mm:ss'); // maybe format date in the front end
  // console.log(time);
};
