import { Router } from 'express';
import authRouter from './auth/router';

export default (): Router => {
  const app = Router();

  app.use('/auth', authRouter);

  return app;
};
