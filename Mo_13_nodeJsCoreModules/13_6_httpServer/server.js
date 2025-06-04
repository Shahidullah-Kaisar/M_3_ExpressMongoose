// used postman

const http = require('http');
const path = require('path');
const fs = require('fs');

const server = http.createServer((req, res) =>{

    const filePath = path.join(__dirname, './db/todo.json');
    console.log("showFilePath:", filePath);

    const data = fs.readFileSync(filePath, {encoding: "utf-8"});
    console.log('ShowData:', data);

    //Get all Todos
    if(req.url === '/todos' && req.method === 'GET'){
       
        res.writeHead(200, {
            "content-type": "application/json"  
        })
       
        res.end(data);
        
    }

    // post all todos
    else if(req.url === '/todos/create-todo' && req.method === 'POST'){
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
*/
