import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { paymentSuccessService, paymentFailedService } from './controller';

const handleWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookEvent = req.body.event.toString();
    switch (webhookEvent) {
      case 'order.paid': {
        await paymentSuccessService(req.body, signature);
      }
      case 'payment.failed': {
        await paymentFailedService(req.body, signature);
      }
    }
    res.status(200).json({ success: true, message: 'Data updated' });
  } catch (err) {
    LoggerInstance.error(err.message);
    res.status(err.code || 500).json({
      success: false,
      message: err.message || 'Unable to update the payment info',
    });
  }
};

const webhookRouter = Router();

webhookRouter.post('/webhook', handleWebhook);

export default webhookRouter;
