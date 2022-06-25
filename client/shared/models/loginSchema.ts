import { object, string, TypeOf } from "yup";

export const loginSchema = object({
    phone: string()
        .required("Please enter a Number")
        .email("Please enter a valid Number"),
    otp: string().required("Please enter the OTP"),
});

export type login = TypeOf<typeof loginSchema>;