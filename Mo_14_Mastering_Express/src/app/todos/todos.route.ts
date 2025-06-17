import express, { Request, Response } from 'express'
import { client } from '../../config/mongodb';
import { ObjectId } from 'mongodb';

export const todosRouter = express();

todosRouter.get('/', async(req : Request, res : Response) => {

    const db = await client.db("todosDB");
    const collection = await db.collection("todos");

    const todos = await collection.find({}).toArray(); // db theke all data find korlam.eksathe sob data find kortesi taai toArray te convert korlam
    
    res.send(todos);
})

todosRouter.post('/create-todo', async(req : Request, res : Response) => {

    const data = req.body; // client theke data nilam (ui or postman).
    console.log(data)
    const {title, description, priority} = req.body; //destructure korlam

    const db = await client.db("todosDB");
    const collection = await db.collection("todos");

    const result = await collection.insertOne({ //insert korlam db te
        title: title,
        description: description,
        priority: priority,
        iscompleted: false
    })
  
    res.send(result);
})

todosRouter.get('/:id', async(req : Request, res : Response) => {

    const id = req.params.id // '/:id'-----> url er id bosate hobe params er pore
    console.log("ParamsId:", id);

    const db = await client.db("todosDB");
    const collection = await db.collection("todos");

    const singleTodo = await collection.findOne({_id: new ObjectId(id)});

    res.send(singleTodo);
})

todosRouter.put('/update-todo/:id', async(req : Request, res : Response) => {
    const id = req.params.id;

    const db = await client.db("todosDB");
    const collection = await db.collection("todos");

    const {title, description, priority, iscompleted} = req.body;
    const filterId = {_id: new ObjectId(id)};

    const updatedTodo = await collection.updateOne(
        filterId,
        { $set: {title, description, priority, iscompleted}},
        { upsert: true}
    )
    
    res.send(updatedTodo);
})

todosRouter.delete('/delete-todo/:id', async(req : Request, res : Response) => {

    const id = req.params.id // '/:id'-----> url er id bosate hobe params er pore
    console.log("ParamsId:", id);

    const db = await client.db("todosDB");
    const collection = await db.collection("todos");

    const singleTodo = await collection.deleteOne({_id: new ObjectId(id)});

    res.send(singleTodo);
})


// const db = await client.db("todosDB"); // MongoDB-তে আগে থেকেই থাকা ডাটাবেজকে access (মানে: একসেস) করবে।

//     const collection = await db.collection("todos")
/*

upsert: true মানে কি?

"update" না পেলে "insert" করো" — অর্থাৎ:
যদি filterId অনুযায়ী কোনো document পাওয়া যায়, তাহলে সেটা update হবে।
আর যদি না পাওয়া যায়, তাহলে ওই data insert (create) করে ফেলবে।
*/