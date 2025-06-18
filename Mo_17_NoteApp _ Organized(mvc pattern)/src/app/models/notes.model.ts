import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(

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

export const Note = mongoose.model("Note", noteSchema);
