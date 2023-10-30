import jwt from 'jsonwebtoken';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import User from '../models/user.model.js';
import config from '../config/config.js';

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.cookies.token ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  ) {
    token = req.cookies.token || req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new CustomError('Token not found', 401);
  }

  let decryptedToken;

  try {
    decryptedToken = jwt.verify(token, config.TOKEN_SECRET);
  } catch (error) {
    throw new CustomError(error.message || 'Token invalid or expired', 401);
  }

  const user = await User.findById(decryptedToken.userId).select('+password');

  if (!user) {
    throw new CustomError('User not found', 404);
  }

  res.user = user;
  next();
});

export default authenticate;
