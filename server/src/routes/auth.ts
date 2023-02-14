import express from 'express';
import { authenticate, login, register } from '../controllers/authController';

const router = express.Router();

router.route('/').post(register);
router.route('/login').post(login);
router.route('/authenticate').get(authenticate);

export default router;
