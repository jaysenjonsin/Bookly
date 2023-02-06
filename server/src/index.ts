import connectRedis from 'connect-redis';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import commentRouter from './routes/comments';
import likeRouter from './routes/likes';
import postRouter from './routes/posts';
import userRouter from './routes/users';

import { COOKIE_NAME, __prod__ } from './utils/constants';
dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;

const main = async () => {
  //start redis server with: redis-server
  const RedisStore = connectRedis(session); //configure redis so that it can use express session
  const redis = new Redis(); //create redis client

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true, //this sets Access-Control-Allow-Credentials header to true, allowing credentials (cookies, etc) to be sent to server
    })
  );

  app.use(
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true, //prevents update aof session expiration time
      }),
      saveUninitialized: false, //only saves session when there is data to store = false
      resave: false, //only resave session if it is modified
      secret: process.env.SESSION_SECRET || 'secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax', //CSRF
        secure: __prod__,
      },
    })
  );

  app.use('/api/users', userRouter);
  app.use('/api/posts', postRouter);
  app.use('/api/comments', commentRouter);
  app.use('/api/likes', likeRouter);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

main().catch((err) => console.log(err));
