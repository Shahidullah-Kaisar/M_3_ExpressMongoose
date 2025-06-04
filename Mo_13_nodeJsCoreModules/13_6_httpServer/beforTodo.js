const http = require('http');

const data = [
  {
    "title": "First Post",
    "body": "This is the body of the first post.",
    "createdAt": "2025-06-01T10:15:30Z"
  },
  {
    "title": "Learning JSON",
    "body": "JSON is a lightweight format for storing and transporting data.",
    "createdAt": "2025-06-02T08:45:00Z"
  },
  {
    "title": "API Development",
    "body": "Modern APIs often use JSON as the standard data exchange format.",
    "createdAt": "2025-06-03T17:20:45Z"
  }
]

const server = http.createServer((req, res) =>{
    console.log({req, res});

    // res.end("Welcome to Todo App server");

    if(req.url === '/todos' && req.method === 'GET'){
        // res.end('All Todos');

        res.writeHead(200, {
            "content-type": "application/json",
            "email": "sks@gmail.com"
        })
        // res.end("Hello todos");
        res.end(JSON.stringify(data));

        // res.setHeader("content-type", "text/plain");
        // res.setHeader("email", "sksju@gmail.com");
        // res.statusCode = 200;
        // res.end("hello todos");
    }
    else if(req.url === '/todos/create-todo' && req.method === 'POST'){
        res.end('Todo Created');
    }
    else{
        res.end('Route Not Found');
    }
});

server.listen(5000, "127.0.0.1", ()=> {
    console.log("Server listing on port 5000");
})

/*
res.end("Welcome to Todo App server"); এই লাইনটা রেসপন্স শেষ করে দেয়। eta comment na kore jodi code run kori tahle error dibe..

res.end() আগে ডেকে ফেলেছো:

res.end("Welcome to Todo App server"); এই লাইনটা রেসপন্স শেষ করে দেয়।

এর পরে তুমি আবার চেক করছো req.url এবং req.method — কিন্তু তখন আর কিছু পাঠানো যাবে না কারণ response ইতিমধ্যে শেষ হয়ে গেছে।

একাধিক বার res.end() কল করা হয়েছে:

HTTP response একবারই পাঠানো যায়। একাধিকবার res.end() কল করলে এমন এরর আসবে:
Error [ERR_STREAM_WRITE_AFTER_END]: write after end
*/