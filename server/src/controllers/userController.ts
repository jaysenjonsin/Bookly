import { prisma } from '..';
import { Response, Request, NextFunction } from 'express';
import { excludeFields } from '../utils/excludeFields';

export const deleteAllUsers = async (
  _: Request,
  __: Response,
  next: NextFunction
) => {
  await prisma.user.deleteMany();
  return next();
};

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    const usersWithoutPassword = excludeFields(users, ['password']);
    res.status(200).json(usersWithoutPassword);
  } catch (err) {
    return next(err);
  }
};
