const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("./configs/config");

const token = jwt.sign({ foo: "bar" }, JWT_SECRET);
console.log("Test Token:", token);

const decoded = jwt.verify(token, JWT_SECRET);
console.log("Decoded Test Token Payload:", decoded);
