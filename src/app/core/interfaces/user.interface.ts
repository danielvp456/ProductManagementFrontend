export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface UpdateUserRequest {
  name: string;
  email: string;
  password?: string;
}