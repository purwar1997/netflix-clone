import dotenv from 'dotenv';

dotenv.config({ debug: true });

const config = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
};

export default config;
