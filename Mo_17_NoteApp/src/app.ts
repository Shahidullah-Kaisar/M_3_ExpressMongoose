import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";

const app: Application = express();

app.use(express.json()); //post router er jnno eta must lagbe..Parses incoming JSON data from the request body (req.body) And converts it into a usable JavaScript object

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

const Note = mongoose.model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  console.log("body", body);

  //Approach - 1 of creating a data
  /*
  const myNote = new Note({
    title: "JavaScript Study Plan",
    content: "Focus on ES6, async/await, and DOM manipulation",
    category: "study",
    pinned: false,
    tags: {
      label: "database",
    },
  });
  await myNote.save();
*/

  //Approach - 2 of creating a data
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    note,
  });
});

app.patch("/notes/updateNote/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("id", id);

  const updatedNote = req.body;
  console.log("updatedNote:", updatedNote);

  // const note = await Note.findByIdAndUpdate({_id: id}, updatedNote, {new: true})
  // const note = await Note.updateOne({_id: id}, updatedNote, {new: true})
  const note = await Note.findByIdAndUpdate(id, updatedNote, { new: true }); //better for update //{new: true} eta add korar karon holo postman a sathe sathe updated data dekhabe..nahle ager data dekhai

  res.status(201).json({
    success: true,
    message: "Find single Note Successfully",
    note,
  });
});

app.delete("/notes/deleteNote/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  // const note = await Note.findByIdAndDelete({_id: id})
  // const note =await Note.deleteOne({_id: id});
  const note = await Note.findByIdAndDelete(id); //better for delete

  res.status(201).json({
    success: true,
    message: "Deleted Successfully",
    note,
  });
});

app.get("/notes/singleNote/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("id", id);

  // const singleNote = await Note.findById(id); //single data find korar method etaw..shudhu matro id dia
  const singleNote = await Note.findOne({ _id: id }); // jekon field dia find kora jaai.

  res.status(201).json({
    success: true,
    message: "Find single Note Successfully",
    singleNote,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const allNote = await Note.find();

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    allNote,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
