import type { NextPage } from 'next';
import axios from 'axios';
import Router from 'next/router';
import { FormEvent, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { sendToast } from '../../shared/helper/toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validation } from '../../shared/helper/validator';
import { loginSchema } from '../../shared/models/loginSchema';
import { API_URL } from '../../config';

const LoginPage: NextPage = () => {
  async function LoginUser(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = {
        email: (event.currentTarget.elements[0] as HTMLInputElement).value,
        secretQuestion: (event.currentTarget.elements[1] as HTMLInputElement).value,
        secretAnswer: (event.currentTarget.elements[2] as HTMLInputElement).value,
      };
      console.log(formData);
      //   await validation(formData, loginSchema);
      if (!localStorage.getItem('jwtToken')) {
        const response = await axios({
          method: 'post',
          url: '/auth/forgotPassword',
          data: formData,
        });
        localStorage.setItem('jwtToken', response.data.jwtToken);
      }
      //login here
      const response = await axios({
        method: 'post',
        url: `${API_URL}/auth/forgotPassword`,
        data: formData,
      });
      console.log(response.data);
      //   await Router.push('/dashboard');
    } catch (err: any) {
      console.log(err);
      sendToast(err.message || 'Something went wrong', 'warn');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      //Router.push('/dashboard');
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
          Databuddy<span className="text-primary-orange">.</span>
        </h2>
        <h3 className="mb-6 text-slate-600">Learn with technology</h3>
        <h1 className=" text-orange-600 text-xl font-semibold">Renew your Password</h1>
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
          <select
            className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            name="Secret Question"
            placeholder="Secret Question"
            id="confirm-password"
          >
            <option value="" disabled selected>
              Secret Question
            </option>
            <option value="What is your pet name?">What is your pet name?</option>
            <option value="What is your birth city?">What is your birth city?</option>
            <option value="What is your car name?">What is your car name?</option>
            <option value="What is your school name?">What is your school name?</option>
          </select>
          <input
            className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            type="answer"
            name="Secret Answer"
            placeholder="Secret Answer"
            id="confirm-password"
          />
          <button
            className="mt-7 mb-2 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
            h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
            type="submit"
          >
            Proceed
          </button>
          {/* <a href="http://localhost:3001/signup" className=" hover:text-orange-600">
            Don't have an account, Sign Up!
          </a>
          <a href="http://localhost:3001/forgot-password" className=" hover:text-orange-600">
            Forgot Password
          </a> */}
        </div>
      </form>
    </>
  );
};

export default LoginPage;
