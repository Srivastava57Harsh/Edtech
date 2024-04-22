import { ref, object, string, TypeOf } from 'yup';

export const signupSchema = object({
  firstname: string().required('Please enter your first name'),
  lastname: string().required('Please enter your last name'),
  email: string().email('Enter a valid email').required('Email is required'),
  phone: string()
    .required('Please enter a Number')
    .min(10, 'Enter a valid Phone Number')
    .max(10, 'Enter a valid Phone Number'),
  password: string().min(6, 'Password should be of min 6 characters.').required('Password is required'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});

export type signup = TypeOf<typeof signupSchema>;
