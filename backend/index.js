import express from 'express';
import mongoose from 'mongoose';
import config from './config/config.js';

const app = express();

(async () => {
  try {
    const res = await mongoose.connect(config.MONGODB_URL, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`Database connection established on ${res.connection.host}`);

    app.listen(config.PORT, () => console.log(`App is listening on port ${config.PORT}`));

    mongoose.connection.on('error', error => {
      console.log(`${error.name}: ${error.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Database connection lost');
    });

    mongoose.connection.on('reconnected', () => {
      console.log(`Database connection restablished on ${res.connection.host}`);
    });
  } catch (error) {
    console.log('Database connection failed');
    console.log(`${error.name}: ${error.message}`);
    process.exit(1);
  }
})();
