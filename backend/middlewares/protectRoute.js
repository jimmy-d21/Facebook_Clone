import jwt from "jsonwebtoken";
import ENV from "../utils/ENV.js";
import connectDB from "../config/db.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, ENV.jwt);

    // Query user by ID
    const checkUserSql = "SELECT * FROM users WHERE id = ?";
    const [users] = await connectDB.query(checkUserSql, [decoded.userId]);

    if (users.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Attach user to request
    req.user = users[0];
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export default protectRoute;
