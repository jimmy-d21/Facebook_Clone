import connectDB from "../config/db.js";

// Controller to create comment
export const commentPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const user = req.user;

    // Validate comment
    if (!comment || comment.trim() === "") {
      return res.status(400).json({ error: "Please provide a text." });
    }

    // Check if post exists
    const checkPostSql = `SELECT * FROM posts WHERE id = ?`;
    const [posts] = await connectDB.query(checkPostSql, [id]);

    if (posts.length === 0) {
      return res.status(400).json({ error: "Post not found" });
    }

    // Insert to comment table
    const insertCommentSql = `INSERT INTO comments (comment, post_id, user_id) VALUES (?, ?, ?)`;
    await connectDB.query(insertCommentSql, [comment, id, user.id]);

    // Insert to notifications table
    const sendNotifSql = `INSERT INTO notifications 
                            (sender_id, owner_id, notif_type) 
                            VALUES (?, ?, ?)`;
    // Insert to notifications table
    await connectDB.query(sendNotifSql, [user.id, posts[0].user_id, "comment"]);

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
