"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../../config/mongodb");
const mongodb_2 = require("mongodb");
exports.todosRouter = (0, express_1.default)();
exports.todosRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const todos = yield collection.find({}).toArray(); // db theke all data find korlam.eksathe sob data find kortesi taai toArray te convert korlam
    res.send(todos);
}));
exports.todosRouter.post('/create-todo', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body; // client theke data nilam (ui or postman).
    console.log(data);
    const { title, description, priority } = req.body; //destructure korlam
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const result = yield collection.insertOne({
        title: title,
        description: description,
        priority: priority,
        iscompleted: false
    });
    res.send(result);
}));
exports.todosRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; // '/:id'-----> url er id bosate hobe params er pore
    console.log("ParamsId:", id);
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const singleTodo = yield collection.findOne({ _id: new mongodb_2.ObjectId(id) });
    res.send(singleTodo);
}));
exports.todosRouter.put('/update-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const { title, description, priority, iscompleted } = req.body;
    const filterId = { _id: new mongodb_2.ObjectId(id) };
    const updatedTodo = yield collection.updateOne(filterId, { $set: { title, description, priority, iscompleted } }, { upsert: true });
    res.send(updatedTodo);
}));
exports.todosRouter.delete('/delete-todo/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id; // '/:id'-----> url er id bosate hobe params er pore
    console.log("ParamsId:", id);
    const db = yield mongodb_1.client.db("todosDB");
    const collection = yield db.collection("todos");
    const singleTodo = yield collection.deleteOne({ _id: new mongodb_2.ObjectId(id) });
    res.send(singleTodo);
}));
// const db = await client.db("todosDB"); // MongoDB-তে আগে থেকেই থাকা ডাটাবেজকে access (মানে: একসেস) করবে।
//     const collection = await db.collection("todos")
/*

upsert: true মানে কি?

"update" না পেলে "insert" করো" — অর্থাৎ:
যদি filterId অনুযায়ী কোনো document পাওয়া যায়, তাহলে সেটা update হবে।
আর যদি না পাওয়া যায়, তাহলে ওই data insert (create) করে ফেলবে।
*/ 
