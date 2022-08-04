import { getCookie } from 'cookies-next';
import Router from 'next/router';
import { handleRazorpay, checkRazorpayPayment } from './axios';
import Razorpay from 'razorpay';
import handler from '../../pages/api/hello';

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

const RedirectToPage = async (orderID: string) => {
  try {
    const data = await checkRazorpayPayment(orderID);
    if (!data.status) {
      return Router.push('/payment-failed');
    }
    return Router.push('/payment-success');
  } catch (error) {
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
        RedirectToPage(response.razorpay_order_id);
      },
    };
    const paymentObject = await new window.Razorpay(options);
    console.log(paymentObject);
    paymentObject.open();
  } catch (err) {
    console.log(err);
  }
}
