export interface User {
  id: string;
  username: string;
  password: string;
  role: 'owner' | 'admin' | 'user';
  token: string
}