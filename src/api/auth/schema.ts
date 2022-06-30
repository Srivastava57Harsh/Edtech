import * as yup from 'yup';
const login = {
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
};
const signUp = {
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phone: yup.number().required(),
};
const getProfile = {
  authorization: yup.string().required(),
};

const verify = {
  phone: yup.number().required(),
  status: yup.boolean().required(),
};

export const loginSchema = new yup.ObjectSchema(login);
export const signUpSchema = new yup.ObjectSchema(signUp);
export const getProfileSchema = new yup.ObjectSchema(getProfile);
export const verificationSchema = new yup.ObjectSchema(verify);
