import connectDB from "../config/db.js";
import cloudinary from "../middlewares/cloudinary.js";

// Controller to create a post
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

// Controller to delete a post
export const deletePost = async (req, res) => {
  try {
    // Extract post ID from route parameters and authenticated user from request
    const { id } = req.params;
    const user = req.user;

    // Delete post only if it belongs to the authenticated user
    const deletePostSql = "DELETE FROM posts WHERE id = ? AND user_id = ?";
    await connectDB.query(deletePostSql, [id, user.id]);

    // Respond with success message
    res.status(200).json({ message: "Deleted post successfully" });
  } catch (error) {
    // Log error and return server error response
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const getAllPostSql = `
      SELECT 
        u.id AS user_id, 
        CONCAT(u.firstname, ' ', u.lastname) AS fullname, 
        u.email, 
        p.id AS post_id,
        p.text,
        p.image,
        p.created_at
      FROM users AS u 
      INNER JOIN posts AS p ON u.id = p.user_id
    `;

    const [results] = await connectDB.query(getAllPostSql);

    const posts = results.map((post) => ({
      post: {
        id: post.post_id,
        text: post.text,
        image: post.image,
        created_at: post.created_at,
      },
      user: {
        id: post.user_id,
        fullname: post.fullname,
        email: post.email,
      },
    }));

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
