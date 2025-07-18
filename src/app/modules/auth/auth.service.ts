import AppError from "../../errors/AppError";
import { ILogin, IRegister, IResetPassword } from "./auth.interface";
import { authModel } from "./auth.model";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../../config";
import { sendEmail } from "../../../shared/sendEmail";

const registerDB = async (payload: IRegister) => {
    const result = await authModel.create(payload);
    return result;
}

const loginDB = async (payload: ILogin) => {
    const User = await authModel.findOne({ email: payload?.email });

    if (!User) {
        throw new AppError(httpStatus.NOT_FOUND, "এই ইমেইলটি সঠিক নয়!", "email");
    }
    // checking is the password correct  
    const isPasswordMatched = await bcrypt.compare(payload?.password, User?.password);

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "পাসওয়ার্ড সঠিক নয়!", "password");
    }

    const { password,bookmark, __v, ...userWithoutSensitive } = User.toObject();

    // create accessToken 
    const jwtPayload = {
        _id: User?._id,
        email: User?.email,
        role: User?.role,
    }
    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        { expiresIn: '1d' }
    );
    // create refreshToken 
    const refreshToken = jwt.sign(
        jwtPayload, config.jwt_refresh_token,
        { expiresIn: '30d' }
    );

    return {
        accessToken,
        refreshToken,
        user: userWithoutSensitive,
    }
}


const refreshToken = async (token: string) => {
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }
    //! checking if the given token is valid
    const decoded = jwt.verify(token, config.jwt_refresh_token as string) as JwtPayload;
    const { userId } = decoded;

    //! checking if the user is exist
    const isUserExists = await authModel.findById({ _id: userId });

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This user is not found!");
    }
    // create accessToken 
    const jwtPayload = {
        userId: isUserExists?._id,
        email: isUserExists?.email,
        role: isUserExists?.role,
    }

    const accessToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        { expiresIn: '1d' }
    );

    return {
        accessToken,
    }
}

const forgetPassword = async (email: string) => {

    //! checking if the user is exist
    const isUserExists = await authModel.findOne({ email });

    if (!isUserExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This email is not found!");
    }

    // create accessToken 
    const jwtPayload = {
        userId: isUserExists?._id,
        email: isUserExists?.email,
        role: isUserExists?.role,
    }

    const resetToken = jwt.sign(
        jwtPayload, config.jwt_secret_token,
        { expiresIn: '10m' }
    );

    const resetUILink = `${config.reset_password_ui_link}/api/v1/auth/reset-password?email=${isUserExists.email}&token=${resetToken}`

    sendEmail(isUserExists?.email, resetUILink)

}

const resetPassword = async (payload: IResetPassword, token: string) => {
    const { email, newPassword } = payload;

    const decoded = jwt.verify(token, config.jwt_secret_token as string) as JwtPayload;

    if (!decoded) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid or expired token.");
    }

    const user = await authModel.findById(decoded.userId);

    if (!user || user.email !== email) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found with this email!");
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        Number(config.bcrypt_salt_rounds)
    );

    await authModel.findByIdAndUpdate(
        decoded.userId,
        { password: hashedPassword },
        // { new: true } // return updated user
    );

};

export const authServices = {
    registerDB,
    loginDB,
    refreshToken,
    forgetPassword,
    resetPassword
}