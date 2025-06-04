
// const result = require('./file2')
const {a, add, b} = require('./file2')
const {a : a3, add : add3, b : b3} = require('./file3') //name aliasing

// console.log(result);

// console.log('a =', a);
// console.log(add(5, 6));
// console.log('b=', b);

console.log('a3 =', a3);
console.log('add3=', add3(5, 6, 1));
console.log('b3=', b3);


