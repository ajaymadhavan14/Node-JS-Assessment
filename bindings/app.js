const addon = require('./addon.cpp');

const input = 'Hello World';
const hash = addon.simpleHash(input);

console.log(`Input: ${input}`);
console.log(`Hash: ${hash}`);
