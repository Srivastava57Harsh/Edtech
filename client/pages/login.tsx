import type { NextPage } from 'next';
import Router from 'next/router';
import { FormEvent, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { sendToast } from '../shared/helper/toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validation } from '../shared/helper/validator';
import { loginSchema } from '../shared/models/loginSchema';
import { API_URL, FE_URL } from '../config';
import { fetchUser, handleLoginUser, handleSignUpUser } from '../shared/helper/axios';
import { getCookie, setCookie } from 'cookies-next';
import useAuth from '../hooks/useAuth';

const LoginPage: NextPage = () => {
  const emailData = { email: '' };
  async function LoginUser(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = {
        email: (event.currentTarget.elements[0] as HTMLInputElement).value,
        password: (event.currentTarget.elements[1] as HTMLInputElement).value,
      };
      emailData.email = formData.email;
      await validation(formData, loginSchema);
      //login here
      const response = await handleLoginUser(formData);
      //set cookie
      if (response) {
        setCookie('accessToken', response.accessToken);
        setCookie('refreshToken', response.refreshToken);
        await Router.push('/user/dashboard');
      }
    } catch (err: any) {
      if (
        err.response.data.message ==
        'User Already Logged into some other device. Please log out from all other devices.'
      ) {
        return Router.push(`logout-devices?email=${emailData.email}`);
      }
      sendToast(err.response.data.message || 'Something went wrong', 'warn');
      console.log('error', err);

      console.log(err.message);
    }
  }

  useEffect(() => {
    if (getCookie('accessToken')) {
      Router.push('/user/dashboard');
    }
  }, []);

  return (
    <>
      <ToastContainer />

      <form
        className="flex flex-col justify-center items-center text-primary min-w-full min-h-screen bg-gradient-to-r from-background to-bg-blue"
        onSubmit={LoginUser}
        method="POST"
      >
        <h2 className="font-black text-5xl pb-2">
          DataLync<span className="text-primary-orange">.</span>
        </h2>
        <h3 className="mb-9 text-slate-600">Learn with technology</h3>
        <div className="flex flex-col items-center  w-2/3 sm:w-1/3 ">
          <input
            className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            type="email"
            name="email"
            placeholder="E-Mail"
            id="name"
          />
          <input
            className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            type="password"
            name="password"
            placeholder="Password"
            id="password"
          />
          <button
            className="mt-10 mb-2 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
            h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
            type="submit"
          >
            Login
          </button>
          <a href={`${FE_URL}/signup`} className=" hover:text-primary-orange">
            Don't have an account, Sign Up!
          </a>
          <a href={`${FE_URL}/forgotpassword`} className=" hover:text-primary-orange">
            Forgot Password
          </a>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
