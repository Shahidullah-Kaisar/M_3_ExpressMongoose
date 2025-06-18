import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import { notesRoutes } from "./app/controllers/notes.route";

const app: Application = express();

app.use(express.json()); //post router er jnno eta must lagbe..Parses incoming JSON data from the request body (req.body) And converts it into a usable JavaScript object

app.use('/notes', notesRoutes)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to note app");
});

export default app;
