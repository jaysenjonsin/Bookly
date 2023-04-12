import { PrismaClient } from '@prisma/client';
import connectRedis from 'connect-redis';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import authRouter from './routes/auth';
import commentRouter from './routes/comments';
import likeRouter from './routes/likes';
import postRouter from './routes/posts';
import userRouter from './routes/users';
import multer from 'multer';
import { S3Client } from '@aws-sdk/client-s3';

import { COOKIE_NAME, __prod__ } from './utils/constants';

dotenv.config({ path: '../.env' });
const PORT = process.env.PORT || 3000;

export const prisma = new PrismaClient({
  log: ['query'], //log executed SQL in terminal
});

const RedisStore = connectRedis(session); //configure redis so that it can use express session
export const redis = new Redis(); //create ioredis client

const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

export const s3Client = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey!,
    secretAccessKey: bucketSecretAccessKey!,
  },
  region: bucketRegion,
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // sets Access-Control-Allow-Credentials header to true, allowing credentials (cookies, etc) to be sent to server
  })
);

app.use(
  session({
    name: COOKIE_NAME,
    store: new RedisStore({
      client: redis,
      disableTouch: true, //prevents update of session expiration time
    }),
    saveUninitialized: false, //false: we only save session when there is data to store in it.
    resave: false, // false: only resave session if it is modified.
    secret: process.env.SESSION_SECRET ?? 'secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: true,
      sameSite: 'lax', //CSRF
      secure: __prod__,
    },
  })
);

export const storage = multer.memoryStorage(); //create memory storage
// export const upload = multer({ storage: storage }); //create upload func that stores image to memory. use inside createPost

// app.post('api/upload', upload.single('file'), (req, res) => {
//   res.status(200).json(req.file?.filename);
// });

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);

app.use((_, res) => res.status(404).send('page not found'));

app.use((err: any, _: Request, res: Response, __: NextFunction) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  const message = err.message ? err.message : 'unknown error occured';
  res.status(statusCode).json({ message });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
