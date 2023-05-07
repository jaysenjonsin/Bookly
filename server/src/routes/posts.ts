import express from 'express';
import multer from 'multer';
import { storage } from '..';
import { authenticateRoute } from '../controllers/authController';
import {
  addPost,
  deleteAllPosts,
  getAllPosts,
  getPosts,
} from '../controllers/postController';
const router = express.Router();
export const upload = multer({ storage: storage });

router.route('/').get(authenticateRoute, getPosts).post(
  authenticateRoute,
  // express server doesnt know how to deal with multipart form data by default, so will use multer middleware .single
  upload.single('file'), //file is name of the input in front end: name = 'file'.
  addPost
);

router.route('/all').get(getAllPosts).delete(deleteAllPosts, getAllPosts);
//when editing post, make sure to change it in redis store as well

export default router;
