import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import bcrypt from 'bcrypt';

declare module 'express-session' {
  interface SessionData {
    userId: number; //add userId type
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, email, name, password } = req.body;
  try {
    if (!username || !email || !name || !password) {
      res.status(400);
      throw new Error('please enter all required fields');
    }

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
    req.session.userId = user.id;
    res.json({ user });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};
