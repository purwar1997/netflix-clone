import express from 'express';

import { signup, login } from '../controllers/user.controllers.js';

const router = express.Router();

router.route('/auth/signup').post(signup);
router.route('/auth/login').post(login);

export default router;
