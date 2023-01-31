import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { COOKIE_NAME, __prod__ } from './utils/constants';
dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;

const main = async () => {
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
      saveUninitialized: false, //only saves session when there is data to store
      resave: false,
      secret: process.env.SESSION_SECRET || 'secret',
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        httpOnly: true,
        sameSite: 'lax',
        secure: __prod__, //https in prod
      },
    })
  );
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

main().catch((err) => console.log(err));
