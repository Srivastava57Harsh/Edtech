require('dotenv').config();

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
  /**
   * Port the app should run on
   */
  port: parseInt(process.env.PORT) || 5050,

  /**
   * Database the app should connect to
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * The secret sauce to validate JWT
   */
  jwtSecret: process.env.JWT_SECRET,

  /**
   * Used by Winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },

  /**
   * Used BCrypt for Salting
   */
  salt: parseInt(process.env.SALT || '100'),

  /**
   * Thse secret and id for razorpay
   */
  razorpay_key_id: process.env.RAZORPAY_KEY_ID,
  razorpay_key_secret: process.env.RAZORPAY_KEY_SECRET,

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },
};
