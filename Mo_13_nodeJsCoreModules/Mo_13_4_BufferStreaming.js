
const fs = require('fs'); //Node.js-এর fs (file system) module নিয়ে আসা হয়েছে, যাতে ফাইলের সঙ্গে কাজ করা যায়।

const readStream = fs.createReadStream('./helloWorld.txt', {encoding: "utf-8"}); //helloWorld.txt ফাইলটি থেকে ডেটা stream আকারে পড়ার জন্য readStream তৈরি করা হয়েছে।
const writeStream = fs.createWriteStream('./hello.txt', {encoding: "utf-8"}) //hello.txt নামক নতুন ফাইলে ডেটা লেখার জন্য writeStream তৈরি করা হয়েছে।

readStream.on("data", (data)=>{ //create event..data is event name..যখন readStream ফাইল থেকে কিছু ডেটা পড়ে, তখন এই "data" ইভেন্ট ট্রিগার হয়। সেই ডেটা writeStream দিয়ে hello.txt ফাইলে লেখা হচ্ছে।
    console.log("read data now:", data);

    writeStream.write(data, (error)=>{
    if(error){
        throw Error("My Error", error);
    }
})
})

//যদি পড়া বা লেখার সময় কোনো সমস্যা হয়, তাহলে "error" ইভেন্ট কাজ করে এবং কাস্টম error দেখায়: "My Error"।

readStream.on("error", (error)=>{ 
    if(error){
        throw Error("My Error", error);
    }
})

writeStream.on("error", (error)=>{ //alada kore error handle er jnno.
    if(error){
        throw Error("My Error", error);
    }
})

readStream.on("end", ()=>{ //যখন পুরো ফাইল পড়া শেষ হয়, তখন "end" ইভেন্ট ট্রিগার হয় এবং writeStream বন্ধ করা হয় (end() function দিয়ে)।
    console.log("reading ended");
    writeStream.end();
})

writeStream.on("finish", ()=>{ //যখন লেখার কাজ সম্পূর্ণ হয়, তখন "finish" ইভেন্ট চালু হয় এবং একটা মেসেজ দেখায়।
    console.log("written successful");
})

/*
readStream.on(" ", (error)=>{ ... })

kon dhoroner event nibe eta janar jnno cursor " " er majhe nia ctrl + space chaple suggestion dibe..
*/
/*
✅ Node.js-এ Readable এবং Writable Streams:

Readable stream: যেটা ফাইল থেকে বা কোনো উৎস থেকে ডেটা "পড়ে"।
Writable stream: যেটা ফাইল বা অন্য কোথাও ডেটা "লেখে"।
এগুলো memory-efficient, কারণ বড় ফাইল একসাথে লোড না করে টুকরো টুকরো করে পড়ে/লিখে।

✅ কেন Stream ব্যবহার করব?

বড় ফাইল প্রসেসিং সহজ হয়।
Performance ভালো থাকে।
কম RAM ব্যবহার হয়।
Non-blocking (asynchronous) behavior বজায় থাকে।

3. Backpressure সমস্যা:

যদি writeStream(writeStream a time besi lage readstream er theke) ডেটা লেখা শেষ করতে না পারে কিন্তু readStream দ্রুত ডেটা পাঠাতে থাকে, তখন backpressure তৈরি হয়।



Encoding vs Buffer:

যদি তুমি encoding না দাও, তাহলে stream ডেটা Buffer আকারে পাঠায়।
তোমার কোডে "utf-8" encoding দেওয়া আছে, তাই তুমি সরাসরি স্ট্রিং আকারে ডেটা পাচ্ছো।


*/