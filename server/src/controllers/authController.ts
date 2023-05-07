import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import { prisma } from '..';
import { COOKIE_NAME } from '../utils/constants';
import { excludeFields } from '../utils/excludeFields';
import '../utils/types';
import { validateRegister } from '../utils/validateRegister';

export const authenticatePage = (
  req: Request,
  res: Response
  // next: NextFunction
) => {
  //if (!req.session.userId) is a valid check to see if a user is authenticated because, by default, the session middleware will only create a new session if one doesn't already exist. So, if a user tries to forge a session ID, it won't match any existing session IDs on the server, and the req.session object will be empty.
  if (!req.session.userId) {
    res.status(401).json({ message: 'Unauthorized' });
  }
  //else return next();
  else res.status(200).json({ message: 'Authorized' });
};

export const authenticateRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.session.userId) {
      res.status(400);
      throw new Error('You must log in to continue');
    } else return next();
  } catch (err) {
    return next(err);
  }
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
    //do not do .json({userWithoutPassword}) - this adds extra nested. would have to access in front end using user.userWithoutPassword.proeperty
    res.status(201).json(userWithoutPassword);
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
    //destroy the session(server) and clear the cookie(client)
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

//if logout doesnt work try this one:
// export const logout = async (req: Request, res: Response) => {
//   return new Promise<boolean>((resolve, reject) => {
//     //destroy the session(server) and clear the cookie(client)
//     req.session.destroy((err) => {
//       res.clearCookie(COOKIE_NAME);
//       if (err) {
//         console.error(err);
//         reject(err);
//         return;
//       }
//       resolve(true);
//     });
//   })
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((error) => {
//       console.error(error);
//       res.status(500).json({ message: 'Error occurred while logging out.' });
//     });
// };

//req.session.destroy takes a callback, which has an err parameter
