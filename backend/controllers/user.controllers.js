import User from '../models/user.model.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import cookieOptions from '../utils/cookieOptions.js';

/**
 * @SIGNUP
 * @request_type POST
 * @route http://localhost:4000/api/v1/auth/signup
 * @description Controller that allows user to signup
 * @params name, email, password
 * @returns User object
 */

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw new CustomError(
      'Your account already exists. You need to login to access your account.',
      400
    );
  }

  user = await User.create({ name, email, password });
  user.password = undefined;

  res.status(201).json({
    success: true,
    message: 'Signup successful',
    user,
  });
});

/**
 * @LOGIN
 * @request_type POST
 * @route http://localhost:4000/api/v1/auth/login
 * @description Controller that allows user to login
 * @params email, password
 * @returns Response object
 */

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new CustomError(
      "Sorry, we can't find an account with this email address. Please create a new account.",
      401
    );
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    throw new CustomError('Incorrect password. Please try again or reset your password.', 401);
  }

  const accessToken = user.generateJwtToken();
  user.password = undefined;

  res.status(200).cookie('token', accessToken, cookieOptions).json({
    success: true,
    message: 'Login successful',
    user,
  });
});

/**
 * @LOGOUT
 * @request_type POST
 * @route http://localhost:4000/api/v1/auth/logout
 * @description Controller that allows user to logout
 * @params none
 * @returns Response object
 */

export const logout = asyncHandler(async (_req, res) => {
  res.status(200).clearCookie('token', cookieOptions).json({
    success: true,
    message: 'Logout successful',
  });
});

/**
 * @GET_PROFILE
 * @request_type GET
 * @route http://localhost:4000/api/v1/auth/profile
 * @description Controller that allows user to fetch his profile
 * @params none
 * @returns User object
 */

export const getProfile = asyncHandler(async (_req, res) => {
  const { user } = res;

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: 'Profile successfully fetched',
    user,
  });
});

/**
 * @DELETE_PROFILE
 * @request_type DELETE
 * @route http://localhost:4000/api/v1/auth/profile
 * @description Controller that allows user to delete his account
 * @params password
 * @returns Response object
 */

export const deleteProfile = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { user } = res;

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    throw new CustomError('Incorrect password. Please try again.', 401);
  }

  await user.remove();

  res.status(200).clearCookie('token', clearCookie).json({
    success: true,
    message: 'Account successfully deleted',
  });
});