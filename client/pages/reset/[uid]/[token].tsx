import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { sendToast } from '../../../shared/helper/toastify';
import { API_URL } from '../../../config';
import { ToastContainer } from 'react-toastify';

const ResetPassword: NextPage = () => {
  const router = useRouter();
  const { uid, token } = router.query;

  const [userData, setUserData] = useState<any>({});

  async function ResetPassword(event: FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = {
        password: (event.currentTarget.elements[0] as HTMLInputElement).value,
        passwordConfirmation: (event.currentTarget.elements[1] as HTMLInputElement).value,
      };
      console.log(formData);
      //   await validation(formData, signupSchema);
      const body = {
        newPassword: formData.password,
        id: { uid },
      };
      console.log(body);
      setUserData(body);

      const response = await axios({
        method: 'post',
        url: `${API_URL}/auth/resetPassword`,
        data: body,
      });
      if (response) {
        // await sendToast('success', 'Signup Successful');
        // await Router.push('/resetPassword');
        console.log('done');
      }
    } catch (err: any) {
      console.log(err);
      sendToast(err.message || 'Something went wrong', 'warn');
    }
  }

  const ResetForm = () => (
    <form
      className="flex flex-col justify-center items-center text-primary min-w-full min-h-screen bg-gradient-to-r from-background to-bg-blue"
      onSubmit={ResetPassword}
      method="POST"
    >
      <h2 className="font-black text-5xl pb-2">
        Databuddy<span className="text-primary-orange">.</span>
      </h2>
      <h3 className="mb-4 text-slate-600">Learn with technology</h3>
      <h2 className="mb-4 text-2xl text-orange-500">Recover your Password</h2>
      <div className="flex flex-col items-center  w-2/3 sm:w-1/3 ">
        <label
          className="mt-4 pl-1 text-md w-[360px] font-thick text-gray-500
        "
        >
          Enter new password
        </label>
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
        <label
          className="mt-4 pl-1 text-md w-[360px] font-thick text-gray-500
        "
        >
          Confirm new password
        </label>
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
      </div>
      <button
        className="mt-10 rounded-xl bg-primary min-w-[200px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
        h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
        type="submit"
        id="reset-button"
      >
        Reset Password
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
      <ResetForm />
      <p>Post: {uid}</p>
      <p>Post: {token}</p>
    </>
  );
};

export default ResetPassword;
