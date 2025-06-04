const http = require('http');

const server = http.createServer((req, res) =>{
    console.log({req, res});

    // res.end("Welcome to Todo App server");

    if(req.url === '/todos' && req.method === 'GET'){
        res.end('All Todos');
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