# SimpleHash Node.js Addon

This Node.js addon provides a simple hash function implemented in C++.

## Prerequisites

- Node.js (version 18.16.1)
- node-gyp (version 9.4.1)

## Build Instructions

1. Install the required dependencies:
$ npm install -g node-gyp


2. Clone the repository and navigate to the addon directory:
$ git clone https://github.com/your/repo.git
$ cd addon


3. Build the addon using node-gyp:
$ node-gyp configure
$ node-gyp build


4. Use the Addon in JavaScript
const addon = require('./build/Release/addon');

const input = 'Hello, world!';
const hash = addon.simpleHash(input);

console.log(`Input: ${input}`);
console.log(`Hash: ${hash}`);


5. Build and Run the Addon
Open a terminal, navigate to the addon directory, and follow the build instructions provided in the README.md file. Once the addon is built successfully, you can use it in a Node.js script as shown in the usage example.

That's it! You have created a Node.js addon that exposes the `simpleHash` function implemented in C++. The addon can be built and used in Node.js scripts.
