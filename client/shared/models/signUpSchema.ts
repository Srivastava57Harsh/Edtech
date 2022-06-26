import { object, string, TypeOf } from 'yup';

export const signupSchema = object({
    firstName: string().required("Please enter your name"),
    lastName: string().required("Please enter your last name"),
    email: string().required().email(),
    phone: string().required(),
});

export type signup = TypeOf<typeof signupSchema>;
