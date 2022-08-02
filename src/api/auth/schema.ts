import * as yup from 'yup';
const login = {
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
};

const signUp = {
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  phone: yup.number().required(),
  secretQuestion: yup.string().required(),
  secretAnswer: yup.string().required(),
};

const getProfile = {
  authorization: yup.string().required(),
};

const verify = {
  phone: yup.number().required(),
  status: yup.boolean().required(),
};

const forgotPassword = {
  email: yup.string().email().required(),
  secretQuestion: yup.string().required(),
  secretAnswer: yup.string().required(),
};

const resetPasswordBody = {
  id: yup.string().required(),
  newPassword: yup.string().min(6).required(),
};

export const loginSchema = new yup.ObjectSchema(login);
export const signUpSchema = new yup.ObjectSchema(signUp);
export const getProfileSchema = new yup.ObjectSchema(getProfile);
export const verificationSchema = new yup.ObjectSchema(verify);
export const forgotPasswordSchema = new yup.ObjectSchema(forgotPassword);
export const resetPasswordSchema = new yup.ObjectSchema(resetPasswordBody);
