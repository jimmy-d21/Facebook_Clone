import express from "express";
import ENV from "./utils/ENV.js";
import connectDB from "./config/db.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    const [rows] = await connectDB.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Query error:", err.message);
    res.status(500).send("Database query failed: " + err.message);
  }
});

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
