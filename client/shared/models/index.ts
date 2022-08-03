export interface SignUpData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface Subtopic {
  subname: string;
  description: string;
  youtubeLink: string;
  githubLink: string;
  date: string;
}

export interface CourseSchema {
  _id?: string;
  data: Subtopic[];
  name: string;
  slug: string;
  price: number;
  imageURL: string;
  description: string;
}
