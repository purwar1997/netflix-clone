import crypto from 'crypto';
import User from '../models/user.model.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import cookieOptions from '../utils/cookieOptions.js';
import mailSender from '../services/mailSender.js';

/**
 * @SIGNUP
 * @request_type POST
 * @route http://localhost:4000/api/v1/auth/signup
 * @description Controller that allows user to signup
 * @params name, email, password, confirmPassword
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
 * @returns User object
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
 * @FORGOT_PASSWORD
 * @request_type POST
 * @route http://localhost:4000/api/v1/auth/password/forgot
 * @description Controller that sends an email to user to reset his password
 * @params email
 * @returns Response object
 */

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("Sorry, we can't find an account with this email address.", 401);
  }

  const resetPasswordToken = user.generateForgotPasswordToken();

  await user.save({ validateBeforeSave: true });

  const resetPasswordLink = `${req.protocol}//${req.host}/api/v1/auth/password/reset/${resetPasswordToken}`;

  try {
    await mailSender({
      email,
      subject: 'Password reset mail',
      text: `To reset password, copy paste the following url in browser and hit enter: ${resetPasswordLink}`,
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save({ validateBeforeSave: true });

    throw new CustomError(error.message || 'Failure sending password reset email.', 500);
  }

  res.status(200).json({
    success: true,
    message: 'Password reset email successfully sent',
  });
});

/**
 * @RESET_PASSWORD
 * @request_type PUT
 * @route http://localhost:4000/api/v1/auth/password/reset/:token
 * @description Controller that allows user to reset his password
 * @params password, confirmPassword
 * @returns Response object
 */

export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const encryptedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    forgotPasswordToken: encryptedToken,
    forgotPasswordExpiry: { $gt: new Date() },
  }).select('+password');

  if (!user) {
    throw new CustomError('Password reset token invalid or expired.', 500);
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password reset successful',
  });
});

/**
 * @UPDATE_PASSWORD
 * @request_type PUT
 * @route http://localhost:4000/api/v1/auth/password/update
 * @description Controller that allows authenticated user to update his password
 * @params oldPassword, newPassword, confirmNewPassword
 * @returns Response object
 */

export const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { user } = res;

  const passwordMatched = await user.comparePassword(oldPassword);

  if (!passwordMatched) {
    throw new CustomError('Incorrect password. Please try again.', 401);
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'Password sucessfully updated',
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

  res.status(200).clearCookie('token', cookieOptions).json({
    success: true,
    message: 'Account successfully deleted',
  });
});
