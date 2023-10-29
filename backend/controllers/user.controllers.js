import User from '../models/user.model.js';
import asyncHandler from '../services/asyncHandler.js';
import CustomError from '../utils/CustomError.js';
import regexp from '../utils/regexp.js';
import cookieOptions from '../utils/cookieOptions.js';

/**
 * @SIGNUP
 * @request_type POST
 * @route http://localhost:4000/api/v1/auth/signup
 * @description Controller that allows user to signup
 * @params name, email, password, confirmPassword
 * @returns User object
 */

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!(name && email && password && confirmPassword)) {
    throw new CustomError('Please provide all the details.', 400);
  }

  const isEmailValid = regexp.email.test(email);

  if (!isEmailValid) {
    throw new CustomError('Please provide a valid email address.', 400);
  }

  const isPasswordValid = regexp.password.test(password);

  if (!isPasswordValid) {
    throw new CustomError(
      'Password must be 8-60 characters long and should contain atleast one digit, one letter and one special character.',
      400
    );
  }

  if (password !== confirmPassword) {
    throw new CustomError("Passwords dont't match.", 400);
  }

  let user = await User.findOne({ email: email.trim().toLowerCase() });

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
    message: 'User succesfully signed up',
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

  if (!(email && password)) {
    throw new CustomError('Please provide email and password.', 400);
  }

  const isEmailValid = regexp.email.test(email);

  if (!isEmailValid) {
    throw new CustomError('Please provide a valid email address.', 400);
  }

  const isPasswordValid = regexp.password.test(password);

  if (!isPasswordValid) {
    throw new CustomError(
      'Password must be 8-60 characters long and should contain atleast one digit, one letter and one special character.',
      400
    );
  }

  const user = await User.findOne({ email: email.trim().toLowerCase() }).select('+password');

  if (!user) {
    throw new CustomError(
      "Sorry, we can't find an account with this email address. Please create a new account.",
      400
    );
  }

  const passwordMatched = await user.comparePassword(password);

  if (!passwordMatched) {
    throw new CustomError('Incorrect password. Please try again or reset your password.', 400);
  }

  const accessToken = user.generateJwtToken();

  res.status(200).cookie('token', accessToken, cookieOptions);

  res.status(200).json({
    success: true,
    message: 'User successfully logged in',
  });
});
