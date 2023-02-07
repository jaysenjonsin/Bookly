import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import '../utils/types';
import { validateRegister } from '../utils/validateRegister';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.userId) {
    res.status(401).json({ message: 'Unauthorized' });
  } else return next();
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, name, password } = req.body;

  try {
    const validated = validateRegister(username, email, name, password);
    if (validated.errorMessage) {
      res.status(400);
      throw new Error(validated.errorMessage);
    }

    //use findUnique for @unique fields
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      res.status(400);
      throw new Error('user already exists');
    }

    const user = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: await bcrypt.hash(password, 10),
      },
    });
    //store user id session. sets cookie on user
    req.session.userId = user.id;
    res.status(201).json({ user });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

// export const login = (req, res) => {
//   const { username, password } = req.body;
// };

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await prisma.user.findMany();
    res.status(400).json(users);
  } catch (err) {
    return next(err);
  }
};
