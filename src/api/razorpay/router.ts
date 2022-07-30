import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { getProfile } from '../auth/controller';
import { createOrder } from './controller';

async function handleCreateOrder(req: Request, res: Response) {
  try {
    const token = req.headers.authorization;
    LoggerInstance.info(token);
    const user = await getProfile(token.substring(7, token.length));
    const body = {
      email: user.email,
      courseId: req.body.courseId,
    };
    const order = await createOrder(body);
    res.status(200).json({
      message: order.message,
      data: order,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

const razorpayRouter = Router();

razorpayRouter.post('/createOrder', handleCreateOrder);

export default razorpayRouter;
