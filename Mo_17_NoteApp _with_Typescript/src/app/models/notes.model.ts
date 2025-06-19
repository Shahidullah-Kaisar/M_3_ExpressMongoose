import mongoose from "mongoose";
import { INotes } from "../interfaces/notes.interface";

const noteSchema = new mongoose.Schema<INotes>(

    {
        title: { type: String, required: true, trim: true },
        content: { type: String, default: "" },
        category: {
            type: String,
            enum: ["personal", "work", "study", "other"], //note create korar must ei value dite hobe nahle error dibe.etai enum er kaaj.
            default: "personal",
        },
        pinned: {
            type: Boolean,
            default: false,
        },
        tags: {
            label: { type: String, required: true },
            color: { type: String, default: "gray" },
        },
    },

    {
        versionKey: false, // mongodb automatic ekta field --v: 0 banai..false kore dile r thake na eta..
        timestamps: true  // create r update time field add hoa jabe.
    }
);

export const Note = mongoose.model<INotes>("Note", noteSchema);


/*
jodi -------import mongoose from "mongoose";------- eta import kori tahle ----export const Note = mongoose.model<INotes>("Note", noteSchema);------- eivabe likhte hoi
r jodi ---------import { model, Schema } from "mongoose";-------- eivabe import kori tahle ---------export const User = model<IUser>("User", userSchema)------- eivabe likhte hoi.
*/