import Router, { useRouter } from 'next/router';
import useAuth from '../../../hooks/useAuth';

const PaymentFailedPage = () => {
  useAuth();
  const router = useRouter();
  const { id } = router.query;
  return (
    <>
      <div className="flex flex-col justify-center items-center text-primary min-w-full min-h-screen bg-gradient-to-r from-background to-bg-blue">
        <h2 className="font-black text-5xl pb-4">
          DataLync<span className="text-primary-orange">.</span>
        </h2>
        <div className="flex items-center p-4">
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48">
            <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
            <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
            <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
          </svg>
          <h2 className="font-black text-4xl pl-4">Payment Failed</h2>
        </div>
        <div>
          <h2 className="text-3xl pl-4">Please try again</h2>
        </div>
        <button
          className="mt-10 mb-2 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
            h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
          onClick={() => {
            Router.push('/user/dashboard');
          }}
        >
          Home
        </button>
      </div>
    </>
  );
};
export default PaymentFailedPage;
