import express, { Request, Response } from 'express'
import fs from 'fs'
import path from "path"

const filePath = path.join(__dirname, "../../../db/todo.json");

export const todosRouter = express();

todosRouter.get('/', (req : Request, res : Response) => {

    const data = fs.readFileSync(filePath, {encoding: "utf-8"});
    res.send(data);
})

todosRouter.post('/create-todo', (req : Request, res : Response) => {

    // const data = req.body;
    const {title, body} = req.body;
    console.log({title, body});

    res.send('Post created successfully');
})
todosRouter.get('/:title', (req : Request, res : Response) => {

    const {title, body} = req.body;
    console.log({title, body});
    res.send("done");
})
todosRouter.put('/update-todo/:title', (req : Request, res : Response) => {

    const {title, body} = req.body;
    console.log({title, body});
    res.send("done");
})
todosRouter.delete('/delete-todo/:title', todosRouter.get('/:title', (req : Request, res : Response) => {

    const {title, body} = req.body;
    console.log({title, body});
    res.send("done");
}))