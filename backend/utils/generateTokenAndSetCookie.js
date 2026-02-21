import jwt from "jsonwebtoken";
import ENV from "./ENV.js";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV.jwt, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, // Not accessible by JS
    secure: ENV.node === "production", // only over HTTPS in production
    sameSite: "strict", // prevent CSRF
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  });
};

export default generateTokenAndSetCookie;
