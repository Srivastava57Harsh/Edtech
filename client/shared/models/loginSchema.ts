import { object, string, TypeOf } from 'yup';

export const loginSchema = object({
  email: string().required('Please enter a E-Mail').email('Please enter a valid E-Mail'),
  password: string().min(6, 'Password should be of min 6 characters.').required('Please enter your Password'),
});

export type login = TypeOf<typeof loginSchema>;
