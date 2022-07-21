import { ref, object, string, TypeOf } from 'yup';

export const signupSchema = object({
  firstname: string().required('Please enter your first name'),
  lastname: string().required('Please enter your last name'),
  email: string().email().required(),
  phone: string()
    .required('Please enter a Number')
    .min(10, 'Enter a valid Phone Number')
    .max(10, 'Enter a valid Phone Number'),
  password: string().required('Password is required'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});

export type signup = TypeOf<typeof signupSchema>;
