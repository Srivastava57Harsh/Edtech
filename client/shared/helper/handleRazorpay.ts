import { getCookie } from 'cookies-next';
import Router from 'next/router';
import { handleRazorpay, checkRazorpayPayment } from './axios';
import Razorpay from 'razorpay';
import handler from '../../pages/api/hello';
import { sendToast } from './toastify';

function loadScript(src: string) {
  return new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const RedirectToPage = async (courseid: string, orderID: string) => {
  try {
    const data = await checkRazorpayPayment(orderID);
    if (data.status !== 200) {
      return Router.push(`${courseid}/payment-failed`);
    }
    return Router.push(`${courseid}/payment-success`);
  } catch (error: any) {
    sendToast(error.response.data.message || 'Something went wrong', 'warn');
    console.log(error);
  }
};

export default async function displayRazorpay(courseID: string, courseName: string) {
  const userToken = getCookie('accessToken');
  if (!userToken) {
    return Router.push('/login');
  }

  const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  try {
    const data = await handleRazorpay(courseID, userToken);
    const options = {
      order_id: data.data.orderData.id,
      name: `Buy ${courseName} Course`,
      handler: function (response: any) {
        RedirectToPage(courseID, response.razorpay_order_id);
      },
    };
    const paymentObject = await new (window as any).Razorpay(options);
    console.log(paymentObject);
    paymentObject.open();
  } catch (err) {
    console.log(err);
  }
}
