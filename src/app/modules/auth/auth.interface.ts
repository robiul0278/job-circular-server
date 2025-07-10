import { USER_ROLE } from "./auth.constant";

export type IBookmark = {
  jobId: string;
};

export type IRegister = {
  name: string;
  password: string;
  email: string;
  role: "user" | "admin";
  bookmark: IBookmark[];
};

export type ILogin = {
    email: string;
    password: string;
}

export type IResetPassword = {
    email: string;
    newPassword: string;
}

export type TUserRole = keyof typeof USER_ROLE;