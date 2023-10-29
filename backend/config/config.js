import dotenv from 'dotenv';

dotenv.config({ debug: true });

const config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,
};

export default config;
