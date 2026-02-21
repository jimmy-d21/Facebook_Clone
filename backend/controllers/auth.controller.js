import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

export const register = async (req, res) => {
  try {
    const { email, firstname, lastname, password, confirmPassword } = req.body;

    // Validate require fields
    if (!email || !firstname || !lastname || !password || !confirmPassword) {
      return res.status(400).json({ error: "Please provide all the fields" });
    }

    // Check if email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    if (!isEmailValid) {
      return res.status(400).json({ error: "Provide valid email" });
    }

    // Check if email already exist
    const checkEmailSql = "SELECT email FROM users WHERE email = ?";
    const [checkEmail] = await connectDB.query(checkEmailSql, [email]);
    if (checkEmail.length > 0) {
      return res.status(400).json({ error: "Email already exist" });
    }

    // Check if password and confirm password match
    const isPasswordMatch = password === confirmPassword;
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Password do not match" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassowrd = await bcrypt.hash(password, salt);

    // Insert new user
    const insertUserSql =
      "INSERT INTO users (email, firstname, lastname, password) VALUES (?, ?, ?, ?)";
    const values = [email, firstname, lastname, hashedPassowrd];
    const [results] = await connectDB.query(insertUserSql, values);

    generateTokenAndSetCookie(results.insertId, res);

    // Return success
    res.status(201).json({
      message: "Create account successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
