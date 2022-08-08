import Router from 'next/router';
import { useEffect } from 'react';
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
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          await Router.push('/login');
          return;
        }
      } catch (err: any) {
        console.log('err', err);
        deleteCookie('accessToken');
        deleteCookie('refreshToken');
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
