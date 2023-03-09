import express from 'express';
import { getPosts } from '../controllers/postController';
const router = express.Router();

router.route('/').get(getPosts);

export default router;
