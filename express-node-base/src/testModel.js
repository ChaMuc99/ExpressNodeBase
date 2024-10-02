// src/testModel.js
const Admin = require("./models/Admin");

async function testModel() {
  try {
    await Admin.sync();
    const admin = await Admin.create({
      email: "test@example.com",
      password: "password123",
      role: "admin",
    });
    console.log("Test admin created:", admin);
  } catch (error) {
    console.error("Error testing model:", error);
  }
}

testModel();
