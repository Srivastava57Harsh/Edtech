import type { NextPage } from 'next';
import axios from 'axios';
import Router from 'next/router';
import { useState } from 'react';
import { FormEvent, useEffect } from 'react';
import { validation } from '../shared/helper/validator';
import { signupSchema } from '../shared/models/signUpSchema';
import { ToastContainer } from 'react-toastify';
import { sendToast } from '../shared/helper/toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config';

const signUpPage: NextPage = () => {
  const [userData, setUserData] = useState<any>({});

  async function SignUpUser(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = {
        firstname: (event.currentTarget.elements[0] as HTMLInputElement).value,
        lastname: (event.currentTarget.elements[1] as HTMLInputElement).value,
        email: (event.currentTarget.elements[2] as HTMLInputElement).value,
        phone: (event.currentTarget.elements[3] as HTMLInputElement).value,
        password: (event.currentTarget.elements[4] as HTMLInputElement).value,
        passwordConfirmation: (event.currentTarget.elements[5] as HTMLInputElement).value,
        secretQuestion: (event.currentTarget.elements[6] as HTMLInputElement).value,
        secretAnswer: (event.currentTarget.elements[7] as HTMLInputElement).value,
      };
      console.log(formData);
      await validation(formData, signupSchema);
      const body = {
        firstName: formData.firstname,
        lastName: formData.lastname,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        secretQuestion: formData.secretQuestion,
        secretAnswer: formData.secretAnswer,
      };
      body.phone = '+91' + body.phone;
      console.log(body);
      setUserData(body);

      const response = await axios({
        method: 'post',
        url: `${API_URL}/auth/signUp`,
        data: body,
      });
      if (response) {
        await sendToast('success', 'Signup Successful');
        await Router.push('/login');
      }
    } catch (err: any) {
      sendToast(err.response.data.message || 'Something went wrong', 'warn');
      console.log(err);
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
      <h3 className="mb-9 text-slate-600">Learn with technology</h3>
      <div className="flex flex-col items-center  w-2/3 sm:w-1/3 ">
        <div className="flex flex-row">
          <input
            className="mr-3 pl-4 border border-slate-600 text-md
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 w-[174px] active:drop-shadow-xl focus:shadow-black
                           focus:outline-none focus:border-primary 
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            name="name"
            placeholder="First Name"
            id="first-name"
          />
          <input
            className="pl-4 border border-slate-600 text-md
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 w-[174px] active:drop-shadow-xl focus:shadow-black
                           focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
            name="name"
            placeholder="Last Name"
            id="last-name"
          />
        </div>
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
        <input
          className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
          type="number"
          name="phone"
          placeholder="Phone"
          id="phone"
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
        <input
          className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
          type="password"
          name="confirm-password"
          placeholder="Confirm Password"
          id="confirm-password"
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
      </div>
      <button
        className="mt-10 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
        h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
        type="submit"
        id="sign-up-button"
      >
        Sign Up
      </button>
    </form>
  );

  useEffect(() => {
    if (localStorage.getItem('jwtToken')) {
      //validatetoken here
      // Router.push('/dashboard');
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <SignUpForm />
    </>
  );
};

export default signUpPage;
