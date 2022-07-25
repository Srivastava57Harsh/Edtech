interface Admin {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  isLoggedin: boolean;
  secretQuestion: string;
  secretAnswer: string;
}

export interface LoginResponse {
  message: string;
  status: number;
  accessToken?: string;
  refreshToken?: string;
}
export default Admin;
