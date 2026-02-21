import express from "express";
import ENV from "./utils/ENV.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`Server is ready for Facebook Clone`);
});

app.use("/api/auth", authRoutes);

const PORT = ENV.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
