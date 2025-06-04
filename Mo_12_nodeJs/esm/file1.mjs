
import {a, add} from './file2.mjs' // named export kora hoyeche taai import a same name rakhte hobe.
import B from './file2.mjs'; // default export kora hoyeche taai import jekono name a kora jabe.

import {a as a3, add as add3} from './file3.mjs' //name aliasing
import data from './file3.mjs'; // multiple data received from default export.



console.log('a =', a);
console.log('add=', add(5, 6));

console.log('a3 =', a3);
console.log('add3=', add3(5, 6, 1));

console.log('B = ', B);

console.log('data:', data);
console.log('C = ', data.c);
console.log('D = ', data.d);



