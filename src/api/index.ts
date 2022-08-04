import { Router } from 'express';
import authRouter from './auth/router';
import adminAuthRouter from './admin/router';
import dashboardRouter from './dashboard/router';
import razorpayRouter from './razorpay/router';
import webhookRouter from './webhook/router';

export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter);
  app.use('/admin', adminAuthRouter);
  app.use('/dashboard', dashboardRouter);
  app.use('/razorpay', razorpayRouter);
  app.use('/webhook', webhookRouter);
  return app;
};
