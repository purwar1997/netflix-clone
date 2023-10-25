import mongoose from 'mongoose';
import regexp from '../utils/regexp';

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, 'Name is required'],
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [regexp.email, 'Please provide a valid email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      match: [
        regexp.password,
        'Password should be 8-60 characters long and must contain atleast one digit, one letter and one special character',
      ],
      select: false,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Users', userSchema);
