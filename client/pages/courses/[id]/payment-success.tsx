import Router, { useRouter } from 'next/router';
import Footer from '../../../components/home/footer';
import useAuth from '../../../hooks/useAuth';

const PaymentSuccessPage = () => {
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
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="60" height="60" viewBox="0 0 172 172">
            <defs>
              <linearGradient
                x1="35.3245"
                y1="35.3245"
                x2="136.6755"
                y2="136.6755"
                gradientUnits="userSpaceOnUse"
                id="color-1_pIPl8tqh3igN_gr1"
              >
                <stop offset="0" stopColor="#9dffce"></stop>
                <stop offset="1" stopColor="#50d18d"></stop>
              </linearGradient>
              <linearGradient
                x1="46.58333"
                y1="88.84158"
                x2="129"
                y2="88.84158"
                gradientUnits="userSpaceOnUse"
                id="color-2_pIPl8tqh3igN_gr2"
              >
                <stop offset="0.824" stopColor="#135d36"></stop>
                <stop offset="0.931" stopColor="#125933"></stop>
                <stop offset="1" stopColor="#11522f"></stop>
              </linearGradient>
            </defs>
            <g transform="">
              <g
                fill="none"
                fillRule="nonzero"
                stroke="none"
                strokeWidth="1"
                strokeLinecap="butt"
                strokeLinejoin="miter"
                strokeMiterlimit="10"
                strokeDasharray=""
                strokeDashoffset="0"
                fontFamily="none"
                fontWeight="none"
                fontSize="none"
                textAnchor="none"
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g>
                  <path
                    d="M157.66667,86c0,39.57792 -32.08875,71.66667 -71.66667,71.66667c-39.57792,0 -71.66667,-32.08875 -71.66667,-71.66667c0,-39.57792 32.08875,-71.66667 71.66667,-71.66667c39.57792,0 71.66667,32.08875 71.66667,71.66667z"
                    fill="url(#color-1_pIPl8tqh3igN_gr1)"
                  ></path>
                  <path
                    d="M76.29992,117.20008l-28.66667,-28.66667c-1.40108,-1.40108 -1.40108,-3.66933 0,-5.06683l5.06683,-5.06683c1.40108,-1.40108 3.66933,-1.40108 5.06683,0l21.06642,21.06642l38.98308,-38.98308c1.40108,-1.40108 3.66933,-1.40108 5.06683,0l5.06683,5.06683c1.40108,1.40108 1.40108,3.66933 0,5.06683l-46.58333,46.58333c-1.3975,1.40108 -3.66933,1.40108 -5.06683,0z"
                    fill="url(#color-2_pIPl8tqh3igN_gr2)"
                  ></path>
                </g>
                <path d="" fill="none"></path>
              </g>
            </g>
          </svg>
          <h2 className="font-black text-4xl pl-4">Payment Successful</h2>
        </div>
        <div>
          <h2 className="text-3xl pl-4">Thank you for buying the course</h2>
        </div>
        <button
          className="mt-10 mb-2 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
            h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
          onClick={() => {
            Router.push(`/courses/${id}`);
          }}
        >
          View Course
        </button>
      </div>
    </>
  );
};
export default PaymentSuccessPage;
