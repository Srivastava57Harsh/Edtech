import { object, string, TypeOf } from 'yup';

export const otpSchema = object({
  phone: string()
    .required('Please enter a Number')
    .min(10, 'Enter a valid Phone Number')
    .max(10, 'Enter a valid Phone Number'),
  otp: string().required('Please enter the OTP').min(6, 'Enter a valid OTP').max(6, 'Enter a valid OTP'),
});

export const phoneValidate = object({
  phone: string()
    .required('Please enter a Number')
    .min(10, 'Enter a valid Phone Number')
    .max(10, 'Enter a valid Phone Number'),
});

export type otpSchema = TypeOf<typeof otpSchema>;
