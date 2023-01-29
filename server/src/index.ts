import express from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3000;

const main = async () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} in ${process.env.NODE_ENV} mode`);
  });
};

main().catch((err) => console.log(err));
