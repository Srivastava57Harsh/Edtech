import config from '../../config';
import database from '../../loaders/database';
import Razorpay from 'razorpay';

//Payment Success Handler

const paymentSuccessService = async (razorpayPaymentDetails: any, signature: string | string[]) => {
  if (razorpayPaymentDetails.event !== 'order.paid') {
    throw { code: 400, message: 'The event details do not match' };
  }
  const razorpay_secret = config.razorpay_key_secret;
  if (Razorpay.validateWebhookSignature(JSON.stringify(razorpayPaymentDetails), signature, razorpay_secret)) {
    throw { code: 401, message: 'Razorpay Signature did not match' };
  }
  const data = razorpayPaymentDetails.payload;
  const orderID = data.order.entity.id; //orderID used as a key
  if (data.order.entity.status !== 'paid') {
    throw { code: 400, message: 'Order is not paid' };
  }
  const db = await database();
  const user = await db.collection('orders').findOne({ generatedOrderid: orderID });
  if (!user) throw { code: 404, message: 'User not found' };
  if (user.paymentStatus) throw { code: 409, message: 'Already paid' };
  const ordersDB = await (await database()).collection('orders').findOne({ generatedOrderid: orderID });
  if (!ordersDB) {
    throw {
      code: 400,
      message: 'OrderId does not exist.',
    };
  } else {
    await ordersDB.updateOne({ $set: { isPaid: true } });
  }
  const userInfo = await (await database()).collection('users').findOne({ email: ordersDB.email });
  if (!userInfo) {
    throw {
      code: 400,
      message: 'User does not exist.',
    };
  } else {
    await userInfo.updateOne({ $push: { courses: ordersDB.courseId } });
  }
};

//Payment Failure Handler

const paymentFailedService = async (razorpayPaymentDetails: any, signature: string | string[]) => {
  if (razorpayPaymentDetails.event !== 'order.paid') {
    throw { code: 400, message: 'The event details do not match' };
  }
  const razorpay_secret = config.razorpay_key_secret;
  if (Razorpay.validateWebhookSignature(JSON.stringify(razorpayPaymentDetails), signature, razorpay_secret)) {
    throw { code: 401, message: 'Razorpay Signature did not match' };
  }
  const data = razorpayPaymentDetails.payload;
  const orderID = data.order.entity.id;
  if (data.order.entity.status !== 'failed') {
    throw { code: 400, message: 'Order did not fail' };
  }
  const db = await database();
  const user = await db.collection('orders').findOne({ generatedOrderid: orderID });
  if (!user) throw { code: 404, message: 'User not found' };
  const ordersDB = (await database()).collection('orders');
  await ordersDB.updateOne({ generatedOrderid: orderID }, { $set: { isPaid: false } });
};
export { paymentSuccessService, paymentFailedService };
