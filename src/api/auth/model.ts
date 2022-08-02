interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  isVerified: boolean;
  isLoggedin: boolean;
  secretQuestion: string;
  secretAnswer: string;
  courses: [];
  id?: string;
}

export interface LoginResponse {
  message: string;
  status: number;
  accessToken?: string;
  refreshToken?: string;
}

export interface FetchCourse {
  token?: string;
  courseId: string;
}
export default User;
