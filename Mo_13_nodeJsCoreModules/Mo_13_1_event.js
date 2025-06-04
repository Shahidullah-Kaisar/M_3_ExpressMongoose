
const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {}

const schoolBell = new SchoolBell();

schoolBell.on('ring', ()=>{ // create event.. ring is event name
    console.log("Yahoo!! Class sesh"); //event listener (মানে, event টা trigger hoile কী হবে সেটা বলে দেওয়া)
})
schoolBell.on('ring', ()=>{
    console.log("Oh No!! R o ekta class ache");
})
schoolBell.on('broken', ()=>{  //create event.. broken is event name
    console.log("class ki sesh hobe na?");
})

schoolBell.emit('ring'); //event trigger (emit) করছো — মানে bell বাজানোর মতো।
schoolBell.emit('broken');


/*
Node.js-এ Event কী?

Event মানে হলো "ঘটনা" — যেমন তোমার মোবাইলে notification আসা। Node.js এ Event system ব্যবহার করা হয় asynchronous ভাবে কাজ চালানোর জন্য। এটা অনেকটা real-life school bell-এর মতো:

Bell বাজে (event emit হয়)
Student বা teacher রা react করে (event listener respond করে)
Node.js-এ built-in events module দিয়ে আমরা event emit (ঘটানো) আর listen (শোনা) করতে পারি।


const EventEmitter = require('node:events');
🔹 Node.js থেকে events module import করা হচ্ছে।
🔹 এর ভিতরে আছে EventEmitter নামের class, যেটা দিয়ে event তৈরি ও handle করা যায়।

class SchoolBell extends EventEmitter {}
🔹 তুমি SchoolBell নামে একটা class বানিয়েছো, যেটা EventEmitter কে extend করে।
🔹 মানে SchoolBell এখন এমন একটা class যেটা নিজে event emit করতে পারে এবং event শুনতেও পারে।

const schoolBell = new SchoolBell();
🔹 SchoolBell এর একটা object বানানো হয়েছে — schoolBell।
🔹 এখন এটায় তুমি event attach করতে পারবে এবং emit করতে পারবে।


Method--------------------------কাজ

on() --------------------বারবার event handle করে
once()---------------------------	শুধু একবার চলে
emit()---------------------------	event trigger করে
removeListener() / off()---------------------------	listener সরিয়ে দেয়
listenerCount()---------------------------	listener সংখ্যা দেখে
setMaxListeners(n)---------------------------	warning না দিয়ে n টা পর্যন্ত listener allow করে
eventNames()---------------------------	active event list দেয়
prependListener()---------------------------	listener কে সবার আগে রাখে

*/