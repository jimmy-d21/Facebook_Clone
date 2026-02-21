import connectDB from "../config/db.js";
import cloudinary from "../middlewares/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user;
    const { text, image } = req.body;

    // Validate input
    if ((!text || text.trim() === "") && !image) {
      return res.status(400).json({ error: "Please provide text or image" });
    }

    let imageUrl = "";
    if (image) {
      const response = await cloudinary.uploader.upload(image);
      imageUrl = response.secure_url;
    }

    const insertPostSql =
      "INSERT INTO posts (user_id, text, image) VALUES (?,?,?)";
    const [results] = await connectDB.query(insertPostSql, [
      user.id,
      text,
      imageUrl,
    ]);

    const postSql = "SELECT * FROM posts WHERE id = ?";
    const [posts] = await connectDB.query(postSql, [results.insertId]);

    if (posts.length === 0) {
      return res.status(400).json({ error: "Post not found" });
    }

    res
      .status(201)
      .json({ message: "Create post successfully", post: posts[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const deletePostSql = "DELETE FROM posts WHERE id = ? AND user_id = ?";
    await connectDB.query(deletePostSql, [id, user.id]);

    res.status(200).json({ message: "Deleted post successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
