import express, { Request, Response } from "express"
import { User } from "../models/user.model";

export const userRoutes = express.Router()

userRoutes.post("/create-user", async (req: Request, res: Response) => {

  const body = req.body;
  console.log("body", body);

  const user = await User.create(body);

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    user,
  });
});

userRoutes.patch("/updateUser/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("id", id);

  const updatedUser = req.body;
  console.log("updatedUser:", updatedUser);

  // const user = await User.findByIdAndUpdate({_id: id}, updatedUser, {new: true})
  // const user = await User.updateOne({_id: id}, updatedUser, {new: true})
  const user = await User.findByIdAndUpdate(id, updatedUser, { new: true }); //better for update //{new: true} eta add korar karon holo postman a sathe sathe updated data dekhabe..nahle ager data dekhai

  res.status(201).json({
    success: true,
    message: "Find single User Successfully",
    user,
  });
});

userRoutes.delete("/deleteUser/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(id);

  // const user = await User.findByIdAndDelete({_id: id})
  // const user =await User.deleteOne({_id: id});
  const user = await User.findByIdAndDelete(id); //better for delete

  res.status(201).json({
    success: true,
    message: "Deleted Successfully",
    user,
  });
});

userRoutes.get("/singleUser/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log("id", id);

  // const singleUser = await User.findById(id); //single data find korar method etaw..shudhu matro id dia
  const singleUser = await User.findOne({ _id: id }); // jekon field dia find kora jaai.

  res.status(201).json({
    success: true,
    message: "Find single User Successfully",
    singleUser,
  });
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const allUser = await User.find();

  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    allUser,
  });
});