import { Request, Response, Router } from 'express';
import LoggerInstance from '../../loaders/logger';
import { paymentSuccessService, paymentFailedService } from './controller';

const handleWebhook = async (req: Request, res: Response) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const webhookEvent = req.body.event.toString();
    const slug = {
      status: 200,
      success: true,
      message: 'message',
    };
    if (webhookEvent == 'order.paid') {
      await paymentSuccessService(req.body, signature);
      slug.status = 200;
      slug.success = true;
      slug.message = 'Data updated, course successfully added.';
    } else {
      await paymentFailedService(req.body, signature);
      slug.status = 424;
      slug.success = false;
      slug.message = 'Data could not be updated';
    }
    res.status(slug.status).json({ success: slug.success, message: slug.message });
  } catch (err) {
    LoggerInstance.error(err.message);
    res.status(err.code || 500).json({
      success: false,
      message: err.message || 'Unable to update the payment info',
    });
  }
};

const webhookRouter = Router();

webhookRouter.post('/validate', handleWebhook);

export default webhookRouter;
