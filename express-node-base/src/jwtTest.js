const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./configs/config'); // Adjust the path if necessary

// Create a test token with a simple payload
const token = jwt.sign({ foo: 'bar' }, JWT_SECRET);
console.log('Test Token:', token);

// Decode the token to check the payload
const decoded = jwt.verify(token, JWT_SECRET);
console.log('Decoded Test Token Payload:', decoded);
