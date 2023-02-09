import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { COOKIE_NAME } from '../utils/constants';
import { excludeFields } from '../utils/excludeFields';
import '../utils/types';
import { validateRegister } from '../utils/validateRegister';

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //check if user has signed cookie
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

    //cannot use OR clause with findUnique
    const userExists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
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

    const userWithoutPassword = excludeFields(user, ['password']);

    //store user id session. sets cookie on user
    req.session.userId = user.id;
    res.status(201).json({ userWithoutPassword });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { usernameOrEmail, password } = req.body;
  try {
    if (!usernameOrEmail || !password) {
      res.status(400);
      throw new Error('please enter all required fields');
    }

    const user = await prisma.user.findUnique({
      where: {
        ...(usernameOrEmail.includes('@')
          ? { email: usernameOrEmail }
          : { username: usernameOrEmail }),
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id;
      const userWithoutPassword = excludeFields(user, ['password']);
      res.status(200).json(userWithoutPassword);
    } else {
      res.status(400);
      //don't tell user whether the given user exists or not
      throw new Error('username or password is incorrect');
    }
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  return new Promise((resolve) => {
    req.session.destroy((err) => {
      res.clearCookie(COOKIE_NAME);
      if (err) {
        console.error(err);
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
};

//req.session.destroy takes a callback, which has an err parameter
