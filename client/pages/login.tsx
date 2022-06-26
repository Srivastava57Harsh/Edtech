import type { NextPage } from 'next';
import Router from 'next/router';
import React, { useState } from 'react';
import { FormEvent, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { sendToast } from '../shared/helper/toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validation } from '../shared/helper/validator';
import { loginSchema, phoneValidate } from '../shared/models/loginSchema';

const OTPInput: React.FC<{ setOtpInput: React.Dispatch<React.SetStateAction<number | undefined>> }> = ({
  setOtpInput,
}) => {
  return (
    <>
      <input
        className="mt-4 pl-6 border border-slate-600 text-xl font-bold bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 min-w-[14px] active:shadow-2xl transition duration-300 ease-in-out
                         focus:outline-none focus:border-primary
                        focus:ring-1 focus:ring-primary focus:bg-elevated"
        type="number"
        name="OTP"
        id="otp"
        maxLength={6}
        placeholder="OTP"
        onChange={e => {
          setOtpInput(e.target.valueAsNumber);
        }}
      />
    </>
  );
};

const loginPage: NextPage = () => {
  const [showOTPField, setOTPField] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [otpInput, setOtpInput] = useState<number>();
  // const [validationError, setValidateError] = useState();

  async function loginUser() {
    try {
      const formData = {
        phone: phoneInput,
        otp: otpInput,
      };
      console.log(formData);
      await validation(formData, loginSchema);
      await Router.push('/dashboard');
    } catch (err: any) {
      console.log(err);
      sendToast(err.message || 'Something went wrong', 'warn');
    }
  }

  const sendOTP = async () => {
    setOTPField(true);
    await sendToast('OTP sent', 'success');
  };

  const validatePhone = async (event: any) => {
    try {
      event.preventDefault();
      const formData = {
        phone: phoneInput,
      };
      await validation(formData, phoneValidate);
      setPhoneValid(true);
      await sendOTP();
    } catch (err: any) {
      sendToast(err.message || 'Something went wrong', 'warn');
      console.log({ err });
    }
  };

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      Router.push('/dashboard');
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="flex flex-col justify-center items-center text-primary min-w-full min-h-screen bg-gradient-to-r from-background to-bg-blue">
        <h2 className="font-black text-5xl pb-2">
          Databuddy<span className="text-primary-orange">.</span>
        </h2>
        <h3 className="mb-9 text-slate-600">Learn with technology</h3>
        <div className="flex flex-col items-center  w-2/3 sm:w-1/3 ">
          <input
            className="pl-6 border border-slate-600 text-xl font-bold
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 min-w-[14px] active:drop-shadow-xl focus:shadow-black
                           focus:outline-none focus:border-primary transition duration-300 ease-in-out
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            type="number"
            name="phone"
            max={10}
            placeholder="Phone"
            onChange={e => {
              setPhoneInput(e.target.value);
            }}
            id="phone"
          />
          {showOTPField && phoneValid ? <OTPInput setOtpInput={setOtpInput} /> : null}
          <button
            className="mt-10 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
                      h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
            onClick={phoneValid ? loginUser : validatePhone}
          >
            {showOTPField && phoneValid ? 'Login' : 'Get OTP'}
          </button>
        </div>
      </div>
    </>
  );
};

export default loginPage;
