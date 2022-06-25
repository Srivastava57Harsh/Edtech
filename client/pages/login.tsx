import type { NextPage } from 'next';
import Router from 'next/router';
import { useState } from 'react';
import { FormEvent, useEffect } from 'react';
import { validation } from '../shared/helper/validator';
import { loginSchema } from '../shared/models/loginSchema';

const loginPage: NextPage = () => {
  async function loginUser(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = {
        phone: (event.currentTarget.elements[0] as HTMLInputElement).value,
        otp: (event.currentTarget.elements[1] as HTMLInputElement).value,
      };
      console.log(formData);
      await validation(formData, loginSchema);

      // if (!localStorage.getItem('jwtToken')) {
      //   const response = await axios({
      //     method: 'post',
      //     url: './api/user/login',
      //     data: formData,
      //   });
      //   localStorage.setItem('jwtToken', response.data.jwtToken);
      // }

      await Router.push('/dashboard');
    } catch (err: any) {
      console.log(err);
      //sendToast(err.message || 'Something went wrong', 'warn');
    }
  }

  const [showOTPField, setOTPField] = useState(false);
  const onClick = () => setOTPField(true);

  const GetOTP = () => (
    <>
      <button
        className="mt-10 rounded-xl bg-primary min-w-[150px] text-xl
                      h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
        onClick={onClick}
      >
        Get OTP
      </button>
    </>
  );

  const SubmitOTP = () => (
    <>
      <input
        className="mt-4 pl-6 border border-slate-600 text-xl font-bold
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 min-w-[14px] active:shadow-2xl
                           focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
        type="number"
        name="OTP"
        id="otp"
        placeholder="OTP"
      />
      <button
        className="mt-10 rounded-xl bg-primary min-w-[150px] text-xl
                      h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
        onClick={onClick}
      >
        Login
      </button>
    </>
  );

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      Router.push('/dashboard');
    }
  }, []);

  return (
    <>
      {/*
      <ToastContainer /> */}

      <form
        className="flex flex-col justify-center items-center text-primary min-w-full min-h-screen bg-gradient-to-r from-background to-bg-blue"
        onSubmit={loginUser}
        method="POST"
      >
        <h2 className="font-black text-5xl pb-2">
          Databuddy<span className="text-primary-orange">.</span>
        </h2>
        <h3 className="mb-9 text-slate-600">Learn with technology</h3>
        <div className="flex flex-col items-center  w-2/3 sm:w-1/3 ">
          <input
            className="pl-6 border border-slate-600 text-xl font-bold
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 min-w-[14px] active:drop-shadow-xl focus:shadow-black
                           focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            type="number"
            name="name"
            placeholder="Phone"
            id="name"
          />
          {showOTPField ? <SubmitOTP /> : <GetOTP />}
        </div>
      </form>
    </>
  );
};

export default loginPage;
