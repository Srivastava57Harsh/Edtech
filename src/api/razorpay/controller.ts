import shortid from 'shortid';
import Razorpay from 'razorpay';
import database from '../../loaders/database';
import config from '../../config';
import { ObjectId } from 'mongodb';
import OrderDetails from './model';

const razorpayClient = new Razorpay({
  key_id: config.razorpay_key_id,
  key_secret: config.razorpay_key_secret,
});

export async function createOrder(orderDetails: OrderDetails): Promise<any> {
  const course = await (await database()).collection('courses').findOne({ _id: new ObjectId(orderDetails.courseId) });
  if (!course) {
    throw {
      message: 'Course does not exist.',
      status: 404,
    };
  } else {
    const user = await (await database()).collection('users').findOne({ email: orderDetails.email });
    if (user.courses.includes(orderDetails.courseId)) {
      throw {
        message: 'User already owns the course.',
        status: 400,
      };
    } else {
      const options = {
        amount: course.price,
        currency: 'INR',
        receipt: shortid.generate(orderDetails.courseId),
      };
      const response = await razorpayClient.orders.create(options);
      const order = await (await database()).collection('orders').findOne({ generatedOrderid: response.id });
      if (!order) {
        orderDetails.generateOrderId = response.id;
        orderDetails.slug = response;
        orderDetails.isPaid = false;

        await (await database()).collection('orders').insertOne(orderDetails);
        return {
          bool: true,
          message: 'Success, Order created.',
          status: 200,
          orderData: response,
        };
      } else {
        throw {
          code: 409,
          message: 'OrderID already exists',
        };
      }
    }
  }
}
