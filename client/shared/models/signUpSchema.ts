import { ref, object, string, TypeOf } from 'yup';

export const signupSchema = object({
  firstName: string().required('Please enter your name'),
  lastName: string().required('Please enter your last name'),
  email: string().required().email(),
  phone: string().required(),
  password: string().required('Password is required'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});

export type signup = TypeOf<typeof signupSchema>;
