import type { NextPage } from 'next';
import axios from 'axios';
import Router from 'next/router';
import { useState } from 'react';
import { FormEvent, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../../config';
import { sendToast } from '../../shared/helper/toastify';

const signUpPage: NextPage = () => {
  const [userData, setUserData] = useState<any>({});

  async function SignUpUser(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = {
        email: (event.currentTarget.elements[0] as HTMLInputElement).value,
        secretQuestion: (event.currentTarget.elements[1] as HTMLInputElement).value,
        secretAnswer: (event.currentTarget.elements[2] as HTMLInputElement).value,
      };
      console.log(formData);
      //   await validation(formData, signupSchema);
      const body = {
        email: formData.email,
        secretQuestion: formData.secretQuestion,
        secretAnswer: formData.secretAnswer,
      };
      console.log(body);
      setUserData(body);

      const response = await axios({
        method: 'post',
        url: `${API_URL}/auth/forgotPassword`,
        data: body,
      });
      if (response) {
        // await sendToast('success', 'Signup Successful');
        await Router.push(`/resetPassword/${response.data.userId}/${response.data.resetToken}`);
      }
    } catch (err: any) {
      console.log(err);
      sendToast(err.message || 'Something went wrong', 'warn');
    }
  }

  const SignUpForm = () => (
    <form
      className="flex flex-col justify-center items-center text-primary min-w-full min-h-screen bg-gradient-to-r from-background to-bg-blue"
      onSubmit={SignUpUser}
      method="POST"
    >
      <h2 className="font-black text-5xl pb-2">
        DataLync<span className="text-primary-orange">.</span>
      </h2>
      <h3 className="mb-4 text-slate-600">Learn with technology</h3>
      <h2 className="mb-4 text-2xl text-orange-500">Recover your Password</h2>
      <div className="flex flex-col items-center  w-2/3 sm:w-1/3 ">
        <label className="mt-4 pl-1 text-md w-[360px] font-thick text-gray-500">Enter your registered email-id</label>
        <input
          className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
          type="email"
          name="email"
          placeholder="E-Mail"
          id="email"
        />
        <label
          className="mt-4 pl-1 text-md w-[360px] font-thick text-gray-500
        "
        >
          Enter the secret question you had entered <br /> while creating your account
        </label>
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
        <label
          className="mt-4 pl-1 text-md w-[360px] font-thick text-gray-500
        "
        >
          Enter the secret answer you had entered <br /> while creating your account
        </label>
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
      </div>
      <button
        className="mt-10 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
        h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
        type="submit"
        id="sign-up-button"
      >
        Proceed
      </button>
    </form>
  );

  //   useEffect(() => {
  //     if (localStorage.getItem('jwtToken')) {
  //       //validatetoken here
  //       // Router.push('/dashboard');
  //     }
  //   }, []);

  return (
    <>
      <ToastContainer />
      <SignUpForm />
    </>
  );
};

export default signUpPage;
