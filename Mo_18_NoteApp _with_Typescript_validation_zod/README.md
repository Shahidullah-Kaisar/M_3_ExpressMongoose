Interface এর দরকার কবে?

1. Type Safety (টাইপ চেক করার সুবিধা)

TypeScript তোমাকে কোড লেখার সময়ই বলে দেবে কোন ফিল্ড মিসিং, বা ভুল টাইপ দিচ্ছো কিনা।

TypeScript ব্যবহার করলে তুমি চাও:

টাইপ ভুল হলেই যেনো TypeScript তোমাকে কোড লেখার সময়েই ধরিয়ে দেয়

কোডে auto-complete সুবিধা পেতে

যেকোনো জায়গায় user object কেমন হবে তা নির্দিষ্ট করে রাখতে

শুধু Schema দিলে কাজ চলবে, এবং এটা প্রাথমিকভাবে যথেষ্ট — বিশেষ করে যদি তুমি শুধু Backend করো।

কিন্তু Interface দিলে TypeScript-এর সুবিধা পাবে — clean code, typo protection, auto-complete, error catching।

Auto-completion সুবিধা
VS Code বা অন্য কোন editor ব্যবহার করলে টাইপিং করার সময় টাইপ অনুযায়ী suggestion দিবে। এটা ডেভেলপমেন্টকে দ্রুত ও ভুল কম করে।

# Interface:

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: 'user' | 'admin'
}

# usage:

const user: IUser = {
    firstName: "Sajib",
    lastName: "Ahmed",
    email: "sajib@example.com",
    password: "123456",
    role: "user" // ঠিক আছে কারণ 'user' বা 'admin' allowed
}
যদি ভুলভাবে লিখো:

const user: IUser = {
    firstName: "Sajib",
    lastName: "Ahmed",
    email: "sajib@example.com",
    password: "123456",
    role: "manager" // ❌ Error: 'manager' is not assignable to type 'user' | 'admin'
}