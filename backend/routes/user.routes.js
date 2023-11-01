import express from 'express';

import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  getProfile,
  deleteProfile,
} from '../controllers/user.controllers.js';

import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

router.route('/auth/signup').post(signup);
router.route('/auth/login').post(login);
router.route('/auth/logout').post(authenticate, logout);
router.route('/auth/password/forgot').post(forgotPassword);
router.route('/auth/password/reset/:token').put(resetPassword);
router.route('/auth/password/update').put(authenticate, updatePassword);
router.route('/auth/profile').get(authenticate, getProfile).delete(authenticate, deleteProfile);

export default router;
