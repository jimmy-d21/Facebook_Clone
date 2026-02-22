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

// Controller to get all post
export const getAllPosts = async (req, res) => {
  try {
    const getAllPostSql = `
      SELECT 
        u.id AS user_id, 
        CONCAT(u.firstname, ' ', u.lastname) AS fullname, 
        u.email, 
        u.profile_picture,
        p.id AS post_id,
        p.text,
        p.image,
        p.created_at,
        COUNT(DISTINCT l.id) AS likes,
        COUNT(DISTINCT c.id) AS comments
      FROM users AS u 
      INNER JOIN posts AS p ON u.id = p.user_id
      LEFT JOIN likes AS l ON p.id = l.post_id
      LEFT JOIN comments AS c ON p.id = c.post_id
      GROUP BY p.id, u.id
      ORDER BY p.created_at ASC
    `;

    const [results] = await connectDB.query(getAllPostSql);

    const posts = results.map((row) => ({
      post: {
        id: row.post_id,
        text: row.text,
        image: row.image,
        created_at: row.created_at,
      },
      comments: row.comments,
      likes: row.likes,
      user: {
        id: row.user_id,
        fullname: row.fullname,
        email: row.email,
        profile_picture: row.profile_picture,
      },
    }));

    res.status(200).json({ posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const likeUnLikePost = async (req, res) => {
  try {
    const { id } = req.params; // post id
    const user = req.user;

    // Check if post exists
    const checkPostSql = `
      SELECT
        u.id AS user_id, 
        CONCAT(u.firstname, ' ', u.lastname) AS fullname,
        u.email,
        u.profile_picture,
        p.id AS post_id,
        p.text,
        p.image,
        p.created_at
      FROM users AS u
      INNER JOIN posts AS p ON u.id = p.user_id
      WHERE p.id = ?
    `;
    const [posts] = await connectDB.query(checkPostSql, [id]);

    if (posts.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if already liked
    const isLikedSql = "SELECT * FROM likes WHERE post_id = ? AND user_id = ?";
    const [results] = await connectDB.query(isLikedSql, [id, user.id]);

    if (results.length === 0) {
      // Like post
      const likePostSql = "INSERT INTO likes (post_id, user_id) VALUES (?, ?)";
      const sendNotifSql = `INSERT INTO notifications 
                            (sender_id, owner_id, notif_type) 
                            VALUES (?, ?, ?)`;
      // Insert to notifications table
      await connectDB.query(sendNotifSql, [user.id, posts[0].user_id, "like"]);

      // Insert to likes table
      await connectDB.query(likePostSql, [id, user.id]);
    } else {
      // Unlike post
      const unlikePostSql =
        "DELETE FROM likes WHERE post_id = ? AND user_id = ?";
      await connectDB.query(unlikePostSql, [id, user.id]);
    }

    // Re-query updated counts
    const [updated] = await connectDB.query(
      `SELECT 
         COUNT(DISTINCT l.id) AS likes,
         COUNT(DISTINCT c.id) AS comments
       FROM posts p
       LEFT JOIN likes l ON p.id = l.post_id
       LEFT JOIN comments c ON p.id = c.post_id
       WHERE p.id = ?`,
      [id],
    );

    // Build response in your desired format
    const post = posts[0];
    const responseData = {
      post: {
        id: post.post_id,
        text: post.text,
        image: post.image,
        created_at: post.created_at,
      },
      comments: updated[0].comments,
      likes: updated[0].likes,
      user: {
        id: post.user_id,
        fullname: post.fullname,
        email: post.email,
        profile_picture: post.profile_picture,
      },
    };

    res.status(200).json({
      message: results.length === 0 ? "Liked post" : "Unliked post",
      ...responseData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
