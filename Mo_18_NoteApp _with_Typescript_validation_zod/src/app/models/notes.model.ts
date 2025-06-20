import mongoose, { Schema, Types } from "mongoose";
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
        user: { // eta user collection er _id ta hold kore rakhbe..r jokhn notes.route.ts a giye get korbo tokhn populate() eta korle oi id er sob info ase.
            type: Schema.Types.ObjectId,
            ref: "User", // user.model.ts a model name(j model theke nia asbo) eikhane dite hobe ------> export const User = model<IUser>(eta dite hobe---->"User", userSchema);
            required: true
        }
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