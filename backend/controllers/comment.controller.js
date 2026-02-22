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

// Controller to fetch all comments for a given post
export const getCommentPost = async (req, res) => {
  try {
    const { id } = req.params; // post id

    const getCommentSql = `
      SELECT
        c.id AS comment_id,
        c.comment,
        c.created_at,
        u.id AS user_id,
        u.profile_picture,
        CONCAT(u.firstname, ' ', u.lastname) AS fullname,
        u.email
      FROM comments AS c
      LEFT JOIN users AS u ON u.id = c.user_id
      WHERE c.post_id = ?
      ORDER BY c.created_at DESC
    `;

    const [results] = await connectDB.query(getCommentSql, [id]);

    const comments = results.map((row) => ({
      comment: {
        id: row.comment_id,
        text: row.comment,
        created_at: row.created_at,
      },
      user: {
        id: row.user_id,
        fullname: row.fullname,
        email: row.email,
        profile_picture: row.profile_picture,
      },
    }));

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Server error" });
  }
};
