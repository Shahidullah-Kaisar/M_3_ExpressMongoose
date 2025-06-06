// used postman

const http = require('http');
const path = require('path');
const fs = require('fs');
const { URL } = require('url');

const filePath = path.join(__dirname, './db/todo.json');
console.log("showFilePath:", filePath);


const server = http.createServer((req, res) =>{

    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log('url:', url);

    const pathname = url.pathname;
   

    //Get all Todos
    if(pathname === '/todos' && req.method === 'GET'){

        const data = fs.readFileSync(filePath, {encoding: "utf-8"});
        console.log('ShowData:', data);

        res.writeHead(200, {
            "content-type": "application/json"  
        })
       
        res.end(data);
        
    }

    // post all todos or create todo
    else if(pathname === '/todos/create-todo' && req.method === 'POST'){
        let data = " ";

        req.on("data", (chunk)=>{
            data = data + chunk;
        })

        req.on("end", ()=>{
            console.log(data);
            
            const {title, body } = JSON.parse(data);
            console.log({title, body});

            const createdAt = new Date().toLocaleString();

            const allTodos = fs.readFileSync(filePath, {encoding: "utf-8"});
            console.log('allTodos:', allTodos);

            const parsedAllTodos = JSON.parse(allTodos);
            console.log('parsedAllTodos:', parsedAllTodos);

            parsedAllTodos.push({title, body, createdAt});
            console.log("with Push value:", parsedAllTodos);

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {encoding: "utf-8"})

            res.end(JSON.stringify({title, body, createdAt}, null, 2));
        })
    }
    // Get single data
    else if(pathname === '/todos' && req.method === 'GET'){
        console.log(pathname, "single todo");

        const title = url.searchParams.get('title');
        console.log('title:', title);

        const data = fs.readFileSync(filePath, {encoding: "utf-8"});
        console.log("data:", data);

        const parsedData = JSON.parse(data);

        const todo = parsedData.find((todo)=> todo.title === title);

        const stringifyData = JSON.stringify(todo, null, 2);
        console.log('ShowStringfyData:', stringifyData);
        
        res.writeHead(200, {
            "content-type": "application/json"  
        })
       
        res.end(stringifyData);
        
    }
    // update todo
    else if(pathname === '/todos/update-todo' && req.method === 'PATCH'){

        const title = url.searchParams.get('title');

        let data = " ";

        req.on("data", (chunk)=>{
            data = data + chunk;
        })

        req.on("end", ()=>{
            console.log(data);
            
            const {body } = JSON.parse(data);
            console.log({body});

            const allTodos = fs.readFileSync(filePath, {encoding: "utf-8"});
            console.log('allTodos:', allTodos);

            const parsedAllTodos = JSON.parse(allTodos);
            console.log('parsedAllTodos:', parsedAllTodos);

            const todoIndex = parsedAllTodos.findIndex((todo)=> todo.title === title);
            console.log("todoIndex:", todoIndex);

            parsedAllTodos[todoIndex].body = body;

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {encoding: "utf-8"})

            res.end(JSON.stringify({title, body, createdAt:parsedAllTodos[todoIndex].createdAt}, null, 2));
        })
    }
    // delete todo
    else if(pathname === '/todos/delete-todo' && req.method === 'DELETE'){

        const title = url.searchParams.get('title');

        const allTodos = fs.readFileSync(filePath, {encoding: "utf-8"});
        console.log('allTodos:', allTodos);

        const parsedAllTodos = JSON.parse(allTodos);
        console.log('parsedAllTodos:', parsedAllTodos);

        /*
        const todoIndex = parsedAllTodos.findIndex((todo)=> todo.title === title);
        console.log("todoIndex:", todoIndex);

        parsedAllTodos.splice(todoIndex, 1);

        fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2));

        res.end('Todo deleted successfully');

        */ 

       // another way for delete
        const filteredTodos = parsedAllTodos.filter((todo) => todo.title !== title);
        fs.writeFileSync(filePath, JSON.stringify(filteredTodos, null, 2));

        res.end('Todo deleted successfully');
    }
    else{
        res.end('Route Not Found');
    }
});

server.listen(5000, "127.0.0.1", ()=> {
    console.log("Server listing on port 5000");
})



/*
JSON.stringify() ফাংশনের ৩টা প্যারামিটার আছে:

JSON.stringify(value, replacer, space)

৩য় প্যারামিটার space (এখানে 2) কী করে?
এই প্যারামিটারটা বলে JSON output টা কতটুকু সুন্দরভাবে (pretty format) ইনডেন্ট করে লেখা হবে।

{
  "title": "Learn Node",
  "body": "Work with streams",
  "createdAt": "2025-06-04"
}
প্রতিটা key-এর আগে ২টি space ইন্ডেন্ট হয়েছে।

filter(),find() etc. method শুধু JavaScript array-এর উপর কাজ করে — সেটা object array হোক বা number/string-এর array।

JSON এর উপর সরাসরি filter() etc. কাজ করে না, কারণ JSON একটা string।

eijnno age parse korte hoi: 
তুমি যখন JSON.parse() চালাও, তখন JSON string → JavaScript object (বা array) এ convert হয়।
*/
