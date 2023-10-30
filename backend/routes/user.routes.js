import express from 'express';

import { signup, login, logout } from '../controllers/user.controllers.js';

import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/auth/signup').post(signup);
router.route('/auth/login').post(login);
router.route('/auth/logout').post(authenticate, logout);

export default router;
