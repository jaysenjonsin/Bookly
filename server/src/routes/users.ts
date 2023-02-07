import express from 'express';
import { deleteAllUsers, getAllUsers } from '../controllers/userController';
const router = express.Router();
const DELETE_ALL_USERS_URL = process.env.DELETE_ALL_USERS_URL ?? 'delete';

router.route('/').get(getAllUsers);
router.delete(DELETE_ALL_USERS_URL, deleteAllUsers, getAllUsers);

export default router;
