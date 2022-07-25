import axios from 'axios';
import { API_URL } from '../../config';

interface SignUpData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

export const handleSignUpUser = async (userData: SignUpData) => {
  try {
    const res = await axios.post(`${API_URL}/signUp`, userData);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const handleLoginUser = async (userData: LoginUser) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchUser = async (token: string | string[] | boolean) => {
  try {
    const res = await axios.post(`${API_URL}/getProfile`, {
      headers: { authorization: token },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
