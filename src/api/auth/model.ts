interface User {
  name: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
}

export interface LoginResponse {
  message: string;
  status: number;
  accessToken?: string;
  refreshToken?: string;
}
export default User;
