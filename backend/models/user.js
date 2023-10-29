import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import regexp from '../utils/regexp';
import config from '../config/config';

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

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods = {
  comparePassword: async function (password) {
    return await bcrypt.compare(password, this.password);
  },

  generateJwtToken: function () {
    const token = jwt.sign({ userId: this._id }, config.TOKEN_SECRET, {
      expiresIn: config.TOKEN_EXPIRY,
    });

    return token;
  },

  generateForgotPasswordToken: function () {
    const token = crypto.randomBytes(32).toString('hex');
    this.forgotPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    this.forgotPasswordExpiry = new Date(Date.now() + 30 * 60 * 1000);

    return token;
  },
};

export default mongoose.model('Users', userSchema);
