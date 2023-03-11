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
  _req: Request,
  _res: Response,
  _next: NextFunction
) => {
  console.log('');
};
