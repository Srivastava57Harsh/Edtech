import shortid from 'shortid';
import Razorpay from 'razorpay';
import database from '../../loaders/database';
import config from '../../config';
import { ObjectId } from 'mongodb';

const razorpayClient = new Razorpay({
  key_id: config.razorpay_key_id,
  key_secret: config.razorpay_key_secret,
});

const OrderDetails = {
  email: '',
  userId: '',
  generateOrderId: '',
  courseId: '',
  isPaid: false,
  slug: {},
};

export async function createOrder(email: string, userId: string, courseId: string): Promise<any> {
  const course = await (await database()).collection('courses').findOne({ _id: new ObjectId(courseId) });
  if (!course) {
    throw {
      message: 'Course does not exist.',
      status: 404,
    };
  } else {
    const options = {
      amount: course.price,
      currency: 'INR',
      receipt: shortid.generate(),
    };
    const response = await razorpayClient.orders.create(options);
    const order = await (await database()).collection('orders').findOne({ generatedOrderid: response.id });
    if (!order) {
      OrderDetails.email = email;
      OrderDetails.userId = userId;
      OrderDetails.generateOrderId = response.id;
      OrderDetails.courseId = courseId;
      OrderDetails.slug = response;

      const ordersDB = (await database()).collection('orders');
      await ordersDB.insertOne({ OrderDetails });
      return {
        bool: true,
        message: 'Success, Order created.',
        status: 200,
        data: response,
      };
    } else {
      throw {
        code: 409,
        message: 'OrderID already exists',
      };
    }
  }
}
