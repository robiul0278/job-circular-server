import { Schema, model } from 'mongoose';
import { IRegister } from './auth.interface';
import bcrypt from "bcrypt";
import config from '../../../config';

const AuthSchema = new Schema<IRegister>({
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
bookmark: [{ type: Schema.Types.ObjectId, ref: "Circular" }]
});

AuthSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds),

    )
    next();
});
AuthSchema.post('save', function (doc, next) {
    doc.password = ''
    next();
});

export const authModel = model<IRegister>("User", AuthSchema);