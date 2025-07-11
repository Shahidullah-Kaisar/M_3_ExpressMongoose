import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
})

export const User = model<IUser>("User", userSchema)

/*
jodi -------import mongoose from "mongoose";------- eta import kori tahle ----export const Note = mongoose.model<INotes>("Note", noteSchema);------- eivabe likhte hoi
r jodi ---------import { model, Schema } from "mongoose";-------- eivabe import kori tahle ---------export const User = model<IUser>("User", userSchema)------- eivabe likhte hoi.
*/