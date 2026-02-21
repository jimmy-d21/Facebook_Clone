import mysql2 from "mysql2/promise";
import ENV from "../utils/ENV.js";

const connectDB = mysql2.createPool({
  host: ENV.database.host,
  user: ENV.database.user,
  password: ENV.database.password,
  database: ENV.database.db_name,
});

// Test the connection once at startup
(async () => {
  try {
    const connection = await connectDB.getConnection();
    console.log("Database pool created and connection successful");
    connection.release(); // release back to pool
  } catch (err) {
    console.error("Database connection failed:", err.message);
  }
})();

export default connectDB;
