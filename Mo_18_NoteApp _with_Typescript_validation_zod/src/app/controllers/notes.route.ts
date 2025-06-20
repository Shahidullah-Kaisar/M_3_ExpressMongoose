import express, { Request, Response } from "express"
import { Note } from "../models/notes.model";

export const notesRoutes = express.Router()

notesRoutes.post("/create-note", async (req: Request, res: Response) => {

  const body = req.body;
  console.log("body", body);

  //notesRoutesroach - 1 of creating a data
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

  //notesRoutesroach - 2 of creating a data
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    note,
  });
});


notesRoutes.patch("/updateNote/:id", async (req: Request, res: Response) => {
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


notesRoutes.delete("/deleteNote/:id", async (req: Request, res: Response) => {
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


notesRoutes.get("/singleNote/:id", async (req: Request, res: Response) => {
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


notesRoutes.get("/", async (req: Request, res: Response) => {
  const allNote = await Note.find().populate('user'); // notes.model.ts a j schema bananor somoy user property or field dichi seta bosche populate er sathe..

  res.status(201).json({
    success: true,
    message: "Note Created Successfully",
    allNote,
  });
});