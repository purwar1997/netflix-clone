import express from 'express';

import { home, signup, login } from '../controllers/user.controllers.js';

const router = express.Router();

router.route('/').get(home);
router.route('/auth/signup').post(signup);
router.route('/auth/login').post(login);

export default router;
