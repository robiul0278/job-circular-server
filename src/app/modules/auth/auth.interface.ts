import { USER_ROLE } from "./auth.constant";

export type IRegisterUser = {
    name: string;
    password: string;
    email: string;
    role?: "user" | "admin";
    createdAt?: Date;
}
export type ILoginUser = {
    email: string;
    password: string;
    role?: "user" | "admin";
}

export type IResetPassword = {
       email: string;
    newPassword: string;
}

export type TUserRole = keyof typeof USER_ROLE;