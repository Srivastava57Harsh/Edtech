import { Router } from 'express';
import authRouter from './auth/router';
import adminAuthRouter from './admin/router';

export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter);
  app.use('/admin', adminAuthRouter);

  return app;
};
