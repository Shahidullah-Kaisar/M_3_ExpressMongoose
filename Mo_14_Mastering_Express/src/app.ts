import express, { Application, Request, Response } from 'express'
import { todosRouter } from './app/todos/todos.route';
const app : Application = express();

app.use(express.json());

app.use('/todos', todosRouter);

app.get('/', (req : Request, res : Response) => {
    res.send("welcome to todos app");
})

export default app;



/*
✅ nodemon ➤ JavaScript এর জন্য
.js ফাইলে কিছু পরিবর্তন করলে nodemon বুঝে নেয় এবং

Node.js সার্ভারকে অটোমেটিক রিস্টার্ট করে।

👉 এটা JavaScript ফাইল চালু রাখে এবং পরিবর্তন হলে আবার চালু করে।

✅ tsc -w ➤ TypeScript এর জন্য
.ts ফাইলে কিছু পরিবর্তন করলে tsc -w সেই ফাইলকে আবার কমপাইল করে .js ফাইলে।

কিন্তু এটা সার্ভার রিস্টার্ট করে না — শুধু .ts → .js করে।

🧠 তাহলে ব্যবহারটা হয় এমন:
তুমি TypeScript দিয়ে কোড করছো (.ts ফাইল)

tsc -w চালিয়ে রাখো — যাতে .ts থেকে .js অটো তৈরি হয়

আবার nodemon dist/app.js চালিয়ে রাখো — যাতে .js ফাইল চেঞ্জ হলেই সার্ভার রিস্টার্ট হয়

*/