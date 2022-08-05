import Router, { useRouter } from 'next/router';
import { handleLogout } from '../shared/helper/axios';
import { sendToast } from '../shared/helper/toastify';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const { email } = router.query;
  if (!email) {
    return null;
  }
  const logout = async () => {
    try {
      await handleLogout(email);
      Router.push('/login');
    } catch (error: any) {
      sendToast(error.response.data.message || 'Something went wrong', 'warn');
      console.log('error', error.message);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center text-primary min-w-full min-h-screen bg-gradient-to-r from-background to-bg-blue">
        <h2 className="font-black text-5xl pb-4">
          DataLync<span className="text-primary-orange">.</span>
        </h2>
        <div className="flex items-center p-4">
          <h2 className="font-black text-4xl pl-4">You are logged in on Multiple Devices</h2>
        </div>
        <div>
          <h2 className="text-3xl pl-4">Click on the button to logout from other devices.</h2>
        </div>
        <button
          className="mt-10 mb-2 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
            h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </>
  );
};
export default PaymentSuccessPage;
