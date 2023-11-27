export interface Account {
  id: string;
  username: string;
  password: string;
  role: 'owner' | 'admin' | 'user';
  token: string;
}
