// Import required modules
import express from "express"; // Web framework for building APIs
import cookieParser from "cookie-parser"; // Middleware to parse cookies

// Import environment variables utility
import ENV from "./utils/ENV.js";

// Import route handlers
import authRoutes from "./routes/auth.route.js"; // Authentication routes (login, register, etc.)
import userRoutes from "./routes/user.route.js"; // User-related routes (profile, settings, etc.)
import postRoutes from "./routes/post.route.js"; // Post-related routes (create, update, delete posts)
import commentRoutes from "./routes/comment.route.js"; // Comment-related routes
import notifications from "./routes/notification.route.js"; // Notification-related routes

// Initialize Express app
const app = express();

// Middleware
app.use(express.json({ limit: "5mb" })); // Parse JSON requests with a size limit
app.use(cookieParser()); // Enable cookie parsing

// Root route (basic health check)
app.get("/", (req, res) => {
  res.send(`Server is ready for Facebook Clone`);
});

// API routes
app.use("/api/auth", authRoutes); // Authentication endpoints
app.use("/api/users", userRoutes); // User endpoints
app.use("/api/posts", postRoutes); // Post endpoints
app.use("/api/comments", commentRoutes); // Comment endpoints
app.use("/api/notifications", notifications); // Notification endpoints

// Server configuration
const PORT = ENV.PORT || 5000; // Use environment port or default to 5000

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
