const mongoose = require("mongoose");

async function connecteDb() {
  try {
    await mongoose.connect(process.env.MONGO_CONN_STR);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err.message);
    throw err;
  }
}

module.exports = connecteDb;






