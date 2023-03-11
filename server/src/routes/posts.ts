import express from 'express';
import { authenticateRoute } from '../controllers/authController';
import { addPost, getPosts } from '../controllers/postController';
const router = express.Router();

router
  .route('/')
  .get(authenticateRoute, getPosts)
  .post(authenticateRoute, addPost);

export default router;
