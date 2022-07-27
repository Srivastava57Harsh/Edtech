import axios from 'axios';
import Router from 'next/router';
import { useEffect } from 'react';
import { sendToast } from '../shared/helper/toastify';
import { getCookie } from 'cookies-next';
import { fetchAdmin } from '../shared/helper/axios';

const useAdminAuth = () => {
  useEffect(() => {
    const token = getCookie('accessToken');
    (async function () {
      try {
        if (!token) {
          await Router.push('/admin/login');
          return;
        }
        const data = await fetchAdmin(token);
        if (data.data.email) return;
        else {
          await Router.push('/admin/login');
          return;
        }
      } catch (err: any) {
        console.log('err', err);
        if (err.status === 401) sendToast('Invalid user token, please login again.', 'error');
        else sendToast(err.message || 'Something went wrong', 'error');
        await Router.push('/admin/login');
        return;
      }
    })();
  }, []);
  return;
};

export default useAdminAuth;
