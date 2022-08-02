import * as yup from 'yup';
const getCourse = {
  courseId: yup.string().required(),
};
export const getCourseSchema = new yup.ObjectSchema(getCourse);
