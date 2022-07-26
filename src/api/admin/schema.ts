import { add } from 'winston';
import * as yup from 'yup';
const login = {
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
};

const getProfile = {
  authorization: yup.string().required(),
};

const addCourse = {
  name: yup.string().required(),
  data: yup.array().required(),
  price: yup.number().required(),
  slug: yup.string().required(),
};

const courseData = {
  subname: yup.string().required(),
  description: yup.string().required(),
  youtubeLink: yup.string().required(),
  githubLink: yup.string().required(),
  date: yup.string().required(),
};

// const forgotPassword = {
//   email: yup.string().email().required(),
//   secretQuestion: yup.string().required(),
//   secretAnswer: yup.string().required(),
// };

// const resetPasswordBody = {
//   id: yup.string().required(),
//   newPassword: yup.string().min(6).required(),
// };

export const loginSchema = new yup.ObjectSchema(login);
export const addCourseSchema = new yup.ObjectSchema(addCourse);
export const courseDataSchema = new yup.ObjectSchema(courseData);
// export const forgotPasswordSchema = new yup.ObjectSchema(forgotPassword);
// export const resetPasswordSchema = new yup.ObjectSchema(resetPasswordBody);
export const getProfileSchema = new yup.ObjectSchema(getProfile);
