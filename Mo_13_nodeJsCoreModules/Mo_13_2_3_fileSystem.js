// synchronous way
// file read or I/O intensive task ----> single thread(complete task) --> not go thread pool.

//asynchronous way
// file read ----> single thread -> event loop -> thread pool(File Read/Write শেষ হলে Callback Queue তে পাঠায়) -> task completed (Main thread callback execute করে).

//synchronous

/*

const fs = require('fs');

console.log('Task 1');

const text = "learning file system";
fs.writeFileSync('./hello.txt', text); //task 2

console.log('task 3');

const data = fs.readFileSync('./hello.txt', {encoding: 'utf-8'});
console.log(data); //task 4

console.log('task 5');

*/

//asynchronous

const fs = require('fs');

console.log('Task 1');

let text = 'node js';

fs.writeFile('./hello.txt', text, {encoding: 'utf-8'}, (err) =>{ //asynchronous a all time ekta call back function thakbe.
    if(err){
        console.log('Something went wrong', err);
        return;
    }
    console.log('Written successful') // eta asynchronous taai sobar last a print korbe.
})

fs.readFile('./hello.txt', {encoding: 'utf-8'}, (err, data) =>{ //asynchronous a all time ekta call back function thakbe.
    if(err){
        console.log('Something went wrong', err);
        return;
    }
    text = data;

    console.log(text, "inside callback"); // eta asynchronous taai sobar last a print korbe.
});

console.log(text, "from console");

console.log('Task 3');



/*

Node.js এ fs module ব্যবহার করে তুমি file read, write, update, delete ইত্যাদি করতে পারো। এটা Node.js-এর built-in module — আলাদা install করতে হয় না।

কাজের ধরন দুইভাবে হয়:

Asynchronous (Non-blocking) — fast, callback/Promise based
Synchronous (Blocking) — সরাসরি কাজ করে, কিন্তু পুরো প্রোগ্রামকে আটকে রাখে

যেহেতু writeFileSync() এবং readFileSync() blocking, তাই পরবর্তী লাইন এক্সিকিউট হতে অপেক্ষা করে। পুরো task একটার পর একটা চলে।

Thread pool-------------  Node.js এর পিছনে থাকা worker threads যা async I/O task করে



Encoding vs Buffer:

যদি তুমি encoding না দাও, তাহলে stream ডেটা Buffer আকারে পাঠায়।
তোমার কোডে "utf-8" encoding দেওয়া আছে, তাই তুমি সরাসরি স্ট্রিং আকারে ডেটা পাচ্ছো।


*/