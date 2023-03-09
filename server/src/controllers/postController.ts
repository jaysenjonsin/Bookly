import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts);
};

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
