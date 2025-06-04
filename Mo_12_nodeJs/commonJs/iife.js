
console.log(global);
console.log(module);
console.log(__filename);
console.log(__dirname);

/*

Node.js ভিতরে এমনভাবে execute করে:

(function (exports, require, module, __filename, __dirname) {
    console.log(global);       // ✅ Built-in global object
    console.log(module);       // ✅ Current module's info object
    console.log(__filename);   // ✅ Absolute path of the current file
    console.log(__dirname);    // ✅ Absolute path of the current folder
});

*/

/*

Node.js Internally কী করে (commonJs er khetre):

তোমার লেখা কোড — ধরো:

console.log("Hello World");

এই কোড Node.js ভিতরে এমনভাবে wrap করে and কল করে:

(function (exports, require, module, __filename, __dirname) {
    console.log("Hello World");
}) (exports, require, module, __filename, __dirname) ;

// (exports, require, module, __filename, __dirname) --------- eivabe call kore

এইটাই IIFE (Immediately Invoked Function Expression)।

IIFE মানে কি?

এটা একটা ফাংশন ডিক্লেয়ার করা হয় এবং সাথে সাথে কলও করা হয়।
সাধারনত () দিয়ে ফাংশনটাকে ঘিরে রাখা হয়, তারপর আবার শেষে () দিয়ে কল করা হয়।
এর প্রধান উদ্দেশ্য হলো একটা আলাদা scope তৈরি করা যেখানে ভেরিয়েবল বা কোড লোকাল থাকে, গ্লোবাল স্কোপের সাথে সংঘাত না হয়।

Node.js এ IIFE কেন ব্যবহার হয়?

Node.js প্রতিটি ফাইলকে এমন একটা IIFE দিয়ে wrap করে, যাতে:
exports, require, module, __filename, __dirname প্যারামিটার ইনজেক্ট করতে পারে
আলাদা স্কোপে কোড চলে, গ্লোবাল লিক না হয়



ব্রাউজারে সব গ্লোবাল ফাংশন আর অবজেক্ট (setTimeout, console, document ইত্যাদি) window এর মধ্যে থাকে।
Node.js কোনো ব্রাউজার না, তাই সেখানে window নেই।
Node.js এর নিজস্ব global object আছে, যার নাম global।

Node.js এ IIFE ব্যবহারের কারণ:

মডিউল সিস্টেম চালানোর জন্য প্রয়োজন--
exports, module, require, __filename, __dirname ইত্যাদি scoped প্যারামিটার পাস করতে।

ES Modules (ESM) এ কী হয়?

১. ESM নিজেই আলাদা স্কোপ দেয়
ES6 মডিউল সিস্টেমে, প্রতিটি মডিউল নিজের scope পায়।
অর্থাৎ মডিউল ফাইলের বাইরে তার variable বা function direct access করা যায় না।
তাই IIFE দিয়ে আলাদা scope তৈরি করার দরকার নেই।

*/