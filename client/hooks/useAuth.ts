import axios from 'axios';
import Router from 'next/router';
import { useEffect } from 'react';
import { API_URL } from '../config';
import { sendToast } from '../shared/helper/toastify';
import { getCookie, deleteCookie } from 'cookies-next';
import { fetchUser } from '../shared/helper/axios';

const useAuth = () => {
  useEffect(() => {
    const token = getCookie('accessToken');
    (async function () {
      try {
        if (!token) {
          await Router.push('/login');
          return;
        }
        const data = await fetchUser(token);
        if (data.data.email) return;
        else {
          //deleteCookie('accessToken');
          await Router.push('/login');
          return;
        }
      } catch (err: any) {
        console.log('err', err);
        //deleteCookie('jwtToken');
        //if (err.response.status === 401) sendToast('Invalid user token, please login again.', 'error');
        //else sendToast(err.message || 'Something went wrong', 'error');
        await Router.push('/login');
        return;
      }
    })();
  }, []);
  return;
};

export default useAuth;
