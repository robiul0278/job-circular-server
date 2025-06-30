import { Schema, model } from 'mongoose';
import { IRegisterUser } from './auth.interface';
import bcrypt from "bcrypt";
import config from '../../../config';

const UserSchema = new Schema<IRegisterUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),

    )
    next();
});
UserSchema.post('save', function (doc, next) {
    doc.password = ''
    next();
});

export const userModel = model<IRegisterUser>("User", UserSchema);