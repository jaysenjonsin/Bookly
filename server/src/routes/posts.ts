import express from 'express';
import multer from 'multer';
import { storage } from '..';
import { authenticateRoute } from '../controllers/authController';
import { addPost, getPosts } from '../controllers/postController';
const router = express.Router();
export const upload = multer({ storage: storage });

router.route('/').get(authenticateRoute, getPosts).post(
  authenticateRoute,
  upload.single('file'),

  addPost
);
//when editing post, make sure to change it in redis store as well

export default router;
