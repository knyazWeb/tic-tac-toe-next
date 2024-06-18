export interface User {
  id: string;
  login: string;
  password: string;
  created_at: Date;
  blocked: string[];
}
