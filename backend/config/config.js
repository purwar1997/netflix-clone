import dotenv from 'dotenv';

dotenv.config({ debug: true });

const config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  TOKEN_EXPIRY: process.env.TOKEN_EXPIRY,
  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,
  SMTP_USERNAME: process.env.SMTP_USERNAME,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
};

export default config;
