import connectDB from "../config/db.js";

export const followUnFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // Check if target user exists
    const [users] = await connectDB.query(`SELECT * FROM users WHERE id = ?`, [
      id,
    ]);
    const receiverUser = users[0];
    if (!receiverUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if already following
    const isFollowingSql = `SELECT * FROM followings WHERE follower_id = ? AND followed_id = ?`;
    const [followings] = await connectDB.query(isFollowingSql, [
      user.id,
      receiverUser.id,
    ]);

    if (followings.length === 0) {
      // Follow
      const followSql = `INSERT INTO followings (follower_id, followed_id) VALUES (?, ?)`;
      await connectDB.query(followSql, [user.id, receiverUser.id]);

      // Notification
      const sendNotifSql = `INSERT INTO notifications (sender_id, owner_id, notif_type) VALUES (?, ?, ?)`;
      await connectDB.query(sendNotifSql, [
        user.id,
        receiverUser.id,
        "followed",
      ]);

      return res.status(201).json({ message: "Followed successfully" });
    } else {
      // Unfollow
      const deleteFollowSql = `DELETE FROM followings WHERE follower_id = ? AND followed_id = ?`;
      await connectDB.query(deleteFollowSql, [user.id, receiverUser.id]);

      return res.status(200).json({ message: "Unfollowed successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
