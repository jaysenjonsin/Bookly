import express from 'express';
import { register, getAllUsers } from '../controllers/authController';

const router = express.Router();

router.route('/').get(getAllUsers).post(register);
export default router;
