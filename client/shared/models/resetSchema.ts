import { ref, object, string, TypeOf } from 'yup';

export const resetPassSchema = object({
  password: string().required('Password is required'),
  passwordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});

export type signup = TypeOf<typeof resetPassSchema>;
