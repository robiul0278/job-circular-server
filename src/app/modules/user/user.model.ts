import { Schema, model, models } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>({
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
bookmark: [{ type: Schema.Types.ObjectId, ref: "Job" }]

});


// export const userModel = model<IUser>("User", userSchema);

export const userModel = models.User || model<IUser>("User", userSchema);