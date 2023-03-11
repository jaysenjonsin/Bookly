import express from 'express';
import {
  authenticatePage,
  login,
  register,
} from '../controllers/authController';

const router = express.Router();

router.route('/').post(register);
router.route('/login').post(login);
router.route('/authenticate').get(authenticatePage);

export default router;
