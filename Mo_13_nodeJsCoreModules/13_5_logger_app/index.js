
// console.log(process.argv); //এটি Node.js-এর মাধ্যমে চালু হওয়া স্ক্রিপ্টের সব command line arguments প্রিন্ট করবে।

const path = require('path'); //Node.js-এর path module টা import করা হয়েছে। এটা ফাইল বা ফোল্ডারের path বানাতে কাজে লাগে, যেটা operating system independent হয়।
const fs = require('fs'); //Node.js-এর fs মানে file system module import করা হয়েছে। এটা দিয়ে ফাইল পড়া, লেখা, অ্যাপেন্ড করার মত কাজ করা যায়।


const inputArguments = process.argv.slice(2);
console.log(inputArguments);
/*
const inputArguments = process.argv.slice(2);

process.argv হলো একটা array, যেখানে:

index 0 = node executable path
index 1 = তোমার js ফাইলের path
index 2+ = ইউজার যা input দেয়, যেমন Hello Bro

.slice(2) মানে প্রথম দুইটা বাদ দিয়ে বাকি input গুলো নেওয়া হয়েছে।
ধরো: node index.js Hello Bro দিলে
inputArguments = ['Hello', 'Bro']

*/

const text = inputArguments.join(" ").concat("\n"); // input গুলোকে একটা space দিয়ে জোড়া হয়েছে: "Hello Bro" ..শেষে একটা newline (\n) যোগ করা হয়েছে, যাতে ফাইলে এক লাইন নামার মত হয়।
console.log(text);

const timeStamp = new Date().toISOString(); //এখনকার সময় (তারিখ + সময়) ISO format এ নেওয়া হয়েছে। ধরো: 2025-05-31T12:34:56.789Z
console.log(timeStamp);

const message = `${text} ${timeStamp} \n`; //text,  timeStamp, newline জুড়ে একটা পূর্ণ বার্তা বানানো হয়েছে।

if(!message){
    console.log("❌ Please provide a message to log");
    console.log("Example: node index.js Hello Bro");
    process.exit(1); //প্রোগ্রাম থেমে যাবে process.exit(1); দিয়ে
}

const filePath = path.join(__dirname, "log.txt"); //E:\Level 2\vs code\M_3_ExpressMongoose\Mo_13_nodeJsCoreModules\logger_app\log.txt
console.log('filePath:', filePath);

fs.appendFile(filePath, message, {encoding: "utf-8"}, ()=>{
    console.log(" Your log added successfully")
})

/*
✅ তুমি এই কোড থেকে কী শিখলে?

1. Command Line Arguments নেওয়া

শিখলে কিভাবে node index.js Hello Bro এর মতো কমান্ড থেকে ইনপুট নেওয়া যায়।
process.argv.slice(2) দিয়ে ইউজারের দেওয়া মেসেজ নেওয়া হয়।

2. JavaScript String Handling

.join(" ") দিয়ে array কে স্ট্রিং বানানো।
.concat("\n") দিয়ে লাইন শেষে newline যোগ করা।
Template literal (\${value}``) ব্যবহার করে ডাইনামিক টেক্সট বানানো।

3. Date & Time Handling

new Date().toISOString() দিয়ে current সময় নেয়া এবং ISO ফরম্যাটে রূপান্তর।

4. File System (fs) Module

কিভাবে fs.appendFile() দিয়ে কোন ফাইলে লেখা যায়।
ফাইল না থাকলে কিভাবে Node.js নিজে থেকে তৈরি করে নেয়।

5. Path Handling

path.join(__dirname, "log.txt") দিয়ে system-independent ভাবে ফাইলপাথ বানানো।

6. Error Handling ও Exit
ইউজার ইনপুট না দিলে কিভাবে Error দেখিয়ে প্রোগ্রাম বন্ধ করা যায় (process.exit(1))


এই জিনিসগুলো রিয়েল লাইফে কোথায় লাগবে?

🔹 1. লগ রাখার সিস্টেম বানানো

যেকোনো অ্যাপ্লিকেশন, ওয়েবসাইট বা সার্ভারে লগ রাখতে হয়—যেমন:
ইউজার কখন লগইন করলো
কে কী রিকুয়েস্ট পাঠালো
কোন Error ঘটলো
তোমার এই কোডটা সেই কাজের ছোট্ট একটা ভিত্তি (basic logger)।

🔹 2. CLI (Command Line Interface) অ্যাপ বানানো

অনেক টুল বা সফটওয়্যার command line দিয়ে চালানো হয়:
যেমন git, npm, nodemon
তেমন তুমি future এ নিজের CLI tools বানাতে পারবা
এই কোডটা তার জন্য একদম প্রথম ধাপ।

🔹 3. Automation Tools বানানো

যদি future-এ এমন কোন কাজ থাকে, যেটা তুমি বারবার করো, সেটা অটোমেট করতে পারবা CLI স্ক্রিপ্ট দিয়ে।
যেমন:

একটা ফোল্ডারে ফাইল অ্যাড হলে তার নাম টাইমসহ লগ করে রাখা
কোনো keyword ইউজ করে টাইমলাইনে log রাখার টুল

🔹 4. Logging for Debugging

কোনো অ্যাপ বানানোর সময় এটা খুব কাজে লাগে:
দেখতে কার ইনপুট আসলো
কি টাইমে কি ঘটছে
কোথায় bug হচ্ছে


*/