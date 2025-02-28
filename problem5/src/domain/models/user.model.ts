import { model, Schema } from "mongoose";

import { BaseModel } from "./index.model";

export type UserModel = {
    userEmail: string;
    password: string;
    name: string;
    refreshToken?: string;
    refreshTokensUsed: string[];
} & BaseModel;

const userSchema = new Schema<UserModel>(
    {
        userEmail: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
        },
        refreshTokensUsed: {
            type: [String],
            default: [],
        },
    },
    {
        collection: "Users",
        timestamps: true,
    },
);

const userModel = model("User", userSchema);
export default userModel;
