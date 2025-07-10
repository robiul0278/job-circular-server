export type IUser = {
  name: string;
  password: string;
  email: string;
  role: "user" | "admin";
  bookmark: string[];
};