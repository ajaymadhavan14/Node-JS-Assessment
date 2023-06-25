const addon = require('./addon.cpp');

const input = 'x';
const hash = addon.simpleHash(input);

console.log(`Input: ${input}`);
console.log(`Hash: ${hash}`);
