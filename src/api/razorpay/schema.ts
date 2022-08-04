import * as yup from 'yup';
const createOrder = {
  courseId: yup.string().required(),
};

const orderStatus = {
  order_id: yup.string().required(),
};

export const createOrderSchema = new yup.ObjectSchema(createOrder);
export const orderStatusSchema = new yup.ObjectSchema(orderStatus);
